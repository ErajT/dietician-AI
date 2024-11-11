"use client";
import { useRouter } from 'next/navigation';
import styled, { createGlobalStyle } from 'styled-components';
import { useEffect, useState } from 'react';
import VideoLoading from '../components/VideoLoading';
import { FaDumbbell } from 'react-icons/fa'; // Example for a dumbbell icon
import Navbar from '../../components/Navbar';

// Global Styles
// / Global Styles
const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Jelligun';
    src: url('/Jelligun-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  * {
    font-family: 'Jelligun', sans-serif;
  }
  body {
    margin: 0; // Remove default body margin
    background-color: #e0f7f3; // Set background color for the whole page
  }
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #e0f7f3;
    padding-top: 100px; // Add padding to ensure navbar is visible
    margin-top:180px;
`;

const NavbarContainer = styled.div`
    width: 100%;
    background-color: #004d4d; // Example background color for navbar
    position: fixed;
    top: 0;
    z-index: 1000; // Ensure it's on top
`;

const DetailsContainer = styled.div`
    background-color: #e0f7f3;
    padding: 20px;
    width: 100%;
    max-width: 1200px;
`;


const TitleContainer = styled.div`
    background-color: #e0f7f3;
    display: flex;
    align-items: center; // Align images and title vertically
    justify-content: center; // Center the title
    margin-bottom: 20px;
`;

const TitleImage = styled.img`
    width: 40px; // Set width for the images
    height: 40px; // Set height for the images
    margin: 0 10px; // Space around images
`;

const Title = styled.h1`
    font-size: 2.5rem; // Adjust title font size
    color: #25113a; // Dark theme color
`;

const ExerciseGrid = styled.div`
    background-color: #e0f7f3;
    display: flex;
    flex-wrap: wrap; // Allow items to wrap to the next line
    justify-content: space-between; // Align items to the start
    gap: 16px; // Gap between items
    padding-left: 20px;
    padding-right: 20px;
`;

const ExerciseCard = styled.div`
    flex: 1 1 calc(30% - 16px);
    min-width: 200px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.8);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px) {
        flex: 1 1 calc(48% - 16px);
    }

    @media (max-width: 480px) {
        flex: 1 1 100%;
    }
`;

const ExerciseNameContainer = styled.div`
    display: flex;
    align-items: center; // Align images and name vertically
`;

const ExerciseName = styled.h2`
    font-size: 3vw; // Increase font size for names
    color: #2b6777; // Theme color for names
    margin: 0 10px; // Spacing around name
`;



const ExerciseInfo = styled.p`
    font-size: 2rem; // Consistent font size
    color: #555; // Gray color for info
    margin: 5px 0; // Spacing between info lines
`;

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
`;

const DetailsPage = () => {
    const router = useRouter();
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [muscle, setMuscle] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const muscleFromQuery = params.get('muscle');
        if (muscleFromQuery) {
            setMuscle(decodeURIComponent(muscleFromQuery.replace(/"/g, '')));
        }
    }, [router.query]);

    useEffect(() => {
        const fetchExercises = async () => {
            if (muscle) {
                setLoading(true);
                try {
                    const res = await fetch("/api/exerciseplanner", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ muscle }),
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
            }
        };

        fetchExercises();
    }, [muscle]);

    const loadingVideoUrl = '/exercise.mp4'; 

    if (loading) {
        return <VideoLoading videoUrl={loadingVideoUrl} comment="Loading exercises..." />
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    const handleExerciseClick = (exercise) => {
        const url = `details?exercise=${encodeURIComponent(
            JSON.stringify(exercise)
          )}&videoId=${encodeURIComponent(exercise.videoId)}`;
        window.location.href = url; // Redirect to the details page
    };

    return (
        <>
            <GlobalStyles />
            <Container>
            <NavbarContainer>
                <Navbar/>
                </NavbarContainer>
                <DetailsContainer>
                    <TitleContainer>
                        <TitleImage src={"/exercisepage1.png"} alt="Left Icon" />
                        <Title>Exercises for {muscle}</Title>
                        <TitleImage src="/exercisepage2.png" alt="Right Icon" />
                    </TitleContainer>
                    <ExerciseGrid>
                        {exercises.map((exercise, index) => (
                            <ExerciseCard key={index} onClick={() => handleExerciseClick(exercise)}> {/* Add onClick here */}
                                <ExerciseNameContainer>
                                    <FaDumbbell size={30} color="#2b6777" />
                                    <ExerciseName>{exercise.name}</ExerciseName>
                                    <FaDumbbell size={30} color="#2b6777" />
                                </ExerciseNameContainer>
                                <ExerciseInfo>Type: {exercise.type}</ExerciseInfo>
                                <ExerciseInfo>Muscle: {exercise.muscle}</ExerciseInfo>
                            </ExerciseCard>
                        ))}
                    </ExerciseGrid>
                </DetailsContainer>
            </Container>
        </>
    );
};

export default DetailsPage;