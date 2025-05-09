// SignupPage.js
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography } from '@mui/material';
import styled, { createGlobalStyle } from 'styled-components';

// Global style
const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    overflow-x: hidden; /* Prevent horizontal scroll */
  }
  @font-face {
    font-family: 'Jelligun';
    src: url('/Jelligun-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal; /* Correct font style */
  }
  html {
    padding: 0;
    margin: 0;
  }
  h5 {
    font-family: 'Jelligun', sans-serif; /* Apply Jelligun font to h5 elements */
  }
`;

// Styled components
const PageContainer = styled.div`
  display: flex;
  height: 100vh; /* Full height */
  overflow: hidden; /* Prevent overflow */
  background-color: #e0f7f3; /* Background color for the page */
  justify-content: center; /* Center align horizontally */
  align-items: center; /* Center align vertically */
`;

const FormContainer = styled(Box)`
  width: 60vw; /* Width of the form */
  min-width: 400px; /* Minimum width */
  background: #2b6777; /* Background color for the form */
  padding: 20px;
  margin-top: 10px; /* Small top margin */
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex; /* Use flex to center the form content */
  flex-direction: column; /* Stack the form items vertically */
`;

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store form data in localStorage
    localStorage.setItem('formData', JSON.stringify(formData));

    // After submitting, redirect to /Home
    router.push('/Home');
  };

  return (
    <PageContainer>
      <GlobalStyle /> {/* Apply global styles */}
      <FormContainer>
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: '#f0f8f7',
            marginBottom: 2,
            fontFamily: 'Jelligun, sans-serif', // Apply Jelligun font
            fontSize: '36px', // Increase font size
          }}
        >
          Details
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: '#e0f7f3' }, // Label color
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1f4d52',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1f4d52',
                },
              },
            }}
          />

          <TextField
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: '#e0f7f3' }, // Label color
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1f4d52',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1f4d52',
                },
              },
            }}
          />

          <TextField
            label="Height (cm)"
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: '#e0f7f3' }, // Label color
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1f4d52',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1f4d52',
                },
              },
            }}
          />

          <TextField
            label="Weight (kg)"
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: '#e0f7f3' }, // Label color
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1f4d52',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1f4d52',
                },
              },
            }}
          />

          <Button 
            type="submit" 
            variant="contained" 
            fullWidth // Make the button full width
            sx={{ backgroundColor: '#1f4d52', color: 'white', marginTop: 2 }}>
            Submit
          </Button>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default SignupPage;
