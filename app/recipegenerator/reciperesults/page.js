"use client";
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/searchbar';
import { useRouter } from 'next/navigation';
import '../../styling/recipegenerator.css';
import '../../styling/NoResults.css';
import ActionAreaCard from '../../components/cards';
import { Typography } from '@mui/material';
import Loading from '../../components/loading'
import NoResults from '../../components/noresults';

export default function RecipeResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [dishQuery, setDishQuery] = useState("");

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
      console.log('API Response:', jsonData); // Log the response

      if (jsonData.status === "Success") {
        setRecipes(jsonData.message);
        setError(false);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query); // Log the search query
    setDishQuery(query);
    router.push(`?dish=${query}`);
    fetchRecipes(query);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} className="search-bar-top" loading={loading} />

      {loading ? (
        <div style={{
          display: 'grid',  
          marginLeft:"5vw",
          marginTop:"10vh",
          
          gridTemplateColumns: 'repeat(4, 1fr)', // Three columns
          gap: '16px',                   // Adjust gap between items as needed
                     // Optional: Adds some vertical spacing
        }}
        >
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        </div>
        
      ) : error ? (<div className="no-result">
        <Typography variant="h5" component="h3" className="custom-typography">Oops!There seems to be a network issue.</Typography>
     
       <NoResults /></div>
      ) : recipes.length === 0 ? (
        <div className="no-result">
           <Typography variant="h5" component="h3" className="custom-typography">Oops!No recipes available for {dishQuery}.</Typography>
        
          <NoResults /></div>
      ) : (
        <div>
          <Typography variant="h5" component="h3">
            Recipe Results for: {dishQuery}
          </Typography>
          <div className="recipe-cards-container">
            {recipes.map((recipe, index) => (
              <ActionAreaCard
              key={index} // Use the index as the key
              id={index} 
                name={recipe.name}
                image={recipe.image}
                cuisine={recipe.cuisineType}
                calories={recipe.calories}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
