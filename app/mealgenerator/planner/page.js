'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import Link from 'next/link';
import './flipcard.css';
import '../globals.css';
import SaveConfirmationDialog from '../components/SaveConfirmationDialog';
import VideoLoading from '../components/VideoLoading';
import Navbar from "../../components/Navbar";

const PlannerPage = ({ videoUrl }) => {
  const [mealPlan, setMealPlan] = useState({});
  const [activeDay, setActiveDay] = useState('Monday');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchMealPlan = async () => {
      const diet = JSON.parse(searchParams.get('diet') || '[]');
      const health = JSON.parse(searchParams.get('health') || '[]');
      const cuisineType = JSON.parse(searchParams.get('cuisineType') || '[]');
      const mealType = JSON.parse(searchParams.get('mealType') || '[]');
      const calories = searchParams.get('calories');
      const excluded = searchParams.get('excluded');

      try {
        setLoading(true);
        // console.log(diet,
        //   health,
        //   cuisineType,
        //   mealType,
        //   calories,
        //   excluded)
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
        // console.log("Meal Plan Response:", data.mealPlan);

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

  // const saveMealPlan = () => {
  //   localStorage.setItem('savedMealPlan', JSON.stringify(mealPlan));
  //   setOpenDialog(true);
  // };

  const saveMealPlan = () => {
      console.log("Saving meal plan:", mealPlan); // Log meal plan structure

      // Remove existing meal plan if it exists
      if (localStorage.getItem('savedMealPlan')) {
          localStorage.removeItem('savedMealPlan');
          console.log("Existing meal plan removed.");
      }

      // Save the new meal plan
      localStorage.setItem('savedMealPlan', JSON.stringify(mealPlan));
      setOpenDialog(true);

      // Confirm saved data
      const savedData = localStorage.getItem('savedMealPlan');
      console.log("Confirmed saved data:", JSON.parse(savedData));
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCardClick = (meal) => {
    setSelectedMeal(meal);
    setOpen(true);
  };

  if (loading) {
    return <VideoLoading videoUrl={'/mealwalkthrough.mp4'} comment={'Please wait while we make your Delicious Meal Plan...'} />;
  }

  const mealsForActiveDay = mealPlan[activeDay] || [];
  // console.log(mealsForActiveDay);
  // if (mealsForActiveDay && mealsForActiveDay.length > 0) {
  //   mealsForActiveDay.map((meal) => {
  //     // console.log(meal.name);
  //   });
  // } else {
  //   console.log("No meals available or mealsForActiveDay is undefined");
  // }

  return (
    <Box sx={{ position: 'relative', padding: 0 }}>
  {/* Navbar */}
  {/* <Box sx={{ position: "absolute", zIndex: 2, width: "100%", marginTop: 0, padding: 0 }}>
    <Navbar transparent={true} white={false} />
  </Box> */}
        <Navbar  />


  {/* Main Content */}
  <Box
    sx={{
      backgroundColor: '#e0f7f3',
      minHeight: '100vh',
      padding: 5,
      paddingTop: '30px', // Add top padding to avoid content overlap with the navbar
      fontFamily: 'Jelligun, cursive',
      color: '#2b6777',
    }}
  >

    {/* Back Button and Heading Container */}
    {/* Back Button */}
    <Link href="/mealgenerator" passHref>
        <IconButton
          sx={{
            position: 'absolute',
            top: '5rem',
            left: '1rem',
            backgroundColor: '#2b6777',
            color: 'white',
            "&:hover": {
                    backgroundColor: "#2b6777",
                    transform: "scale(1.05)",
                    boxShadow: "0px 0px 3px 3px rgba(43, 103, 119, 0.3), 0px 0px 10px 5px rgba(43, 103, 119, 0.3)"
                  },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: '1.5rem' }} /> {/* Door icon */}
        </IconButton>
      </Link>

      
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: 'Jelligun, cursive',
          fontSize: '4rem',
          fontWeight: 'bold',
          textAlign: 'center', 
          flexGrow: 1, 
          marginTop: '0rem',
        }}
      >
        Meal Plan for {activeDay.charAt(0).toUpperCase() + activeDay.slice(1).toLowerCase()}
      </Typography>
      {/* Page Title */}
      


    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5 }}>
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
                width: "7rem",
                height: "3rem",
                marginTop: 2.5,
                marginRight: 1,
                borderRadius: '50px',
                transition: 'transform 0.2s ease-in-out',
                fontFamily: 'Jelligun, cursive',
                fontSize: '1.7rem',
                textTransform: "none",
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
    </Box>

    {/* Meal Plan Content */}
<motion.div
  key={activeDay}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>

{/* <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5rem',
    paddingBottom: '4rem', 
    marginLeft:'2.5rem'}}> */}
  <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      // minHeight: '80vh',
      marginLeft:'2rem',
      marginTop: '2rem',
      paddingBottom:'1rem' ,
      gap: 0,
    }}
  >
    {mealsForActiveDay ? (
      <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: 0 }}> {/* Remove margin below grid */}
        {Object.values(mealsForActiveDay).map((meal, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
            <div className="flip-card">
              <div className="flip-card-inner">
                <Card className="flip-card-front" sx={{ width: '100%', height: '100%' }}>
                  <CardActionArea sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      image={meal.image || "no image available"}
                      alt={meal.name}
                      sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
                    <div className="heading-container">
                      <Typography
                        variant="h5"
                        fontWeight="normal"
                        className="heading"
                        sx={{
                          fontFamily: 'Jelligun, cursive',
                          fontSize: 'inherit',
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
                      <span style={{ fontWeight: 'normal' }}>Cuisine:</span> {meal.cuisineType ? meal.cuisineType.join(', ') : 'Sample Cuisine'}
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

                  <Link
                    href={{
                      pathname: '/recipegenerator/reciperesults',
                      query: { dish: meal.name },
                    }}
                    passHref
                  >
                    <Typography
                      variant="caption2"
                      className="details-link"
                      sx={{
                        fontFamily: 'Jelligun, cursive',
                        fontSize: '1.5rem',
                        color: '#0070f3',
                        textDecoration: 'none',
                        position: 'relative',
                        marginTop: 'auto',
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
    ) : (
      <Typography sx={{ fontFamily: 'Jelligun, cursive', fontSize: '3rem', textAlign: 'center' }}>
        No meals available for {activeDay}.
      </Typography>
    )}

 {/* Save Meal Plan Button */}
 <Box sx={{ display: 'flex', flexDirection:"row",justifyContent: 'center', marginTop: "2rem",padding:0}}> {/* Adjusted marginTop conditionally */}
      <Button
        variant="contained"
        onClick={saveMealPlan}
        sx={{
          padding: 0,
          width: "15rem",
      height: "4rem",
          borderRadius: "50rem",
          backgroundColor: "#2b6777",
          color: "white",
          fontFamily: "Jelligun",
          fontSize: "2.4rem",
          fontWeight: "bold",
          textAlign: "center",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#2b6777",
            transform: "scale(1.05)",
            boxShadow: "0px 0px 5px 5px rgba(43, 103, 119, 0.5), 0px 0px 20px 10px rgba(43, 103, 119, 0.5)",
          },
        }}
      >
        Save Meal Plan
      </Button>
    </Box>
    
  </Box>
</motion.div>


        <SaveConfirmationDialog open={openDialog} onClose={handleCloseDialog} />
      </Box>
    </Box>
  );
};

export default PlannerPage;
