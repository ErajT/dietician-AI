


// 'use client';

// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { Box, Button, Typography, Dialog, CircularProgress, Grid } from '@mui/material';
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

//   const handleCardClick = (meal) => {
//     setSelectedMeal(meal);  // Set the selected meal data here
//     setOpen(true);  // Open the dialog
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedMeal(null);  // Clear the selected meal data
//   };

//   // Show basic loading indicator
//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '100vh',
//           backgroundColor: '#cee2d2',
//           color: '#102820',
//         }}
//       >
  
//         {/* Loading Spinner and Text */}
//         <CircularProgress sx={{ color: '#102820' }} />
//         <Typography variant="h6" sx={{ marginTop: 2 }}>
//           Please Wait while we make your Delicious Meal Plan....
//         </Typography>
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
//         backgroundColor: '#cee2d2', 
//         minHeight: '100vh', 
//         padding: 2, 
//         color: '#102820', 
//         position: 'relative',
//         overflow: 'hidden'
//       }}
//     >
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5 }}>
//         <Typography variant="h4" gutterBottom>Meal Plan for {activeDay}</Typography>
//         <Box sx={{ display: 'flex', marginBottom: 5}}>
//           {Object.keys(mealPlan).map((day) => (
//             <Button
//               key={day}
//               variant={activeDay === day ? 'contained' : 'outlined'}
//               onClick={() => setActiveDay(day)}
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
//               <Grid container spacing={2}>
//                 {mealsForActiveDay.map((meal, index) => (
//                   <Grid item xs={12} sm={6} md={4} key={index}>
//                     <motion.div
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {/* Card with full background image and hover effect */}
//                       <Box
//                         onClick={() => handleCardClick(meal)}
//                         sx={{
//                           position: 'relative',
//                           cursor: 'pointer',
//                           height: 200,
//                           borderRadius: '8px',
//                           overflow: 'hidden',
//                           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
//                           '&:hover .meal-name': {
//                             opacity: 1,
//                             backgroundColor:"transparent"  // Show meal name on hover
//                           },
//                           '&:hover .meal-image': {
//                             filter: 'blur(6px)',  // Blur the image on hover
//                             transform: 'scale(1.05)',  // Slight scale on hover
//                           },
//                         }}
//                       >
//                         {/* Background Image */}
//                         <Box
//                           className="meal-image"
//                           component="img"
//                           src={meal.image || "https://via.placeholder.com/150"}
//                           alt={meal.name}
//                           sx={{
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover',
//                             transition: 'transform 0.3s ease, filter 0.3s ease',
//                           }}
//                         />

//                         {/* Meal Name Overlay */}
//                         <Box
//                           className="meal-name"
//                           sx={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             transform: 'translate(-50%, -50%)',
//                             color: 'black ',
//                             backgroundColor: '#cee2d2 ',
//                             padding: '8px 16px',
//                             borderRadius: '4px',
//                             opacity: 0,
//                             transition: 'opacity 0.3s ease',
//                           }}
//                         >
//                           <Typography variant="h6">{meal.name}</Typography>
//                         </Box>
//                       </Box>
//                     </motion.div>
//                   </Grid>
//                 ))}
//               </Grid>
//             ) : (
//               <Typography>No meals available for {activeDay}.</Typography>
//             )}
//           </Box>
//         )}
//       </motion.div>

