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

  // Updated muscle options with the given muscle group values
  const muscleOptions = [
    { name: 'Abdominals', value: 'abdominals', image: '/images/abdominals.jpg' },
    { name: 'Abductors', value: 'abductors', image: '/images/abductors.jpg' },
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
    setMuscle(muscleValue);
    setIsModalOpen(false);
    setLoading(true);
    setError('');

    try {
      const res = await fetch("/api/exerciseplanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ muscle: muscleValue }), // sending muscle value to the API
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
                  onClick={() => handleMuscleSelect(muscle.value)}
                  style={styles.muscleButton}
                  className="muscle-button" // Add a class for hover effect
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
                  <h3  style={{color:'black'}}>Name: {exercise.name} </h3>
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
    padding: '40px',
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
    width: '90%',
  },

 

  exerciseHeader: {
    fontSize: '2.5rem',
    color: '#ffffff',
    marginBottom: '30px',
  },
  exerciseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    justifyContent: 'center',
  },

  exerciseCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
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
  },
};

// Add the following CSS for hover effect
const muscleButtonHover = {
  transform: 'scale(1.1)',
};

export default ExercisePlanner;

// CSS to be added in your CSS file
/*
.muscle-button:hover {
  transform: scale(1.1);
}
*/

