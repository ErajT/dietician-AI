// components/VideoLoading.js

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const VideoLoading = ({ videoUrl, comment }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignItems: 'center',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        color: '#102820',
        margin: 0,
        padding: 0,
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
          top: '50%',
          left: '50%',
          height: '100%',
          width: '100%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          objectFit: 'cover',
          opacity: 1,
          padding: 0,
          margin: 0,
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
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))', // Gradient overlay
          zIndex: 2, 
        }}
      />

      {/* Loading Spinner and Text */}
      <CircularProgress sx={{ color: 'white' }} />
      <Typography variant="h6" sx={{ marginTop: 2, color: 'white', zIndex: 3 }}>
       {comment}
      </Typography>
    </Box>
  );
};

export default VideoLoading;
