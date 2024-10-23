'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Container, CircularProgress, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { motion } from 'framer-motion';
import './globals.css';
import HexagonGallery from '../mealgenerator/bganimation/HexagonGallery'; // Adjust path as needed

// Background Images
const images = [
  '/images/meal1.jpg',
  '/images/meal2.jpg',
  '/images/meal3.jpg',
  '/images/meal4.jpg',
  '/images/meal5.jpg',
  '/images/meal6.jpg',
  '/images/meal7.jpg',
  '/images/meal8.jpg',
  '/images/meal9.jpg',
  '/images/meal10.jpg',
  '/images/meal11.jpg',
  '/images/meal12.jpg',
];

const MealGeneratorPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    diet: '',
    health: [],
    cuisineType: [],
    mealType: [],
    calories: '',
    excluded: '',
  });

  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedArray = checked
        ? [...prevData[category], value]
        : prevData[category].filter((item) => item !== value);
      return { ...prevData, [category]: updatedArray };
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(`/mealgenerator/planner?diet=${JSON.stringify(formData.diet)}&health=${JSON.stringify(formData.health)}&cuisineType=${JSON.stringify(formData.cuisineType)}&mealType=${JSON.stringify(formData.mealType)}&calories=${formData.calories}&excluded=${formData.excluded}`);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh', // Ensures the page covers at least the full viewport height
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
        padding: 4,
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Hexagon Gallery Background */}
      <HexagonGallery />
      
      {/* Form Section */}
      <Box
        sx={{
          width: '100%', // Full width for form section on smaller screens
          maxWidth: '40%', // Limits width for larger screens
          zIndex: 2, // Ensure it appears above the video background
          padding: 5,
          minHeight: '100vh', // Ensure the form section also takes up the full viewport height
          display: 'flex', // Flex to center content
          flexDirection: 'column',
          justifyContent: 'center', // Vertically centers the form
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress sx={{ color: '#000' }} />
            <Typography variant="h6" sx={{ marginTop: 2, color: '#000' }}>
              Generating Your Meal Plan...
            </Typography>
          </Box>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              borderRadius: '12px',
            }}
          >
            <Container
              maxWidth="sm"
              sx={{
                padding: 3,
                backgroundColor: '#cee2d2',
                borderRadius: '12px',
                boxShadow: '0 8px 8px rgba(0, 0, 0, 0.25)',
                // backdropFilter: 'blur(0px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#000', textAlign: 'center' }}>
                Meal Plan Generator
              </Typography>

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                {/* Diet Type */}
            {/* Diet Type */}
            <TextField
                  label="Diet Type"
                  fullWidth
                  value={formData.diet}
                  onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                  sx={{ marginBottom: 2, input: { color: '#000' }, label: { color: '#000' } }}
                />

{/* Health Conditions */}
<FormGroup sx={{ display: 'flex', flexWrap: 'nowrap', marginBottom: 2 }}>
  <Typography sx={{ color: '#000', marginRight: 2 }}>Health Conditions:</Typography>
  {['alcohol-free', 'sugar-conscious', 'nut-free', 'gluten-free'].map((condition) => (
    <FormControlLabel
      key={condition}
      control={
        <Checkbox
          checked={formData.health.includes(condition)}
          onChange={(e) => handleCheckboxChange(e, 'health')}
          value={condition}
        />
      }
      label={condition.charAt(0).toUpperCase() + condition.slice(1)}
      sx={{ color: '#000', marginRight: 2 }} // Add margin for spacing
    />
  ))}
  <TextField
    label="Other Health Conditions"
    fullWidth
    value={formData.health.includes('other') ? formData.health.find(item => item !== 'other') : ''}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prevData) => ({
        ...prevData,
        health: value ? [...prevData.health.filter(item => item !== 'other'), value] : prevData.health.filter(item => item !== 'other'),
      }));
    }}
    sx={{ input: { color: '#000' }, label: { color: '#000' }, marginLeft: 2 }} // Add margin for spacing
  />
</FormGroup>

{/* Cuisine Type */}
<FormGroup sx={{ display: 'flex', flexWrap: 'nowrap', marginBottom: 2 }}>
  <Typography sx={{ color: '#000', marginRight: 2 }}>Cuisine Type:</Typography>
  {['Italian', 'Mexican', 'Indian', 'Chinese', 'Mediterranean'].map((cuisine) => (
    <FormControlLabel
      key={cuisine}
      control={
        <Checkbox
          checked={formData.cuisineType.includes(cuisine)}
          onChange={(e) => handleCheckboxChange(e, 'cuisineType')}
          value={cuisine}
        />
      }
      label={cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
      sx={{ color: '#000', marginRight: 2 }} // Add margin for spacing
    />
  ))}
  <TextField
    label="Other Cuisine"
    fullWidth
    value={formData.cuisineType.includes('other') ? formData.cuisineType.find(item => item !== 'other') : ''}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prevData) => ({
        ...prevData,
        cuisineType: value ? [...prevData.cuisineType.filter(item => item !== 'other'), value] : prevData.cuisineType.filter(item => item !== 'other'),
      }));
    }}
    sx={{ input: { color: '#000' }, label: { color: '#000' }, marginLeft: 2 }} // Add margin for spacing
  />
</FormGroup>

{/* Meal Type */}
<FormGroup sx={{ display: 'flex', flexWrap: 'nowrap', marginBottom: 2 }}>
  <Typography sx={{ color: '#000', marginRight: 2 }}>Meal Type:</Typography>
  {['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Teatime'].map((meal) => (
    <FormControlLabel
      key={meal}
      control={
        <Checkbox
          checked={formData.mealType.includes(meal)}
          onChange={(e) => handleCheckboxChange(e, 'mealType')}
          value={meal}
        />
      }
      label={meal}
      sx={{ color: '#000', marginRight: 2 }} // Add margin for spacing
    />
  ))}
</FormGroup>


                {/* Calories Input */}
                <TextField
                  label="Calories"
                  type="number"
                  fullWidth
                  value={formData.calories}
                  onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                  sx={{ marginBottom: 2, input: { color: '#000' }, label: { color: '#000' } }}
                />

                {/* Excluded Foods Input */}
                <TextField
                  label="Excluded Foods"
                  fullWidth
                  value={formData.excluded}
                  onChange={(e) => setFormData({ ...formData, excluded: e.target.value })}
                  sx={{ marginBottom: 2, input: { color: '#000' }, label: { color: '#000' } }}
                />

                <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#000', color: '#fff', marginTop: 3 }}>
                  Generate Meal Plan
                </Button>
              </form>
            </Container>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default MealGeneratorPage;
