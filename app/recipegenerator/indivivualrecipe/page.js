"use client"; // Mark the component as a client component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import ResponsiveDialog from '../../components/popup'; // Import the responsive dialog component

const IndividualRecipe = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null); // Store the selected recipe
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dish, setDish] = useState(null);
  const [id, setId] = useState(null); // State for id
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility

  useEffect(() => {
    // Retrieve the stored dish and id from session storage
    const storedDish = sessionStorage.getItem('dish');
    const storedId = sessionStorage.getItem('id'); // Get the id from session storage

    setDish(storedDish); // Set the dish state
    setId(storedId); // Set the id state

    // Log the stored dish and id
    console.log('Stored Dish:', storedDish);
    console.log('Stored ID:', storedId);

    // Fetch recipes only if a dish and id are found
    if (storedDish && storedId) {
      fetchRecipes(storedDish, storedId); // Pass both dish and id to the fetch function
    }
  }, []); // Run only once when the component mounts

  const fetchRecipes = async (query, recipeId) => {
    setLoading(true);
    try {
      const response = await fetch('/api/recipegenerator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dish: query }), // Use the stored dish for the API call
      });

      const jsonData = await response.json();
      console.log('API Response:', jsonData); // Log the response

      if (jsonData.status === "Success") {
        const selectedRecipe = jsonData.message[Number(recipeId)]; // Get the recipe at the specified id
        setRecipe(selectedRecipe); // Set the selected recipe
        setError(false);

        // Check the calories and open the dialog if less than 600
        if (selectedRecipe.calories < 600) {
          setOpenDialog(true); // Open the dialog
        }

      } else {
        setRecipe(null); // Clear recipe if not successful
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Render loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching recipes.</div>;

  // Render recipe details
  return (
    <div>
      {recipe && (
        <div>
          <h1>{recipe.name}</h1> {/* Recipe name */}
          <img src={recipe.image} alt={recipe.name} style={{ width: '300px', height: '300px' }} /> {/* Recipe image */}
          
          <h2>Ingredients:</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <img 
                  src={ingredient.image} 
                  alt={ingredient.name} 
                  style={{ width: '50px', height: '50px', marginRight: '10px' }} 
                />
                {ingredient.name} - {ingredient.weight}g
              </li>
            ))}
          </ul>

          <h2>Details:</h2>
          <p><strong>Calories:</strong> {recipe.calories}</p>
          <p><strong>Total Weight:</strong> {recipe.totalWeight}g</p>
          <p><strong>Cuisine Type:</strong> {recipe.cuisineType.join(', ')}</p>
          <p><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
          <p><strong>Dish Type:</strong> {recipe.dishType.join(', ')}</p>
        </div>
      )}

      {/* Responsive Dialog for positive message */}
      <ResponsiveDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
    </div>
  );
};

export default IndividualRecipe;
