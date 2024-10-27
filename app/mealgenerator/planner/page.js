'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, Dialog, CircularProgress, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Import Link from Next.js
import './flipcard.css';
import '../../globals.css';
import VideoLoading from '../components/VideoLoading';

const PlannerPage = ({ videoUrl }) => {
  const [mealPlan, setMealPlan] = useState({});
  const [activeDay, setActiveDay] = useState('Monday');
  const [open, setOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Fetch meal plan from API using the URL search params
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

  const handleCardClick = (meal) => {
    setSelectedMeal(meal);
    setOpen(true);
  };

  

  // Show basic loading indicator
  if (loading) {
    return <VideoLoading videoUrl="/mealwalkthrough.mp4" />; // Remove 'public' from the path
  }

  const mealsForActiveDay = mealPlan[activeDay] || []; // Default to an empty array if undefined

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
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Button
                variant={activeDay === day ? 'contained' : 'outlined'}
                onClick={() => setActiveDay(day)}
                sx={{
                  marginTop: 4,
                  marginRight: 1,
                  borderRadius: '20px',
                  transition: 'transform 0.2s ease-in-out',
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <Grid container spacing={2} justifyContent="left">
              {mealsForActiveDay.map((meal, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                  <div className="flip-card" onClick={() => handleCardClick(meal)}>
                    <div className="flip-card-inner">
                      {/* Front side of the card */}
                      <Card className="flip-card-front" sx={{ width: '100%', height: '100%' }}>
                        <CardActionArea sx={{ height: '100%' }}>
                          <CardMedia
                            component="img"
                            image="/images/food.jpg" // Static image for now
                            alt={meal.name}
                            sx={{ objectFit: 'contain', width: '100%', height: '100%' }} // Cover ensures full coverage
                          />
                        </CardActionArea>
                      </Card>

                      {/* Back side of the card */}
                      <Card className="flip-card-back">
                        <CardContent style={{ maxHeight: '10rem', overflowY: 'auto' }}>
                          <Typography 
                            className="heading" 
                            variant="h5" 
                            component="h1" 
                            fontWeight="bold"
                          >
                            {meal.name}
                          </Typography>
                          <Typography variant="body2">
                            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Cuisine:</span> {meal.cuisine || 'Sample Cuisine'}
                          </Typography>
                          <Typography variant="body2">
                            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Calories:</span> {meal.calories ? Number(meal.calories).toFixed(2) : 'Sample Calories'}
                          </Typography>
                          {/* Add the animated link here */}
                          <Link href="/recipegenerator/recipecart" className="details-link" passHref>
                            Get Details
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
          <Typography>No meals available for {activeDay}.</Typography>
        )}
      </motion.div>
    </Box>
  );
};

export default PlannerPage;
