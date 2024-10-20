// pages/details/page.js
"use client";
import { useState, useEffect } from 'react';
import styles from '../../styling/details.css';

const ExerciseDetailsPage = () => {
  const [exerciseDetails, setExerciseDetails] = useState({
    name: '',
    videoId: ''
  });

  // Extract and decode URL query parameters using `useEffect`
  useEffect(() => {
    // Get query string from window.location.search
    const query = new URLSearchParams(window.location.search);
    
    // Decode the `exercise` object passed as a JSON string
    const exercise = query.get('exercise') ? JSON.parse(decodeURIComponent(query.get('exercise'))) : null;
    const videoId = decodeURIComponent(query.get('videoId') || '');

    // If exercise and videoId exist, set the state with the decoded values
    if (exercise && videoId) {
      setExerciseDetails({
        name: exercise.name || '',
        videoId: videoId
      });
    }
  }, []);

  const { name, videoId } = exerciseDetails;

  if (!name || !videoId) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{name}</h1>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        className={styles.videoIframe}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ExerciseDetailsPage;
