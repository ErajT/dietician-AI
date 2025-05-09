import { NextResponse } from 'next/server';

const apiKey = 'AIzaSyBTaYcyfnNgv04OQvOq4FceAro7I_BKqqU';  // Replace with your YouTube API key
// const apiKey = 'AIzaSyAVOJ9Xa0w5-yLQ6_DtcvsFvKQ5rvDGtGM'; // with cloud id
const maxResults = 1;  // Limit to one video per exercise for clarity

// Function to search YouTube by exercise name and return the video ID and title
async function searchByKeyword(exerciseName) {
  const query = exerciseName;  // Search for the specific exercise name
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${query}&key=${apiKey}`;
  // https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=back&key=AIzaSyBTaYcyfnNgv04OQvOq4FceAro7I_BKqqU
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const item = data.items[0]; // Take the first result
      return {
        videoId: item.id.videoId,
        title: item.snippet.title
      };
    }
    return null; // Return null if no video found
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return null;
  }
}

// Helper function to fetch exercise data and get YouTube URLs from OpenRouter API
export async function POST(req, res) {
  
  try {
    const { muscle } = await req.json();
    console.log(muscle);
    const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'n3GUwYjv1AB5Rq8UipcmQA==5kaLo8XmAeDZDUyg'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);

    // Extract exercise names
    const names = data.map(d => d.name);

    // For each exercise, get the corresponding YouTube video info
    const exercisesWithYouTube = await Promise.all(names.map(async (exercise) => {
      const youtubeData = await searchByKeyword(exercise);
      return {
        name: exercise,
        type: data.find(d => d.name === exercise).type,
        muscle: data.find(d => d.name === exercise).muscle,
        difficulty: data.find(d => d.name === exercise).difficulty,
        // instructions: data.find(d => d.name === exercise).instructions,
        videoID: youtubeData ? youtubeData.videoId : null, 
        youtube_video: youtubeData ? `https://www.youtube.com/watch?v=${youtubeData.videoId}` : null,
        youtube_title: youtubeData ? youtubeData.title : 'No video found'
      };
    }));

    // Return formatted data with YouTube URLs and titles
    // console.log(exercisesWithYouTube)
    return NextResponse.json({
      status: "Success",
      exercises: exercisesWithYouTube,
    });

  } catch (e) {
    console.error("Error fetching exercise:", e.message);
    return NextResponse.json({
      status: "Error",
      message: "Could not generate exercise data",
    });
  }
}
