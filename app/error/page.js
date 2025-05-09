"use client";
import React from 'react';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Errorbg from '../components/errorbg';

const Error = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/'); // Navigates to the homepage
  };

  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Background Video without Overlay */}
      <Errorbg videoUrl={'/images/OOPS.mp4'} withOverlay={false} />

      {/* Button to Navigate to Homepage */}
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 3,
        }}
      >
        <Button
  onClick={handleHomeClick}
  variant="contained"
  color="primary"
  sx={{
    backgroundColor: '#1e555c',
    color: '#fff',
    fontFamily: 'Jelligun, cursive',
    fontSize: '1.2rem',
    padding: '0.5rem 2rem',
    marginLeft: '-55rem', // Adjusts left positioning
    marginTop: '20%', // Adjusts down positioning
    transform: 'translateY(10px)', // Fine-tune vertical position
    '&:hover': {
      backgroundColor: '#174a4f',
    },
  }}
>
  Go back to Home Page
</Button>
      </Box>
    </Box>
  );
};

export default Error;
