// components/VideoLoading.js

import React from 'react';
import '../globals.css';
import { Box, CircularProgress, Typography } from '@mui/material';

const VideoLoading = ({ videoUrl , comment }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
          zIndex: -1,
          objectFit: 'cover',
          opacity: 1,
          padding: 0,
          margin: 0,
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          color:'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: -1,
        }}
      />

      {/* Loading Spinner and Text */}
      <CircularProgress sx={{ color: 'white' }} />
      <Typography variant="h6" sx={{ marginTop: 2, color: 'white',fontFamily: 'Jelligun, cursive',fontSize:"2.5rem" }}>
      {comment}
      </Typography>
       
    </Box>
  );
};

export default VideoLoading;