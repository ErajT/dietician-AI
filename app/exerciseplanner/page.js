"use client"; // Make sure this is at the top of the file
import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import VideoLoading from './components/VideoLoading'; // Ensure this path is correct
// import styled from 'styled-components';
import Navbar from '../components/Navbar';
import styled, { createGlobalStyle } from 'styled-components';
import {useRouter} from 'next/navigation';


const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Jelligun';
    src: url('/Jelligun-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: bold;
  }
  * {
    font-family: 'Jelligun', sans-serif;
  }
`;
const ExercisePlanner = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [muscle, setMuscle] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    document.body.style.background = isModalOpen ? '#cee2d2' : '#cee2d2';
    setTimeout(() => setShowHeading(true), 1000);
  }, [isModalOpen]);

  const muscleOptions = [
    { name: 'Abdominals', value: 'abdominals', image: '/images/abdominals.jpg' },
    { name: 'Adductors', value: 'adductors', image: '/images/adductors.jpg' },
    { name: 'Biceps', value: 'biceps', image: '/images/biceps.jpg' },
    { name: 'Calves', value: 'calves', image: '/images/calves.jpg' },
    { name: 'Chest', value: 'chest', image: '/images/chest.jpg' },
    { name: 'Forearms', value: 'forearms', image: '/images/forearms.jpg' },
    { name: 'Glutes', value: 'glutes', image: '/images/glutes.jpg' },
    { name: 'Hamstrings', value: 'hamstrings', image: '/images/hamstrings.jpg' },
    { name: 'Lats', value: 'lats', image: '/images/lats.jpg' },
    { name: 'Lower Back', value: 'lower_back', image: '/images/lower_back.jpg' },
    { name: 'Middle Back', value: 'middle_back', image: '/images/middle_back.jpg' },
    { name: 'Neck', value: 'neck', image: '/images/neck.jpg' },
    { name: 'Quadriceps', value: 'quadriceps', image: '/images/quadriceps.jpg' },
    { name: 'Traps', value: 'traps', image: '/images/traps.jpg' },
    { name: 'Triceps', value: 'triceps', image: '/images/triceps.jpg' }
  ];

  const handleMuscleSelect = async (muscleValue) => {
    const url = `exerciseplanner/exercises?muscle=${encodeURIComponent(JSON.stringify(muscleValue))}`;
    window.location.href = url;
    setMuscle(muscleValue);
    setIsModalOpen(false);
    setLoading(true);
    setError('');

    try {
      const res = await fetch("/api/exerciseplanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ muscle: muscleValue }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data from the API");
      }

      const data = await res.json();
      setExercises(data.exercises);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseClick = (exercise) => {
    const url = `/details?exercise=${encodeURIComponent(
      JSON.stringify(exercise))}`;
      router.push(url); 
  };

  const loadingVideoUrl = '/exercise.mp4'; 

  return (
    <ContainerforAll>
      <Navbar  sx={{
        backgroundColor: "#2b6777",
        color: "#ffffff",
        boxShadow: "none",
        padding: "0 20px",
      }}/>
    <Container>
      <GlobalStyles/>
      {/* Other components go here */}
      <Content>
        {showHeading && <Title>Exercise Planner</Title>}

        {isModalOpen && (
          <Modal>
            <ModalTitle>Select a Muscle Group</ModalTitle>
            <MuscleOptions>
              {muscleOptions.map((muscle, index) => (
                <FlipCard key={index}>
                  <FlipCardInner onClick={() => handleMuscleSelect(muscle.value)}>
                    <FlipCardFront onClick={() => handleMuscleSelect(muscle.value)}>
                      <MuscleImageBlur src={muscle.image} alt={muscle.name} />
                      <CardText>{muscle.name}</CardText>
                    </FlipCardFront>
                    <FlipCardBack>
                      <MuscleImage src={muscle.image} alt={muscle.name} />
                    </FlipCardBack>
                  </FlipCardInner>
                </FlipCard>
              ))}
            </MuscleOptions>
          </Modal>
        )}

        {loading && <VideoLoading videoUrl={loadingVideoUrl} comment="Loading exercises..." />}
        {error && <Error>{error}</Error>}

        {!isModalOpen && !loading && exercises.length > 0 && (
          <ExerciseContainer>
            <ExerciseHeader>Exercises for {muscle}</ExerciseHeader>
            <ExerciseGrid>
              {exercises.map((exercise, index) => (
                <ExerciseCard
                  key={index}
                  onClick={() => handleExerciseClick(exercise)}
                >
                  <ExerciseName>Name: {exercise.name}</ExerciseName>
                  <ExerciseInfo>Type: {exercise.type}</ExerciseInfo>
                  <ExerciseInfo>Muscle: {exercise.muscle}</ExerciseInfo>
                </ExerciseCard>
              ))}
            </ExerciseGrid>
          </ExerciseContainer>
        )}
      </Content>

      {isModalOpen && (
        <SplineContainer>
          <Spline scene="https://prod.spline.design/ShOzWqWhrYaktz74/scene.splinecode" />
        </SplineContainer>
      )}
    </Container>
    </ContainerforAll>
  );
};

const ContainerforAll = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 100vh;
  padding: 40px;
  background-color: #e0f7f3;
  overflow: hidden;
  // min-width:100%
`;

