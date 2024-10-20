

"use client";
import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

const ExercisePlanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [muscle, setMuscle] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.background = isModalOpen ? '#cee2d2' : '#cee2d2';
  }, [isModalOpen]);

  const muscleOptions = [
    { name: 'chest', image: '/images/chest.jpg' },
    { name: 'back', image: '/images/back.jpg' },
    { name: 'legs', image: '/images/legs.jpg' },
    { name: 'arms', image: '/images/arms.jpg' },
    { name: 'shoulders', image: '/images/shoulders.jpg' }
  ];

  const handleMuscleSelect = async (muscle) => {
    setMuscle(muscle);
    setIsModalOpen(false);
    setLoading(true);
    setError('');

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

      // Debugging log to check API response structure
      console.log('API Response:', data);

      setExercises(data.exercises);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Log exercises array to debug
    if (!loading && exercises.length > 0) {
      console.log('Exercises:', exercises);
    }
  }, [loading, exercises]);

  const handleExerciseClick = (exercise) => {
    const url = `exerciseplanner/details?exercise=${encodeURIComponent(
      JSON.stringify(exercise)
    )}&videoId=${encodeURIComponent(exercise.videoId)}`;
    window.location.href = url;
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Exercise Planner</h1>

        {isModalOpen && (
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Select a Muscle Group</h2>
            <div style={styles.muscleOptions}>
              {muscleOptions.map((muscle, index) => (
                <button
                  key={index}
                  onClick={() => handleMuscleSelect(muscle.name)}
                  style={styles.muscleButton}
                >
                  <img src={muscle.image} alt={muscle.name} style={styles.muscleImage} />
                  <span>{muscle.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <div style={styles.spinner}>Loading...</div>}

        {error && <div style={styles.error}>{error}</div>}

        {!isModalOpen && !loading && exercises.length > 0 && (
          <div style={styles.exerciseContainer}>
            <h2 style={styles.exerciseHeader}>Exercises for {muscle}</h2>
            <div style={styles.exerciseGrid}>
              {exercises.map((exercise, index) => (
                <div
                  key={index}
                  style={styles.exerciseCard}
                  onClick={() => handleExerciseClick(exercise)}
                >
                  <h3 style={styles.exerciseName}>Name: {exercise.name}</h3>
                  <p style={styles.exerciseInfo}>Type: {exercise.type}</p>
                  <p style={styles.exerciseInfo}>Muscle: {exercise.muscle}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div style={styles.splineContainer}>
          <Spline scene="https://prod.spline.design/ShOzWqWhrYaktz74/scene.splinecode" />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '40px', // Increased padding for breathing space
    backgroundColor: '#cee2d2',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    maxWidth: '1200px',
    zIndex: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#102820',
    marginBottom: '40px',
    textShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  modal: {
    padding: '20px',
    maxWidth: '1000px',
    width: '100%',
  },
  modalTitle: {
    fontSize: '2rem',
    color: '#102820',
    marginBottom: '30px',
  },
  muscleOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '30px',
  },
  muscleButton: {
    backgroundColor: '#102820',
    color: '#fff',
    border: 'none',
    padding: '20px',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '1.4rem',
    transition: 'transform 0.3s, background-color 0.3s',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  muscleImage: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    marginBottom: '10px',
    borderRadius: '50%',
  },
  exerciseContainer: {
    marginTop: '30px',
    padding: '40px',
    borderRadius: '15px',
    backgroundColor: '#102820',
    color: '#ffffff',
    width: '90%', // Increased width for better grid space
  },
  exerciseHeader: {
    fontSize: '2.5rem',
    color: '#ffffff',
    marginBottom: '30px',
  },
  exerciseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Adjusts based on screen size
    gap: '30px', // Increased gap for better spacing
    justifyContent: 'center', // Centers the grid
  },
  exerciseCard: {
    backgroundColor: '#ffffff',
    padding: '20px', // Slightly increased padding for uniformity
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s, background-color 0.3s',
    textAlign: 'center',
  },
  exerciseName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  exerciseInfo: {
    fontSize: '1.2rem',
    color: '#102820',
  },
  splineContainer: {
    width: '50%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    fontSize: '1.5rem',
    color: '#102820',
    marginTop: '20px',
  },
  error: {
    color: 'red',
    marginTop: '20px',
    fontSize: '1.5rem',
  },
};

export default ExercisePlanner;
