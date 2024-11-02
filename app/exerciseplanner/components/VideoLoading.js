// components/VideoLoading.js

import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const VideoLoading = ({ comment }) => {
  const videoUrl = '/exercise.mp4'; // Path to your video file in the public directory

  // Disable scrolling on the body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset'; // Reset when component unmounts
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Ensure the Box takes at least the full viewport height
        minWidth: '100vw',   // Ensure the Box takes the full viewport width
        position: 'absolute', // Position it absolutely
        top: 0,
        left: 0,
        overflow: 'hidden', // Prevent overflowing content
        color: '#102820',
        zIndex: 0,          // Make sure it is behind other components
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%', // Set height to 100%
          width: '100%',  // Set width to 100%
          objectFit: 'cover', // Ensure the video covers the entire container
          zIndex: 1,
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay with blackish linear gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))',
          zIndex: 2,
        }}
      />

      {/* Loading Spinner and Text */}
      <CircularProgress sx={{ color: 'white' }} />
      <Typography variant="h6" sx={{ marginTop: 2, color: 'white', zIndex: 3, fontFamily: 'Jelligun, cursive', fontSize: '3rem' }}>
        {comment}
      </Typography>
    </Box>
  );
};

export default VideoLoading;
