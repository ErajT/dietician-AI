"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import SearchBar from '../components/searchbar';
import CardExample from '../components/placeholder'; 
import '../styling/recipegenerator.css';

export default function RecipeGeneratorPage() {
  const [searchClicked, setSearchClicked] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [recipes, setRecipes] = useState([]);

  const handleSearch = (query) => {
    console.log('Search Query:', query);

    setSearchClicked(true);
    setError(false);
    setLoading(true);

    const postData = async () => {
      try {
        const response = await fetch('/api/recipegenerator', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({dish: query})
        });

        const jsonData = await response.json();
        
        // Save the received recipes in state to render dynamically
        setRecipes(jsonData.message || []);   
        console.log('Data received from API:', jsonData);   
        
      } catch (error) {
        console.error('There was an error with the POST request:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    
    postData(); 
  };


  return (
    <div>
      <div className="recipe-background">
        <h1 className="recipe-generator">Recipe Generator</h1>
        <h3 className="recipe-subheading">Quick & Easy Recipes</h3>
        <SearchBar onSearch={handleSearch} />
      </div>

      
      {searchClicked && (
  <div className="recipe-cart-background " >
    {error ? (
      <div className='failed-recipe'>Failed to load recipes: {recipes.message || "Please try again later."}</div>
    ) : loading ? (
      <div className='loading'>Loading recipes...</div>
    ) : (
      <div className="cart-search-bar">
        {Array.isArray(recipes) && recipes.length > 0 ? recipes.map((recipe, index) => (
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" key={index}>
            <CardExample
              name={recipe.name}
              image={recipe.image || '/images/default-recipe.jpg'}
              cuisineType={recipe.cuisineType}
              calories={recipe.calories}
              ingredients={recipe.ingredients}
            />
          </div>
        )) : (
          <div>No recipes found.</div>
        )}
      </div>
    )}
  </div>
)}
    </div>
  );
}