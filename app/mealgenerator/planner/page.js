


'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, Dialog, CircularProgress, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import '../globals.css';
import VideoLoading from '../components/VideoLoading';

const PlannerPage = ({ videoUrl }) => {  // Added videoUrl as a prop
  const [mealPlan, setMealPlan] = useState({});
  const [activeDay, setActiveDay] = useState('Monday');
  const [open, setOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
    // Replace with your actual video URL


  // Fetch meal plan from API using the URL search params
  useEffect(() => {
    const fetchMealPlan = async () => {
      const goalWeight = searchParams.get('goalWeight');
      const activityLevel = searchParams.get('activityLevel');
      const allergies = JSON.parse(searchParams.get('allergies') || '{}');
      const dislikedFoods = searchParams.get('dislikedFoods');
      const healthConditions = searchParams.get('healthConditions');
      const mealTimes = searchParams.get('mealTimes');
      const calorieGoal = searchParams.get('calorieGoal');
      const budget = searchParams.get('budget');
      const gender = searchParams.get('gender');
      const dietType = searchParams.get('dietType');
      const mealsPerDay = searchParams.get('mealsPerDay');

      try {
        setLoading(true);
        const response = await fetch(`/api/mealplanner`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            goalWeight,
            activityLevel,
            allergies,
            dislikedFoods,
            healthConditions,
            mealTimes,
            calorieGoal,
            budget,
            gender,
            dietType,
            mealsPerDay,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch meal plan: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Meal Plan Response:", data);

        if (data.mealPlan) {
          setMealPlan(data.mealPlan);
        } else {
          throw new Error('Invalid mealPlan structure');
        }
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, [searchParams]);

  const handleCardClick = (meal) => {
    setSelectedMeal(meal);  // Set the selected meal data here
    setOpen(true);  // Open the dialog
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMeal(null);  // Clear the selected meal data
  };

  // Show basic loading indicator
  if (loading) {
    return <VideoLoading videoUrl="/mealwalkthrough.mp4" />; // Remove 'public' from the path
}




  // Check if activeDay has meals
  const mealsForActiveDay = mealPlan[activeDay];

  return (
    <Box
      sx={{
        backgroundColor: '#cee2d2',
        minHeight: '100vh',
        padding: 5,
        color: '#102820',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5 }}>
        <Typography variant="h4" gutterBottom>Meal Plan for {activeDay.charAt(0).toUpperCase() + activeDay.slice(1).toLowerCase()}</Typography>
        <Box sx={{ display: 'flex', marginBottom: 5 }}>
      {Object.keys(mealPlan).map((day) => (
        <motion.div
          key={day}
          initial={{ opacity: 0, x: -100 }}  // Initial state (off-screen to the left)
          animate={{ opacity: 1, x: 0 }}    // Final state (centered)
          exit={{ opacity: 0, x: 100 }}     // Exit state (drift right)
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}  // Animation settings
        >
          <Button
            variant={activeDay === day ? 'contained' : 'outlined'}
            onClick={() => setActiveDay(day)}
            sx={{
              marginTop: 4,
              marginRight: 1,
              borderRadius: '20px',
              transition: 'transform 0.2s ease-in-out',  // Smooth hover effect
              '&:hover': {
                transform: 'scale(1.05)',  // Drift effect on hover
              },
            }}
          >
            {day}
          </Button>
        </motion.div>
      ))}
    </Box>
      </Box>

      <motion.div
        key={activeDay}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {mealsForActiveDay && mealsForActiveDay.length === 0 ? (
          <Typography>No meals available for {activeDay}.</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            {mealsForActiveDay && mealsForActiveDay.length > 0 ? (
              <Grid container spacing={2}>
                {mealsForActiveDay.map((meal, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Card with full background image and hover effect */}
                      <Box
                        onClick={() => handleCardClick(meal)}
                        sx={{
                          position: 'relative',
                          cursor: 'pointer',
                          height: 200,
                          borderRadius: '8px',
                          overflow: 'hidden',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                          '&:hover .meal-name': {
                            opacity: 1,
                            backgroundColor: "transparent",  // Show meal name on hover
                          },
                          '&:hover .meal-image': {
                            filter: 'blur(5px)',  // Blur the image on hover
                            transform: 'scale(1.05)',  // Slight scale on hover
                          },
                        }}
                      >
                        {/* Background Image */}
                        <Box
                          className="meal-image"
                          component="img"
                          src="/images/food.jpg" // Use static image from the public/images directory
                          alt={meal.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease, filter 0.3s ease',
                          }}
                        />

                        {/* Meal Name Overlay */}
                        <Box
                          className="meal-name"
                          sx={{
                            position: 'relative',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            // color: '#cee2d2',
                            color:'black',
                            textAlign:'center',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          }}
                        >
                          <Typography variant="h6">{meal.name}</Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No meals available for {activeDay}.</Typography>
            )}
          </Box>
        )}
      </motion.div>

      {/* Dialog for displaying full meal image and details */}
      <Dialog
  open={open}
  onClose={handleClose}
  maxWidth="md" // Restricting to medium width
  fullWidth
  sx={{
    height: '90%', // Restrict the height of the dialog to 90% of the viewport
    maxHeight: '90%', // Ensure the dialog never exceeds the viewport height
    overflow: 'hidden', // Prevent any overflow that would cause scrollbars
  }}
>
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0 }}
    transition={{ duration: 0.3 }}
  >
    {selectedMeal && (
      <Box
        sx={{
          display: 'flex',
          height: '100%', // Ensure the container takes the full height of the dialog
          background: '#fff',
          borderRadius: '0px',
          boxShadow: 3,
          overflow: 'hidden', // Ensure no overflow from the container itself
        }}
      >
        {/* Left Side: Meal Image */}
        <Box
          sx={{
            width: '60%', // Image takes 60% of the width
            position: 'relative',
          }}
        >
          <Box
            component="img"
            alt={selectedMeal.name}
            src="/images/food.jpg" // Static image path (replace with dynamic src later)
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensure the image covers the container while maintaining aspect ratio
              borderTopRightRadius: '150px',
              borderBottomRightRadius: '150px',
              transition: 'transform 0.3s ease', // Optional: Add transition for scaling
            }}
          />
        </Box>

        {/* Right Side: Meal Information */}
        <Box
          sx={{
            width: '40%', // Information takes up 40% of the width
            height: '100%', // Ensure it takes the full height of the dialog
            padding: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Center content vertically
          }}
        >
          <Typography variant="h5" gutterBottom>{selectedMeal.name}</Typography>
          <Typography variant="body1">{selectedMeal.description}</Typography>
          {/* Add any other meal details like ingredients or nutrition here */}
        </Box>
      </Box>
    )}
  </motion.div>
</Dialog>







    </Box>
  );
};

export default PlannerPage;





