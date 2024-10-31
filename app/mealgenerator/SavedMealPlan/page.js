'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
import '../globals.css';
import Link from 'next/link';
import './flipcards.css';

const SavedMealPlanPage = () => {
  const [savedMealPlan, setSavedMealPlan] = useState({});
  const [activeDay, setActiveDay] = useState('Monday'); // Default to Monday
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const loadedMealPlan = JSON.parse(localStorage.getItem('savedMealPlan') || '{}');
    setSavedMealPlan(loadedMealPlan);
    setLoading(false); // Set loading to false once data is loaded
  }, []);

  const mealsForActiveDay = savedMealPlan[activeDay] || [];

  return (
    <Box sx={{ minHeight: '100vh', padding: 5, fontFamily: 'Jelligun, cursive', color: '#2b6777', backgroundColor: '#e0f7f3' }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ fontFamily: 'Jelligun, cursive', fontSize: '4rem', fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
        Saved Meal Plan for {activeDay}
      </Typography>
      
      {/* Day Selector Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
        {Object.keys(savedMealPlan).map((day) => (
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
                marginRight: 1,
                borderRadius: '30px',
                transition: 'transform 0.2s ease-in-out',
                fontFamily: 'Jelligun, cursive',
                fontSize: '1.3rem',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {day}
            </Button>
          </motion.div>
        ))}
      </Box>

      {/* Meal Cards or Loading Indicator */}
      <motion.div
        key={activeDay}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {loading ? ( // Check for loading state
          <Typography sx={{ fontFamily: 'Jelligun, cursive', fontSize: '4rem', textAlign: 'center' }}>
            Loading...
          </Typography>
        ) : mealsForActiveDay && mealsForActiveDay.length > 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', gap: 2, marginTop: '2rem' }}>
            <Grid container spacing={3} justifyContent="center">
              {mealsForActiveDay.map((meal, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                  <div className="flip-card">
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
                        sx={{
                          maxHeight: '40rem',
                          overflowY: 'auto',
                          fontFamily: 'Jelligun, cursive',
                          padding: 1,
                        }}
                      >
                        <div className="heading-container"> {/* Add a container for the heading */}
                          <Typography
                            variant="h5"
                            fontWeight="normal"
                            className="heading" // Ensure class is applied for styling
                            sx={{
                              fontFamily: 'Jelligun, cursive',
                              fontSize: 'inherit', // Inherit font size from CSS class
                              marginBottom: '0.5rem',
                              marginTop: '0rem',
                              lineHeight: 1,
                            }}
                          >
                            {meal.name}
                          </Typography>
                        </div>

                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '1.8rem',
                            fontFamily: 'Jelligun, cursive',
                            marginBottom: '0',
                            lineHeight: 1,
                          }}
                        >
                          <span style={{ fontWeight: 'normal' }}>Cuisine:</span> {meal.cuisine || 'Sample Cuisine'}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '1.8rem',
                            fontFamily: 'Jelligun, cursive',
                            marginBottom: '0',
                            lineHeight: 1,
                          }}
                        >
                          <span style={{ fontWeight: 'normal' }}>Calories:</span> {meal.calories ? Number(meal.calories).toFixed(2) : 'Sample Calories'}
                        </Typography>
                      </CardContent>

                        <Link href="/recipegenerator/recipecart" passHref>
                          <Typography
                            variant="caption2"
                            className="details-link"
                            sx={{
                              fontFamily: 'Jelligun, cursive',
                              fontSize: '1.5rem',
                              color: '#0070f3',
                              textDecoration: 'none', // This should already be set
                              position: 'relative',
                              marginTop: 'auto', // Push to the bottom
                            }}
                          >
                            Get Details
                          </Typography>
                        </Link>

                      </Card>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Typography sx={{ fontFamily: 'Jelligun, cursive', fontSize: '2rem', textAlign: 'center' }}>
            No meals available for {activeDay}.
          </Typography>
        )}
      </motion.div>
    </Box>
  );
};

export default SavedMealPlanPage;
