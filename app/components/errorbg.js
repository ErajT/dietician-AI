// components/VideoLoading.js

import React from 'react';
import { Box } from '@mui/material';

const Errorbg = ({ videoUrl, withOverlay = true }) => {
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
        backgroundColor: 'transparent',
        color: '#102820',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Background Video */}
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

      {/* Conditional Overlay */}
      {withOverlay && (
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
      )}
    </Box>
  );
};

export default Errorbg;
