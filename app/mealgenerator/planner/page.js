'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress, Grid, Card, CardActionArea, CardMedia, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import './flipcard.css';
import '../globals.css';
import SaveConfirmationDialog from '../components/SaveConfirmationDialog';

import VideoLoading from '../components/VideoLoading';

const PlannerPage = ({ videoUrl }) => {
  const [mealPlan, setMealPlan] = useState({});
  const [activeDay, setActiveDay] = useState('Monday');
  const [open, setOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchMealPlan = async () => {
      const diet = searchParams.get('diet');
      const health = JSON.parse(searchParams.get('health') || '[]');
      const cuisineType = JSON.parse(searchParams.get('cuisineType') || '[]');
      const mealType = JSON.parse(searchParams.get('mealType') || '[]');
      const calories = searchParams.get('calories');
      const excluded = searchParams.get('excluded');

      

      try {
        setLoading(true);
        const response = await fetch(`/api/mealplanner`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            diet,
            health,
            cuisineType,
            mealType,
            calories,
            excluded,
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


  const saveMealPlan = () => {
    localStorage.setItem('savedMealPlan', JSON.stringify(mealPlan));
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCardClick = (meal) => {
    setSelectedMeal(meal);
    setOpen(true);
  };

  if (loading) {
    return <VideoLoading videoUrl={'/mealwalkthrough.mp4'} comment={'Please wait while we make your Delicious Meal Plan...'}/>
  }

  const mealsForActiveDay = mealPlan[activeDay] || [];

  return (
    <Box
      sx={{
        backgroundColor: '#e0f7f3',
        minHeight: '100vh',
        padding: 5,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Jelligun, cursive', // Apply Jelligun font globally in this component
        color: '#2b6777'
        


      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Jelligun, cursive',fontSize:'4rem' ,fontWeight:'bold'}}>
          Meal Plan for {activeDay.charAt(0).toUpperCase() + activeDay.slice(1).toLowerCase()}
        </Typography>
        <Box sx={{ display: 'flex', marginBottom: 5 }}>
          {Object.keys(mealPlan).map((day) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Button
                variant={activeDay === day ? 'contained' : 'outlined'}
                onClick={() => setActiveDay(day)}
                sx={{
                  marginTop: 2.5,
                  marginRight: 1,
                  borderRadius: '30px',
                  transition: 'transform 0.2s ease-in-out',
                  fontFamily: 'Jelligun, cursive', 
                  fontSize:'1.3rem',// Add font to button text
                  '&:hover': {
                    transform: 'scale(1.05)',
                    justifyContent: 'center',
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
        {mealsForActiveDay && mealsForActiveDay.length > 0 ? (
  <Box 
  sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'flex-start', // Align items to the top to avoid unnecessary vertical centering
    minHeight: '80vh',
    gap: 2,
    marginTop: '2rem' // Adjust the top margin as needed
  }}
  >
    <Grid container spacing={3} justifyContent="center">

        {mealsForActiveDay.map((meal, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>

            <div className="flip-card" onClick={() => handleCardClick(meal)}>
              <div className="flip-card-inner">
                <Card className="flip-card-front" sx={{ width: '100%', height: '100%' }}>
                  <CardActionArea sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      image="/images/food.jpg"
                      alt={meal.name}
                      sx={{ objectFit: 'contain', width: '100%', height: '100%' }}
                    />
                  </CardActionArea>
                </Card>

                <Card className="flip-card-back">
                  <CardContent 
                    style={{ 
                      maxHeight: '10rem', 
                      overflowY: 'auto', 
                      fontFamily: 'Jelligun, cursive', 
                      padding:0
                      // position: 'relative' 
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      component="h1" 
                      fontWeight="bold" 
                      sx={{ fontFamily: 'Jelligun, cursive', fontSize: '2.8rem', marginTop: 0, 
                      paddingTop: 0 }}
                    >
                      {meal.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1.5rem', fontFamily: 'Jelligun, cursive' }}>
                      <span style={{ fontWeight: 'normal' }}>Cuisine:</span> {meal.cuisine || 'Sample Cuisine'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1.5rem', fontFamily: 'Jelligun, cursive' }}>
                      <span style={{ fontWeight: 'normal' }}>Calories:</span> {meal.calories ? Number(meal.calories).toFixed(2) : 'Sample Calories'}
                    </Typography>
                    <Link href="/recipegenerator/recipecart" passHref>
                      <Typography 
                        variant="caption2" 
                        className="details-link" 
                        sx={{ 
                          fontFamily: 'Jelligun, cursive', 
                          fontSize: '1.5rem', 
                          color: '#0070f3', 
                          textDecoration: 'none', 
                          position: 'absolute',   
                          bottom: 10,               
                          left: 10,                 
                        }}
                      >
                        Get Details
                      </Typography>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

    </Box>
        ) : (
          <Typography sx={{ fontFamily: 'Jelligun, cursive', fontSize: '2rem', textAlign: 'center' }}>No meals available for {activeDay}.</Typography>
        )}


        {/* Save Meal Plan Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Button
          variant="contained"
          onClick={saveMealPlan}
          sx={{
            padding: 1,
            width: "230px",
            borderRadius: "15px",
            backgroundColor: "#2b6777",
            color:"white",
            fontFamily:"Jelligun",
            fontSize:"1.3rem",
            fontWeight:'bold',
            "&:hover": { backgroundColor: "#2b6777", transform: "scale(1.05)" },
          }}
        >
          Save Meal Plan
        </Button>
      </Box>

      </motion.div>

      {/* Confirmation Dialog */}
      <SaveConfirmationDialog open={openDialog} onClose={handleCloseDialog} />

    </Box>
  );
};

export default PlannerPage;