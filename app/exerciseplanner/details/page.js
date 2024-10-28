"use client";
import { useState, useEffect } from 'react';


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

    if (exercise && videoId) {
      setExerciseDetails({
        name: exercise.name || '',
        muscle: exercise.muscle || '',
        type: exercise.type || '',
        equipment: exercise.equipment || '',
        difficulty: exercise.difficulty || '',
        videoId: videoId
      });
    }
  }, []);

  const { name, muscle, type, equipment, difficulty, videoId } = exerciseDetails;

  if (!name || !videoId) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{name}</h1>
      <p className={styles.muscleGroup}><strong>Targeted Muscle Group:</strong> {muscle}</p>
      <p className={styles.exerciseType}><strong>Exercise Type:</strong> {type}</p>
      <p className={styles.equipment}><strong>Equipment Needed:</strong> {equipment || 'None'}</p>
      <p className={styles.difficulty}><strong>Difficulty Level:</strong> {difficulty}</p>
      
      <div className={styles.videoContainer}>
      <VideoPlayer videoId={videoId} />
      </div>
    </div>
  );
};
// src={`https://www.youtube.com/embed/${videoId}`}

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

// CSS to be added in your CSS file
/*
.muscle-button:hover {
  transform: scale(1.1);
}
*/



export default ExerciseDetailsPage;
