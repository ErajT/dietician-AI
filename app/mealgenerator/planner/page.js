// 'use client';

// import { useSearchParams } from 'next/navigation'; // For query params in App Router
// import { useState } from 'react';

// export default function MealPlanner() {
//   const searchParams = useSearchParams(); // Use the new hook for App Router

//   // Extracting form data from URL
//   const calories = searchParams.get('calories');
//   const excludeIngredients = searchParams.get('excludeIngredients');
//   const diet = searchParams.get('diet');
//   const timeFrame = searchParams.get('timeFrame');

//   const [activeTab, setActiveTab] = useState('Monday');

//   const handleTabClick = (day) => {
//     setActiveTab(day);
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h1>Meal Planner for {timeFrame}</h1>
//         <p>Calories: {calories}, Diet: {diet}, Exclude: {excludeIngredients}</p>
//       </div>

//       <div style={styles.tabs}>
//         {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
//           <button
//             key={day}
//             style={activeTab === day ? styles.activeTab : styles.tab}
//             onClick={() => handleTabClick(day)}
//           >
//             {day}
//           </button>
//         ))}
//       </div>

//       <div style={styles.content}>
//         <h2>{activeTab}'s Meals</h2>
//         <p>Here you will see the meals for {activeTab}.</p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { padding: '20px', textAlign: 'center' },
//   header: { marginBottom: '20px' },
//   tabs: { display: 'flex', justifyContent: 'center', marginBottom: '20px' },
//   tab: { padding: '10px 20px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', cursor: 'pointer' },
//   activeTab: { padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: '1px solid #007bff' },
//   content: { textAlign: 'center' },
// };




// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const PlannerPage = () => {
//   const router = useRouter();
//   const [mealPlan, setMealPlan] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       fetchMealPlan();
//     }
//   }, []);

//   const fetchMealPlan = async () => {
//     setLoading(true);

//     try {
//       const res = await fetch('/api/mealplanner', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           mealsPerDay: 3, 
//           dietaryRestrictions: ['vegetarian'],
//         }),
//       });

//       if (!res.ok) {
//         throw new Error('Error fetching meal plan');
//       }

//       const data = await res.json();
//       setMealPlan(data); // Set entire response to view raw JSON
//     } catch (error) {
//       console.error('Error fetching meal plan:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!mealPlan) {
//     return <p>No meal plan available</p>;
//   }

//   // Display the raw JSON response
//   return (
//     <div>
//       <h1>Meal Plan (Raw JSON Response)</h1>
//       <pre>{JSON.stringify(mealPlan, null, 2)}</pre> {/* Pretty print the JSON */}
//     </div>
//   );
// };

// export default PlannerPage;












// KAL A CODE
// 'use client';

// import { useEffect, useState } from 'react';

// const PlannerPage = () => {
//   const [mealPlan, setMealPlan] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeDay, setActiveDay] = useState('Monday'); // Default day

//   useEffect(() => {
//     fetchMealPlan();
//   }, []);

//   const fetchMealPlan = async () => {
//     setLoading(true);

//     try {
//       const res = await fetch('/api/mealplanner', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           mealsPerDay: 3,
//           dietaryRestrictions: ['vegetarian'],
//         }),
//       });

//       if (!res.ok) {
//         throw new Error('Error fetching meal plan');
//       }

//       const data = await res.json();
//       setMealPlan(data.mealPlan); // Set only the mealPlan part of the response
//     } catch (error) {
//       console.error('Error fetching meal plan:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!mealPlan) return <p>No meal plan available</p>;

//   const days = Object.keys(mealPlan); // Get days from the mealPlan

//   return (
//     <div>
//       <h1>Meal Plan for the Week</h1>
//       <div className="tabs">
//         {days.map((day) => (
//           <button key={day} onClick={() => setActiveDay(day)}>
//             {day}
//           </button>
//         ))}
//       </div>

//       <div className="meals">
//         {mealPlan[activeDay].map((meal, index) => (
//         <div key={index} className="meal-card">
//           <h2>{meal.meal}</h2>
//           <img src={meal.image} alt={meal.meal} style={{ width: '150px', height: '150px' }} />
//           <p>Ingredients: {Array.isArray(meal.ingredients) ? meal.ingredients.join(', ') : 'No ingredients available'}</p>
//       </div>
//   ))}
// </div>

//     </div>
//   );
// };

// export default PlannerPage;








'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, Card, CardContent, CardMedia, AppBar, Toolbar, Dialog } from '@mui/material';
import { motion } from 'framer-motion';

const PlannerPage = () => {
  const [mealPlan, setMealPlan] = useState({ Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [] });
  const [activeDay, setActiveDay] = useState('Monday');
  const [open, setOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const searchParams = useSearchParams();

  // Fetch meal plan from API
  useEffect(() => {
    const fetchMealPlan = async () => {
      const age = searchParams.get('age');
      const gender = searchParams.get('gender');
      const dietType = searchParams.get('dietType');
      const mealsPerDay = searchParams.get('mealsPerDay');

      try {
        const response = await fetch(`/api/mealplanner`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            age,
            gender,
            dietType,
            mealsPerDay
          })
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error("Response error:", errorMessage);
          throw new Error(`Failed to fetch meal plan: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.mealPlan) {
          setMealPlan(data.mealPlan);
        } else {
          throw new Error('Invalid mealPlan structure');
        }
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      }
    };

    fetchMealPlan();
  }, [searchParams]);

  const handleTabClick = (day) => {
    setActiveDay(day);
  };

  const handleCardClick = (meal) => {
    setSelectedMeal(meal);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMeal(null);
  };

  if (!mealPlan || Object.keys(mealPlan).length === 0) {
    return <Typography>Loading meal plan...</Typography>;
  }

  



// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Box, Button, Typography, Card, CardContent, CardMedia, AppBar, Toolbar, Dialog } from '@mui/material';
// import { motion } from 'framer-motion';

// const PlannerPage = () => {
//   const [mealPlan, setMealPlan] = useState({ Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [] });
//   const [activeDay, setActiveDay] = useState('Monday');
//   const [open, setOpen] = useState(false);
//   const [selectedMeal, setSelectedMeal] = useState(null);

//   // Fetch meal plan from API
//   useEffect(() => {
//     const fetchMealPlan = async () => {
//       try {
//         const response = await fetch('/api/mealplanner');
//         if (!response.ok) {
//           const errorMessage = await response.text();
//           console.error("Response error:", errorMessage);
//           throw new Error(`Failed to fetch meal plan: ${response.status} ${response.statusText}`);
//         }
//         const data = await response.json();
//         console.log('Fetched data:', data);
//         if (data.mealPlan) {
//           setMealPlan(data.mealPlan);
//         } else {
//           throw new Error('Invalid mealPlan structure');
//         }
//       } catch (error) {
//         console.error("Error fetching meal plan:", error);
//       }
//     };
    
    
    

//     fetchMealPlan();
//   }, []);

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

//   // Add a check to ensure mealPlan is loaded
//   // Add this right before your return statement
//   if (!mealPlan || Object.keys(mealPlan).length === 0) {
//     return <Typography>Loading meal plan...</Typography>;
//   }


  return (
    <Box 
      sx={{ 
        backgroundImage: 'url("path/to/background.jpg")', 
        backgroundSize: 'cover', 
        minHeight: '100vh', 
        padding: 2, 
        color: '#fff'
      }}
    >
      <AppBar position="static" sx={{ background: 'rgba(0, 0, 0, 0.7)' }}>
        <Toolbar>
          <Typography variant="h6">Meal Planner</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom>Meal Plan for {activeDay}</Typography>
        <Box sx={{ display: 'flex', marginBottom: 2 }}>
          {Object.keys(mealPlan).map((day) => (
            <Button
              key={day}
              variant={activeDay === day ? 'contained' : 'outlined'}
              onClick={() => handleTabClick(day)}
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
  {mealPlan[activeDay].length === 0 ? (
    <Typography>No meals available for {activeDay}.</Typography>
  ) : (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
      {mealPlan[activeDay].map((meal, index) => (
    <Card 
        key={index} 
        sx={{ 
            width: 250, 
            transition: 'transform 0.3s', 
            '&:hover': { transform: 'scale(1.05)', boxShadow: 3 } 
        }}
        onClick={() => handleCardClick(meal)}
    >
        <CardMedia
            component="img"
            alt={meal.name}
            height="140"
            image={meal.image} // Ensure this uses the fetched image
        />
        <CardContent>
            <Typography variant="h6">{meal.name}</Typography>
            <Typography color="text.secondary">{meal.type}</Typography>
        </CardContent>
    </Card>
))}

    </Box>
  )}
</motion.div>


      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Box sx={{ padding: 2, background: 'rgba(255, 255, 255, 0.9)' }}>
          {selectedMeal && (
            <>
              <CardMedia
                component="img"
                alt={selectedMeal.name}
                height="200"
                image={selectedMeal.image}
                sx={{ marginBottom: 2 }}
              />
              <Typography variant="h5">{selectedMeal.name}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>{selectedMeal.details}</Typography>
              <Button onClick={handleClose} variant="contained">Close</Button>
            </>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default PlannerPage;

