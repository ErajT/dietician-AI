'use client'
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/searchbar';
import { useRouter } from 'next/navigation';
import '../../styling/recipegenerator.css';
import ActionAreaCard from '../../components/cards';
import VideoLoading from '../../components/VideoLoading';
import NoResults from '../../components/noresults';
import Navbar from '../../components/Navbar';
import { Typography } from '@mui/material'; // Ensure you import Typography if you're using it

export default function RecipeResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
      console.log('API Response:', jsonData); 

      if (jsonData.status === "Success") {
        setRecipes(jsonData.message);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      router.push('/error'); // Redirect to error page if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setDishQuery(query);
    router.push(`?dish=${query}`);
    fetchRecipes(query);
  };

  return (
    <div>
      {!loading && (
        <div>
          <Navbar />
          <div className="search-bar-top">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        </div>
      )}

      {loading ? (
        <VideoLoading videoUrl={'/images/bg4.mp4'} comment={'Just a moment! Finding the perfect recipe for you...'} />
      ) : recipes.length === 0 ? (
        
        <div className="no-result">
          <Typography variant="h5" component="h3"  style={{ color: '#2b6777', fontFamily: "Jelligun, sans-serif", fontSize: '2.5rem', marginTop: '9rem', paddingBottom: '4rem', marginLeft: '30rem', fontWeight: 'bold' }}>
            No recipes available for "{dishQuery}".
          </Typography>
         
        </div>
      ) : (
        <div>
          <Typography variant="h5" component="h3" style={{ color: '#2b6777', fontFamily: "Jelligun, sans-serif", fontSize: '2.5rem', marginTop: '-4rem', paddingBottom: '4rem', marginLeft: '2rem', fontWeight: 'bold' }}>
            Recipe Results for: {dishQuery}
          </Typography>
          <div className="recipe-cards-container">
            {recipes.map((recipe, index) => (
              <ActionAreaCard
                key={index}
                id={Number(index)}  
                name={recipe.name}
                image={recipe.image}
                cuisine={recipe.cuisineType}
                calories={recipe.calories}
                dishQuery={dishQuery}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
