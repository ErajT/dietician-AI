"use client";
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/searchbar';
import { useRouter } from 'next/navigation';  // Import the router
import '../../styling/recipegenerator.css';

export default function RecipeResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [dishQuery, setDishQuery] = useState(""); // State to hold the search query

  // Get the search query from the URL or state
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('dish');
    if (query) {
      setDishQuery(query);
      fetchRecipes(query);
    }
  }, []);

  const fetchRecipes = async (query) => {
    setLoading(true);
    try {
      const response = await fetch('/api/recipegenerator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dish: query }),
      });

      const jsonData = await response.json();

      if (jsonData.status === "Success") {
        setRecipes(jsonData.message); // Store the 'message' array
        setError(false);
      } else {
        setRecipes([]);  // No recipes found
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar className="search-bar-top" loading={false} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>There was an error fetching the recipes.</p>
      ) : recipes.length === 0 ? (
        <p>No results for {dishQuery}.</p>
      ) : (
        <div>
          <h1>Recipe Results for: {dishQuery}</h1>
          {recipes.map((recipe, index) => (
            <div key={index}>
              <h2>{recipe.name}</h2>
              <ul>
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>
                    <img 
                      src={ingredient.image} 
                      alt={ingredient.name} 
                      style={{ width: '50px', height: '50px', marginRight: '10px' }} 
                    />
                    {ingredient.name} - {ingredient.weight}g
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
