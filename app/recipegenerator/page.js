"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactTyped } from 'react-typed';
import React, { useState } from 'react';
import SearchBar from '../components/searchbar';
import MediaCard from '../components/placeholder'; 
import RecipeReviewCard from '../components/cardbar';
import Loading from '../components/loading'; 
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

    <div className="app-container" >
      {/* Show background if search not clicked        */}
      {!searchClicked && (
          <div className={`recipe-background ${loading ? 'blur' : ''}`}>
          <video autoPlay muted  className="background-video">
            <source src="/images/food video.mp4"type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h1 className="recipe-generator">
            <ReactTyped
              strings={["Recipe Generator"]}
              typeSpeed={40}
              backSpeed={50}
              showCursor={true}
              cursorChar="_"
              loop
            />
          </h1>
          <h3 className="recipe-subheading">Quick & Easy Recipes</h3>
          <SearchBar onSearch={handleSearch} loading={loading} />
          <RecipeReviewCard  />
        </div>
      )}
  
     
      {searchClicked && (
        <div >
          {error ? (
            <div className="failed-recipe recipe-cart-background">
              Failed to load recipe {recipes.message || "Please try again later."}
            </div>
          ) : loading ? (
            <div>
              <SearchBar onSearch={handleSearch} loading={loading} />
              <div className="loading">
                <Loading />
              </div>
            </div>
          ) : (
            <div>
              <SearchBar onSearch={handleSearch}  />
              <div className="cart-search-bar">
                {Array.isArray(recipes) && recipes.length > 0 ? (
                  recipes.map((recipe, index) => (
                    <div key={index}>
                      <MediaCard
                        name={recipe.name}
                        image={recipe.image || "/images/default-recipe.jpg"}
                        cuisineType={recipe.cuisineType}
                        calories={recipe.calories}
                        ingredients={recipe.ingredients}
                      />
                    </div>
                  ))
                ) : (
                  <div>No recipes found.</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )};