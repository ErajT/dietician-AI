"use client";
import { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaDumbbell, FaRunning, FaWeightHanging, FaChartLine } from 'react-icons/fa'; // Import fitness icons
import Navbar from '../../components/Navbar';

// Global styles to reset body and html
const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    overflow-x: hidden; /* Prevent horizontal scroll */
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

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const exercise = query.get('exercise') ? JSON.parse(decodeURIComponent(query.get('exercise'))) : null;
    const videoId = decodeURIComponent(query.get('videoId') || '');

    if (exercise) {
      setExerciseDetails({
        name: exercise.name || '',
        muscle: exercise.muscle || '',
        type: exercise.type || '',
        equipment: exercise.equipment || '',
        difficulty: exercise.difficulty || '',
        videoId: exercise.videoID || ''
      });
    }
  }, []);

  const { name, muscle, type, equipment, difficulty, videoId } = exerciseDetails;

  return (
    <>
      <ContainAll>
        <Navbar />
        <GlobalStyles />
        <Container>
          <TextContainer>
            <Title>{name}</Title>
            <InfoRow>
              <FaDumbbell size={24} color="#2b6777" style={{ marginRight: '10px' }} />
              <strong>Targeted Muscle Group: </strong> {muscle}
            </InfoRow>
            <InfoRow>
              <FaRunning size={24} color="#2b6777" style={{ marginRight: '10px' }} />
              <strong>Exercise Type: </strong> {type}
            </InfoRow>
            <InfoRow>
              <FaWeightHanging size={24} color="#2b6777" style={{ marginRight: '10px' }} />
              <strong>Equipment Needed: </strong> {equipment || 'None'}
            </InfoRow>
            <InfoRow>
              <FaChartLine size={24} color="#2b6777" style={{ marginRight: '10px' }} />
              <strong>Difficulty Level: </strong> {difficulty}
            </InfoRow>
            <DifficultyBar level={difficulty} />
          </TextContainer>

          <VideoContainer>
            {videoId ? (
              <VideoPlayer videoId={videoId} />
            ) : (
              <NoVideoMessage>Video not found</NoVideoMessage>
            )}
          </VideoContainer>
        </Container>
      </ContainAll>
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

// Difficulty Progress Bar
const DifficultyBar = styled.div`
  width: 60%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-top: 8px;
  overflow: hidden;

  &::before {
    content: "";
    display: block;
    height: 100%;
    background-color: ${({ level }) =>
      level === 'beginner' ? '#4CAF50' :
      level === 'intermediate' ? '#FF9800' :
      level === 'advanced' ? '#F44336' :
      '#e0e0e0'};
    width: ${({ level }) =>
      level === 'beginner' ? '33%' :
      level === 'intermediate' ? '66%' :
      level === 'advanced' ? '100%' : '0%'};
    transition: width 0.3s ease;
  }
`;

const ContainAll = styled.div`
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 15px;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center; /* Center-align text and video */
  }
`;

const TextContainer = styled.div`
  flex: 1;
  max-width: 45%;
  margin-left: 80px;

  @media (max-width: 1000px) {
    text-align: center; /* Center text on smaller screens */
    margin-left: 0;
  }
`;

const Title = styled.h1`
  font-size: 5.5rem;
  font-weight: bold;
  color: #2b6777;
  margin: 8px 0 16px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: "Jelligun", cursive;
`;

const InfoRow = styled.p`
  font-size: 1.5rem;
  color: #2b6777;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: start;

  & strong {
    margin-right: 8px;
  }
`;

const VideoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-top: 40px;

  @media (max-width: 1000px) {
    margin-right: 0;
    margin-top: 20px;
  }
`;

const NoVideoMessage = styled.p`
  font-size: 1.5rem;
  color: #2b6777;
`;

export default ExerciseDetailsPage;
