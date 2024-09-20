// 'use client';

// import { useState } from 'react';

// export default function MealPlanGenerator() {
//   const [calories, setCalories] = useState('');
//   const [diet, setDiet] = useState('');
//   const [exclude, setExclude] = useState('');
//   const [mealPlan, setMealPlan] = useState(null);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMealPlan(null);

//     // Validate input
//     if (!calories) {
//       setError('Calories are required');
//       return;
//     }

//     try {
//       // Make a POST request to the API
//       const response = await fetch('/api/meal-plan', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ calories, diet, exclude })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate meal plan');
//       }

//       // Get the meal plan from the response
//       const data = await response.json();
//       setMealPlan(data);
//     } catch (error) {
//       setError('An error occurred while generating the meal plan');
//     }
//   };

//   return (
//     <div>
//       <h1>Generate Your Meal Plan</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Calories:</label>
//           <input
//             type="number"
//             value={calories}
//             onChange={(e) => setCalories(e.target.value)}
//             placeholder="Enter calorie count"
//           />
//         </div>
//         <div>
//           <label>Diet (optional):</label>
//           <input
//             type="text"
//             value={diet}
//             onChange={(e) => setDiet(e.target.value)}
//             placeholder="e.g., vegetarian, vegan"
//           />
//         </div>
//         <div>
//           <label>Exclude Ingredients (optional):</label>
//           <input
//             type="text"
//             value={exclude}
//             onChange={(e) => setExclude(e.target.value)}
//             placeholder="Ingredients to exclude"
//           />
//         </div>
//         <button type="submit">Generate Meal Plan</button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {mealPlan && (
//         <div>
//           <h2>Your Meal Plan</h2>
//           <ul>
//             {mealPlan.meals.map((meal) => (
//               <li key={meal.id}>
//                 {meal.title} (Ready in {meal.readyInMinutes} minutes, Servings: {meal.servings})
//               </li>
//             ))}
//           </ul>
//           <p>Total Calories: {mealPlan.nutrients.calories}</p>
//           <p>Protein: {mealPlan.nutrients.protein}g</p>
//           <p>Fat: {mealPlan.nutrients.fat}g</p>
//           <p>Carbs: {mealPlan.nutrients.carbohydrates}g</p>
//         </div>
//       )}
//     </div>
//   );
// }











'use client';

import { useState } from 'react';

export default function MealPlanner() {
  const [activeTab, setActiveTab] = useState('Monday'); // Track the active tab

  // Function to switch between tabs
  const handleTabClick = (day) => {
    setActiveTab(day);
  };

  return (
    <div style={styles.container}>
      {/* Meal Planner Heading */}
      <div style={styles.header}>
        <h1>Meal Planner</h1>
      </div>

      {/* Tabs for each day */}
      <div style={styles.tabs}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <button
            key={day}
            style={activeTab === day ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Display content based on active tab */}
      <div style={styles.content}>
        <h2>{activeTab}'s Meals</h2>
        <p>Here you will see the meals for {activeTab}.</p>
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    padding: '20px',
    maxWidth: '800px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    cursor: 'pointer',
  },
  activeTab: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: '1px solid #007bff',
    cursor: 'pointer',
  },
  content: {
    textAlign: 'center',
  },
};
