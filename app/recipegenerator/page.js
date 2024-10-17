"use client";
import { useRouter } from 'next/navigation';   // Import the router
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactTyped } from 'react-typed';
import SearchBar from '../components/searchbar';
import '../styling/recipegenerator.css';
import { Typography } from '@mui/material';

export default function RecipeGeneratorPage() {
  const [searchClicked, setSearchClicked] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleSearch = (query) => {
    setSearchClicked(true); // Set searchClicked to true
    router.push(`/recipegenerator/reciperesults?dish=${query}`); // Navigate with the search query
  };

  return (
    <div className="app-container">
      {!searchClicked && (
        <div className="recipe-background">
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
          <Typography variant="h5" component="h3" className="recipe-subheading">
            Quick & Easy Recipes
          </Typography>
          <SearchBar className="searchForm-centered" onSearch={handleSearch} loading={false} />
        </div>
      )}
    </div>
  );
}
