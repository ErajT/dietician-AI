"use client"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import SearchBar from '../components/searchbar';
import '../styling/recipegenerator.css'; 


export default function RecipeGeneratorPage() {
  const handleSearch = (query) => {
    console.log('Search Query:', query);
    // Add logic here to handle the search
  };

  return (
    <div className="recipe-background">
    <div className="overlay">
      <h1 className='recipe-generator'>Recipe Generator</h1>
      <h3 className='recipe-subheading'>Quick & Easy Recipe</h3>
      <SearchBar onSearch={handleSearch} />

    </div>
  </div>
  );
}



