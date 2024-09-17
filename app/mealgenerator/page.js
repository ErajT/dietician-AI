// 'use client'



// import { useState } from 'react';

// export default function MealPlanGenerator() {
//   const [calories, setCalories] = useState('');
//   const [healthRestrictions, setHealthRestrictions] = useState('');
//   const [ingredients, setIngredients] = useState('');
//   const [error, setError] = useState('');
//   const [mealPlan, setMealPlan] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const validateInputs = () => {
//     if (!calories || isNaN(calories)) {
//       return 'Calories must be a valid number.';
//     }
//     if (!ingredients) {
//       return 'Please provide at least one ingredient.';
//     }
//     return '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     const validationError = validateInputs();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch('/api/meal-plan', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ calories, healthRestrictions, ingredients }),
//       });

//       if (!res.ok) {
//         throw new Error('Error fetching the meal plan');
//       }

//       const data = await res.json();
//       setMealPlan(data);
//     } catch (err) {
//       setError('An error occurred while fetching the meal plan.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Meal Plan Generator</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Calories:</label>
//           <input
//             type="number"
//             value={calories}
//             onChange={(e) => setCalories(e.target.value)}
//             placeholder="Enter calories"
//           />
//         </div>
//         <div>
//           <label>Health Restrictions:</label>
//           <input
//             type="text"
//             value={healthRestrictions}
//             onChange={(e) => setHealthRestrictions(e.target.value)}
//             placeholder="Enter health restrictions"
//           />
//         </div>
//         <div>
//           <label>Ingredients:</label>
//           <input
//             type="text"
//             value={ingredients}
//             onChange={(e) => setIngredients(e.target.value)}
//             placeholder="Enter ingredients"
//           />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button type="submit" disabled={loading}>
//           {loading ? 'Generating...' : 'Generate Meal Plan'}
//         </button>
//       </form>

//       {mealPlan && (
//         <div>
//           <h2>Your Meal Plan</h2>
//           {/* Render the meal plan here */}
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useState } from 'react';

export default function MealPlanGenerator() {
  const [calories, setCalories] = useState('');
  const [diet, setDiet] = useState('');
  const [exclude, setExclude] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMealPlan(null);

    // Validate input
    if (!calories) {
      setError('Calories are required');
      return;
    }

    try {
      // Make a POST request to the API
      const response = await fetch('/api/meal-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calories, diet, exclude })
      });

      if (!response.ok) {
        throw new Error('Failed to generate meal plan');
      }

      // Get the meal plan from the response
      const data = await response.json();
      setMealPlan(data);
    } catch (error) {
      setError('An error occurred while generating the meal plan');
    }
  };

  return (
    <div>
      <h1>Generate Your Meal Plan</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Calories:</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Enter calorie count"
          />
        </div>
        <div>
          <label>Diet (optional):</label>
          <input
            type="text"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            placeholder="e.g., vegetarian, vegan"
          />
        </div>
        <div>
          <label>Exclude Ingredients (optional):</label>
          <input
            type="text"
            value={exclude}
            onChange={(e) => setExclude(e.target.value)}
            placeholder="Ingredients to exclude"
          />
        </div>
        <button type="submit">Generate Meal Plan</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {mealPlan && (
        <div>
          <h2>Your Meal Plan</h2>
          <ul>
            {mealPlan.meals.map((meal) => (
              <li key={meal.id}>
                {meal.title} (Ready in {meal.readyInMinutes} minutes, Servings: {meal.servings})
              </li>
            ))}
          </ul>
          <p>Total Calories: {mealPlan.nutrients.calories}</p>
          <p>Protein: {mealPlan.nutrients.protein}g</p>
          <p>Fat: {mealPlan.nutrients.fat}g</p>
          <p>Carbs: {mealPlan.nutrients.carbohydrates}g</p>
        </div>
      )}
    </div>
  );
}

