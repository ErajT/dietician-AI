"use client";
import { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
// import Navbar from '@components/Navbar1';
// import Navbar from '../components/Navbar';
import Navbar from '../../components/Navbar';


 


// Global styles to reset body and html
const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
  @font-face {
    font-family: 'Jelligun';
    src: url('/Jelligun-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: bold;
  }
     

  html {
    padding: 0;
    margin: 0;
  }
`;

const ExerciseDetailsPage = () => {
  const [exerciseDetails, setExerciseDetails] = useState({
    name: '',
    muscle: '',
    type: '',
    equipment: '',
    difficulty: '',
    videoId: ''
  });

  // Extract and decode URL query parameters using `useEffect`
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const exercise = query.get('exercise') ? JSON.parse(decodeURIComponent(query.get('exercise'))) : null;
    const videoId = decodeURIComponent(query.get('videoId') || '');
    console.log(exercise)

    if (exercise && videoId) {
      setExerciseDetails({
        name: exercise.name || '',
        muscle: exercise.muscle || '',
        type: exercise.type || '',
        equipment: exercise.equipment || '',
        difficulty: exercise.difficulty || '',
        videoId: exercise.videoID
      });
    }
  }, []);

  const { name, muscle, type, equipment, difficulty, videoId } = exerciseDetails;

  if (!name || !videoId) {
    return <Spinner>Loading...</Spinner>;
  }

  return (
    <>
      <GlobalStyles />
      <Container>
        <div>
      <Navbar />
      {/* Other components go here */}
    </div>
        <Title>{name}</Title>
        <MuscleGroup><strong>Targeted Muscle Group:</strong> {muscle}</MuscleGroup>
        <ExerciseType><strong>Exercise Type:</strong> {type}</ExerciseType>
        <Equipment><strong>Equipment Needed:</strong> {equipment || 'None'}</Equipment>
        <Difficulty><strong>Difficulty Level:</strong> {difficulty}</Difficulty>

        <VideoContainer>
          <VideoPlayer videoId={videoId} />
        </VideoContainer>
      </Container>
    </>
  );
};

const VideoPlayer = ({ videoId }) => {
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <iframe
      id="ytplayer"
      type="text/html"
      width="640"
      height="360"
      src={videoSrc}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      title="YouTube Video Player"
    ></iframe>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
  min-height: 100vh;
  height: 100vh;
  padding: 40px;
  background-image: url('/images/la.jpg'); /* Ensure the path is correct */
  background-size: cover;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  color: #2b6777; /* Text color as per request */
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #2b6777;
  margin-bottom: 20px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  fontFamily: "Jelligun, cursive"
`;

const MuscleGroup = styled.p`
  font-size: 1.2rem;
  color: #2b6777;
  margin-bottom: 10px;
`;

const ExerciseType = styled.p`
  font-size: 1.2rem;
  color: #2b6777;
  margin-bottom: 10px;
`;

const Equipment = styled.p`
  font-size: 1.2rem;
  color: #2b6777;
  margin-bottom: 10px;
`;

const Difficulty = styled.p`
  font-size: 1.2rem;
  color: #2b6777;
  margin-bottom: 20px;
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Spinner = styled.div`
  font-size: 1.5rem;
  color: #2b6777;
  text-align: center;
`;

export default ExerciseDetailsPage;
