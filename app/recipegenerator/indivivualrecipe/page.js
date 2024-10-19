import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import from 'next/router'

const IndividualRecipe = () => {
  const router = useRouter();
  const { id, name } = router.query; // Accessing the id and name from query parameters

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if id is available before making the API call
    if (!id) return;

    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`YOUR_API_ENDPOINT/${id}`); // Replace with your actual API endpoint
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]); // Re-run effect if ID changes

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  // Render recipe details if available
  return (
    <div>
      <h1>{name}</h1>
      {recipe && (
        <>
          <img src={recipe.image} alt={recipe.name} />
          <h2>Ingredients:</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <img src={ingredient.image} alt={ingredient.name} style={{ width: '50px', height: '50px' }} />
                {ingredient.name} - {ingredient.weight}g
              </li>
            ))}
          </ul>
          <h2>Calories: {recipe.calories}</h2>
          <h2>Cuisine Type: {recipe.cuisineType.join(', ')}</h2>
          <h2>Meal Type: {recipe.mealType.join(', ')}</h2>
          <h2>Dish Type: {recipe.dishType.join(', ')}</h2>
          <h2>Recipe Instructions: {recipe.recipeInstructions || 'No instructions found'}</h2>
        </>
      )}
    </div>
  );
};

export default IndividualRecipe;
