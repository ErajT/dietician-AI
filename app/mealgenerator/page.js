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

