import { NextResponse } from 'next/server';

// Helper function to fetch exercise data and get YouTube URLs from OpenRouter API
export async function POST(req, res) {
    const content = "I have given you the name of exercise, return the youtube video urls of those exercises. Don't include any introductions or conclusions. Just give me the actual URL using http in form of a comma separated list.";  
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

        // Extract exercise names
        const names = data.map(d => d.name);

        // Fetch YouTube URLs from GenAI
        const response1 = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer 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`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "meta-llama/llama-3.1-8b-instruct:free",
                "messages": [
                    { "role": "user", "content": JSON.stringify(names) },
                    { "role": "system", "content": content },
                ]
            })
        });

        if (!response1.ok) {
            throw new Error("Failed to fetch YouTube URLs");
        }

        const result = await response1.json();
        const urls = result.choices[0].message.content.split(','); // Extract the comma-separated URLs

        // Combine the exercise data with YouTube URLs
        const formattedData = data.map((exercise, index) => ({
            name: exercise.name,
            type: exercise.type,
            muscle: exercise.muscle,
            difficulty: exercise.difficulty,
            youtube_url: urls[index] ? urls[index].trim() : null // Attach corresponding URL if available
        }));

        // Return formatted data with YouTube URLs
        return NextResponse.json({
            status: "Success",
            exercises: formattedData,
        });

    } catch (e) {
        console.error("Error fetching exercise:", e.message);
        return NextResponse.json({
            status: "Error",
            message: "Could not generate exercise data",
        });
    }
}
