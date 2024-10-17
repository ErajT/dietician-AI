// 'use client';

// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { Box, Button, Typography, Card, CardContent, CardMedia, AppBar, Toolbar, Dialog, CircularProgress } from '@mui/material';
// import { motion } from 'framer-motion';

// const PlannerPage = () => {
//   const [mealPlan, setMealPlan] = useState({});
//   const [activeDay, setActiveDay] = useState('Monday');
//   const [open, setOpen] = useState(false);
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();

//   // Fetch meal plan from API
//   useEffect(() => {
//     const fetchMealPlan = async () => {
//       const age = searchParams.get('age');
//       const gender = searchParams.get('gender');
//       const dietType = searchParams.get('dietType');
//       const mealsPerDay = searchParams.get('mealsPerDay');

//       try {
//         setLoading(true);
//         const response = await fetch(`/api/mealplanner`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             age,
//             gender,
//             dietType,
//             mealsPerDay,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch meal plan: ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log("Meal Plan Response:", data);

//         if (data.mealPlan) {
//           setMealPlan(data.mealPlan);
//         } else {
//           throw new Error('Invalid mealPlan structure');
//         }
//       } catch (error) {
//         console.error("Error fetching meal plan:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMealPlan();
//   }, [searchParams]);

//   const handleTabClick = (day) => {
//     setActiveDay(day);
//   };

//   const handleCardClick = (meal) => {
//     setSelectedMeal(meal);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedMeal(null);
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//         <CircularProgress color="secondary" />
//       </Box>
//     );
//   }

//   if (!mealPlan || Object.keys(mealPlan).length === 0) {
//     return <Typography>No meal plan available.</Typography>;
//   }

//   // Check if activeDay has meals
//   const mealsForActiveDay = mealPlan[activeDay];

//   return (
//     <Box 
//       sx={{ 
//         backgroundImage: 'url("path/to/background.jpg")', 
//         backgroundSize: 'cover', 
//         minHeight: '100vh', 
//         padding: 2, 
//         color: '#fff'
//       }}
//     >
//       <AppBar position="static" sx={{ background: 'rgba(0, 0, 0, 0.7)' }}>
//         <Toolbar>
//           <Typography variant="h6">Meal Planner</Typography>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
//         <Typography variant="h4" gutterBottom>Meal Plan for {activeDay}</Typography>
//         <Box sx={{ display: 'flex', marginBottom: 2 }}>
//           {Object.keys(mealPlan).map((day) => (
//             <Button
//               key={day}
//               variant={activeDay === day ? 'contained' : 'outlined'}
//               onClick={() => handleTabClick(day)}
//               sx={{ marginRight: 1, borderRadius: '20px' }}
//             >
//               {day}
//             </Button>
//           ))}
//         </Box>
//       </Box>

//       <motion.div
//         key={activeDay}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.3 }}
//       >
//         {mealsForActiveDay && mealsForActiveDay.length === 0 ? (
//           <Typography>No meals available for {activeDay}.</Typography>
//         ) : (
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
//             {mealsForActiveDay && mealsForActiveDay.length > 0 ? (
//               mealsForActiveDay.map((meal, index) => {
//                 const mealName = meal.meal || "Meal Name";  // Use 'meal' from API
//                 const mealImage = meal.image || "https://via.placeholder.com/150";  // Fallback for missing images

//                 return (
//                   <Card
//                     key={index}
//                     sx={{
//                       width: 250,
//                       transition: 'transform 0.3s',
//                       '&:hover': { transform: 'scale(1.05)', boxShadow: 3 },
//                     }}
//                     onClick={() => handleCardClick(meal)}
//                   >
//                     <CardMedia
//                       component="img"
//                       alt={mealName}
//                       height="140"
//                       image={mealImage}
//                     />
//                     <CardContent>
//                       <Typography variant="h6">{mealName}</Typography>
//                     </CardContent>
//                   </Card>
//                 );
//               })
//             ) : (
//               <Typography>No meals available for {activeDay}.</Typography>
//             )}
//           </Box>
//         )}
//       </motion.div>

//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//         <Box sx={{ padding: 2, background: 'rgba(255, 255, 255, 0.9)' }}>
//           {selectedMeal && (
//             <>
//               <CardMedia
//                 component="img"
//                 alt={selectedMeal.meal || "Meal image"}
//                 height="140"
//                 image={selectedMeal.image || "https://via.placeholder.com/150"}  // Fallback for missing images
//               />

