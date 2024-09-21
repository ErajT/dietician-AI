"use client";
import React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';// Import from material


const Loading = () => {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
    <CircularProgress color="secondary" />
    
  </Stack>
  );
}

export default Loading;
