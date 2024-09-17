'use client'



import { useState } from 'react';

export default function MealPlanGenerator() {
  const [calories, setCalories] = useState('');
  const [healthRestrictions, setHealthRestrictions] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [error, setError] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!calories || isNaN(calories)) {
      return 'Calories must be a valid number.';
    }
    if (!ingredients) {
      return 'Please provide at least one ingredient.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/meal-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ calories, healthRestrictions, ingredients }),
      });

      if (!res.ok) {
        throw new Error('Error fetching the meal plan');
      }

      const data = await res.json();
      setMealPlan(data);
    } catch (err) {
      setError('An error occurred while fetching the meal plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Meal Plan Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Calories:</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Enter calories"
          />
        </div>
        <div>
          <label>Health Restrictions:</label>
          <input
            type="text"
            value={healthRestrictions}
            onChange={(e) => setHealthRestrictions(e.target.value)}
            placeholder="Enter health restrictions"
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Meal Plan'}
        </button>
      </form>

      {mealPlan && (
        <div>
          <h2>Your Meal Plan</h2>
          {/* Render the meal plan here */}
        </div>
      )}
    </div>
  );
}