//               <Typography variant="h5">{selectedMeal.meal || "Meal Name"}</Typography>
//               <Typography variant="body1" sx={{ marginBottom: 2 }}>{selectedMeal.details || "No details available."}</Typography>
//               <Button onClick={handleClose} variant="contained">Close</Button>
//             </>
//           )}
//         </Box>
//       </Dialog>
//     </Box>
//   );
// };

// export default PlannerPage;

















































'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, Card, CardContent, CardMedia, Dialog, CircularProgress, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const PlannerPage = () => {
  const [mealPlan, setMealPlan] = useState({});
  const [activeDay, setActiveDay] = useState('Monday');
  const [open, setOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Fetch meal plan from API
  useEffect(() => {
    const fetchMealPlan = async () => {
      const age = searchParams.get('age');
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
            age,
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
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#cee2d2',
          color: '#102820',
        }}
      >
        <CircularProgress sx={{ color: '#102820' }} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading your meal plan...
        </Typography>
      </Box>
    );
  }

  if (!mealPlan || Object.keys(mealPlan).length === 0) {
    return <Typography>No meal plan available.</Typography>;
  }

  // Check if activeDay has meals
  const mealsForActiveDay = mealPlan[activeDay];

  return (
    <Box 
      sx={{ 
        backgroundColor: '#cee2d2', 
        minHeight: '100vh', 
        padding: 2, 
        color: '#102820', 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom>Meal Plan for {activeDay}</Typography>
        <Box sx={{ display: 'flex', marginBottom: 2 }}>
          {Object.keys(mealPlan).map((day) => (
            <Button
              key={day}
              variant={activeDay === day ? 'contained' : 'outlined'}
              onClick={() => setActiveDay(day)}
              sx={{ marginRight: 1, borderRadius: '20px' }}
            >
              {day}
            </Button>
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
                      <Card
                        sx={{
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                          '&:hover': { transform: 'scale(1.05)', boxShadow: 3 },
                        }}
                        onClick={() => handleCardClick(meal)}
                      >
                        <CardMedia
                          component="img"
                          alt={meal.name}  // Correct meal name here
                          height="140"
                          image={meal.image || "https://via.placeholder.com/150"}  // Use meal.image or fallback
                        />

                        <CardContent>
                          <Typography variant="h6">{meal.name}</Typography>  {/* Display the meal name */}
                        </CardContent>
                      </Card>
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
        maxWidth="md" // You can set this to any size like 'sm', 'md', or 'lg'
        fullWidth
        sx={{
          height: '90%', // Set dialog height to 90% of the screen
          maxHeight: '90vh', // Ensure it doesn't exceed the screen height
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedMeal && ( // Add a check to ensure selectedMeal is not null
            <Box 
              sx={{ 
                display: 'flex', 
                height: '100%', // Ensure the content fills the entire dialog
                background: '#fff', 
                borderRadius: '8px', 
                boxShadow: 3 
              }}
            >
              {/* Left Side: Meal Image */}
              <Box
                sx={{
                  width: '40%', // Image takes up 40% of the dialog width
                  position: 'relative',
                }}
              >
                <CardMedia
                  component="img"
                  alt={selectedMeal.name}  // Display meal name in alt
                  image={selectedMeal.image || "https://via.placeholder.com/150"} // Fallback to placeholder if no image
                  sx={{ 
                    height: '100%',  // Cover entire height
                    width: '100%',   // Cover entire width
                    objectFit: 'cover', 
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                  }}
                />

                {/* Semicircle Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: '-40px', // Slightly extend beyond the image
                    width: '80px',
                    height: '100%',
                    backgroundColor: '#fff', // Same as dialog background
                    borderTopRightRadius: '50%',
                    borderBottomRightRadius: '50%',
                  }}
                />
              </Box>
              
              {/* Right Side: Meal Details */}
              <Box 
                sx={{ 
                  padding: '5%',  // Adjust padding as necessary
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  width: '60%', // Details take up 60% of the dialog width
                }}
              >
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {selectedMeal.name || "Meal Name"} {/* Ensure meal name is shown in the popup */}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    {selectedMeal.details || "No details available."} {/* Show meal details */}
                  </Typography>
                </Box>
                
                <Button onClick={handleClose} variant="contained" sx={{ alignSelf: 'flex-end' }}>
                  Close
                </Button>
              </Box>
            </Box>
          )}
        </motion.div>
      </Dialog>
    </Box>
  );
};

export default PlannerPage;

