//       {/* Dialog for displaying full meal image and details */}
//       <Dialog 
//         open={open} 
//         onClose={handleClose} 
//         maxWidth="md" // You can set this to any size like 'sm', 'md', or 'lg'
//         fullWidth
//         sx={{
//           height: '90%', // Set dialog height to 90% of the screen
//           maxHeight: '90vh', // Ensure it doesn't exceed the screen height
//         }}
//       >
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           exit={{ scale: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           {selectedMeal && ( // Add a check to ensure selectedMeal is not null
//             <Box 
//               sx={{ 
//                 display: 'flex', 
//                 height: '100%', // Ensure the content fills the entire dialog
//                 background: '#fff', 
//                 borderRadius: '8px', 
//                 boxShadow: 3 
//               }}
//             >
//               {/* Left Side: Meal Image */} 
//               <Box
//                 sx={{
//                   width: '60%', // Image takes up 60% of the dialog width
//                   position: 'relative',
//                 }}
//               >
//                 <Box
//                   component="img"
//                   alt={selectedMeal.name}  // Display meal name in alt
//                   src={selectedMeal.image || "https://via.placeholder.com/150"} // Fallback to placeholder if no image
//                   sx={{ 
//                     height: '100%',  // Cover entire height
//                     width: '100%',   // Cover entire width
//                     objectFit: 'cover', 
//                     borderTopLeftRadius: '8px',
//                     borderBottomLeftRadius: '8px',
//                   }}
//                 />

//                 {/* Semicircle Overlay for the curve on the right side */}
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     top: 0,
//                     right: '-40px', // Extend beyond the image to create the curve
//                     width: '80px',
//                     height: '100%',
//                     backgroundColor: '#fff',
//                     borderTopRightRadius: '50%',
//                     borderBottomRightRadius: '50%',
//                   }}
//                 />
//               </Box>
              
//               {/* Right Side: Meal Details */}
//               <Box 
//                 sx={{ 
//                   padding: '5%',  // Adjust padding as necessary
//                   display: 'flex', 
//                   flexDirection: 'column', 
//                   justifyContent: 'space-between', 
//                   width: '40%', // Details take up 40% of the dialog width
//                 }}
//               >
//                 <Box>
//                   <Typography variant="h5" gutterBottom>
//                     {selectedMeal.name || "Meal Name"} {/* Ensure meal name is shown in the popup */}
//                   </Typography>
//                   <Typography variant="body1" sx={{ marginBottom: 2 }}>
//                     {selectedMeal.details} {/* Show meal details */}
//                   </Typography>
//                 </Box>
                
//                 <Button onClick={handleClose} variant="contained" sx={{ alignSelf: 'flex-end' }}>
//                   Close
//                 </Button>
//               </Box>
//             </Box>
//           )}
//         </motion.div>
//       </Dialog>
//     </Box>
//   );
// };

// export default PlannerPage;









'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, Dialog, CircularProgress, Grid } from '@mui/material';
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
        {/* Loading Spinner and Text */}
        <CircularProgress sx={{ color: '#102820' }} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Please Wait while we make your Delicious Meal Plan....
        </Typography>
      </Box>
    );
  }

  // if (!mealPlan || Object.keys(mealPlan).length === 0) {
  //   return <Typography>No meal plan available.</Typography>;
  // }

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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5 }}>
        <Typography variant="h4" gutterBottom>Meal Plan for {activeDay}</Typography>
        <Box sx={{ display: 'flex', marginBottom: 5 }}>
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
                            backgroundColor:"transparent"  // Show meal name on hover
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
                          // Uncomment this line for dynamic image fetching when ready
                          // src={meal.image || "https://via.placeholder.com/150"}
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
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: '#cee2d2 ',
                            
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
                height: '90%', // Ensure the content fills the entire dialog
                background: '#fff', 
                borderRadius: '8px', 
                boxShadow: 3 
              }}
            >
              {/* Left Side: Meal Image */} 
              <Box
                sx={{
                  width: '60%', // Image takes up 60% of the dialog width
                  position: 'relative',
                  overflow: 'hidden', // Ensure the image doesn't overflow
                }}
              >
                <Box
                  component="img"
                  alt={selectedMeal.name} // Display meal name in alt
                  // Uncomment this line for dynamic image fetching when ready
                  // src={selectedMeal.image || "https://via.placeholder.com/150"} // Fallback to placeholder if no image
                  src="/images/food.jpg" // Use static image from the public/images directory
                  sx={{ 
                    height: '100%',  // Cover entire height
                    width: '100%',   // Cover entire width
                    objectFit: 'cover', 
                    borderTopRightRadius: '150px', // Round the top-right corner
                    borderBottomRightRadius: '150px', // Round the bottom-right corner
                    zIndex: 0,
                    transition: 'transform 0.3s ease', // Optional: add a transition effect
                  }}
                />

                {/* Semicircle Overlay for the curve on the right side
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: '-150px', // Extend beyond the image to create the curve
                    width: '70px',
                    height: '100%',
                    backgroundColor: 'transparent',
                    borderTopLeftRadius: '500px', // Round the top-left corner for the semicircle
                    borderBottomLeftRadius: '500px', // Round the bottom-left corner for the semicircle
                    zIndex: 0, // Place below the image
                  }}
                /> */}
              </Box>


              {/* Right Side: Meal Details */}
              <Box sx={{ padding: 5, width: '40%' }}>
                <Typography variant="h5" gutterBottom>{selectedMeal.name}</Typography>
                <Typography variant="body1">{selectedMeal.description}</Typography>
                {/* Add more details as necessary */}
              </Box>
            </Box>
          )}
        </motion.div>
      </Dialog>
    </Box>
  );
};

export default PlannerPage;






















