'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Container, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const MealGeneratorPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    dietType: '',
    mealsPerDay: ''
  });
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Simulate API call duration or real data fetch delay
    setTimeout(() => {
      // Navigate to planner page with query params
      router.push(`/mealgenerator/planner?page=1&age=${formData.age}&gender=${formData.gender}&dietType=${formData.dietType}&mealsPerDay=${formData.mealsPerDay}`);
    }, 1000); // Mock delay
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://source.unsplash.com/random/?food,healthy)', // Replace with your preferred background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
      }}
    >
      {loading ? ( // Show loading spinner when in loading state
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress sx={{ color: '#fff' }} />
          <Typography variant="h6" sx={{ marginTop: 2, color: '#fff' }}>
            Generating Your Meal Plan...
          </Typography>
        </Box>
      ) : (
        // Animated Form Container
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 8px rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255, 255, 255, 0.18)', borderRadius: '16px' }}
        >
          <Container
            maxWidth="sm"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 4,
              backgroundColor: '#cee2d2', // More opaque for better contrast
              borderRadius: '16px',
              boxShadow: '0 8px 8px rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(10px)', // Glassmorphism blur effect
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#000' }}>
              Meal Plan Generator
            </Typography>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              {/* Age Field */}
              <TextField
                label="Age"
                type="number"
                fullWidth
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
                sx={{ marginBottom: 3, input: { color: '#000' }, label: { color: '#000' } }}
              />

              {/* Gender Field */}
              <FormControl fullWidth required sx={{ marginBottom: 3 }}>
                <InputLabel sx={{ color: '#000' }}>Gender</InputLabel>
                <Select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  sx={{ color: '#000', borderColor: '#000' }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>

              {/* Diet Type Field */}
              <TextField
                label="Diet Type"
                fullWidth
                value={formData.dietType}
                onChange={(e) => setFormData({ ...formData, dietType: e.target.value })}
                required
                sx={{ marginBottom: 3, input: { color: '#000' }, label: { color: '#000' } }}
              />

              {/* Meals Per Day Field */}
              <TextField
                label="Meals Per Day"
                type="number"
                fullWidth
                value={formData.mealsPerDay}
                onChange={(e) => setFormData({ ...formData, mealsPerDay: e.target.value })}
                required
                sx={{ marginBottom: 3, input: { color: '#000' }, label: { color: '#000' } }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  padding: '10px',
                  fontWeight: 'bold',
                  backgroundColor: '#2e7d32',
                  '&:hover': {
                    backgroundColor: '#1b5e20',
                  },
                }}
              >
                Generate Meal Plan
              </Button>
            </form>
          </Container>
        </motion.div>
      )}
    </Box>
  );
};

export default MealGeneratorPage;