const Content = styled.div`
  flex: 1;
  max-width: 60%;
  padding-right: 20px;
`;

const Title = styled.h1`
  font-size: 6vw;
  font-family: 'Jelligun', sans-serif; 
  font-weight: bold;
  color: #2b6777;
  margin-bottom: 0;
  text-align: center;
  width: 60%;
  margin-top: 0;
  position: relative;
  left: 50%;
  // font-family: 'Poppins';
`;

const Modal = styled.div`
  padding: 20px;
  max-width: 1000px;
  width: 100%;
`;

const ModalTitle = styled.h2`
  font-size: 4vw;
  color: #2b6777;
  margin-bottom: 30px;
  font-weight :bold;
`;

const MuscleOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
`;

const FlipCard = styled.div`
  perspective: 1000px;
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 15px;
  cursor: pointer;
`;

const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #102820;
  color: #fff;
  border-radius: 15px;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const MuscleImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  object-fit: cover;
`;

const MuscleImageBlur = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  object-fit: cover;
  filter: blur(1px);
  position: relative; /* Allows pseudo-element positioning */
  z-index: 1; /* Places the image above the gradient overlay */
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom, /* You can change direction to suit your design */
      rgba(0, 0, 0, 0.8), /* Dark overlay for high contrast */
      rgba(0, 0, 0, 0.4) 50%, /* Gradient transition for better visibility */
      rgba(0, 0, 0, 0) 100% /* Fade out at the bottom */
    );
    border-radius: 15px; /* Matches the image border radius */
    z-index: 1; /* Places the gradient overlay above the image */
  }
`;

const CardText = styled.span`
  position: absolute;
  color: white;
  font-size: 1.8rem;
  text-align: center;
  z-index: 3; /* Ensures the text is on top of both the image and the gradient */
`;


const ExerciseContainer = styled.div`
  margin: 0 auto; /* Center content */
  padding: 20px;
  color: white;
  width: 100%;
  height: 100%;
  background-size: cover;
  position: relative;
`;

const ExerciseHeader = styled.h2`
  font-size: 2.8rem;
  color: #2b6777;
  margin-bottom: 80px;
  margin-top: 50px;
  text-align: center;
`;


const ExerciseGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the items */
  width: 100%; /* Adjust width */
  padding: 15px;
  box-sizing: border-box;
`;


const ExerciseCard = styled.div`

  flex: 0 1 calc(30.33% - 20px);    // Adjust the percentage as needed for the item width
  margin-bottom: 30px;               // Space between rows
  margin-right: 20px;
  box-sizing: border-box;            // Include margin in width calculation
  background-color: #2b6777;
  border-radius: 15px;
  min-height: 130px;
  min-width: 150px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ExerciseName = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: #ffffff;
`;

const ExerciseInfo = styled.p`
  margin: 5px 0;
  color: #ffffff;
`;

const Error = styled.p`
  color: red;
  font-size: 1.2rem;
  text-align: center;
`;

const SplineContainer = styled.div`
  width: 40%;
  position: relative;
  position: fixed;
  right: 0;
  height: 470px;
  margin-left: 20px;
  margin-bottom: 20px;

,
`;

export default ExercisePlanner;

