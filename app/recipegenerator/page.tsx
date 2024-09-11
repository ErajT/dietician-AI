"use client";
import React from 'react';

import SearchBar from '../components/searchbar';



export default function RecipeGeneratorPage() {
  const handleSearch = (query: string) => {
    console.log('Search Query:', query);
    // Add logic here to handle the search
  };

  return (
    <div>
      
      <SearchBar onSearch={handleSearch} />
      {/* Add the rest of your page content here */}
    </div>
  );
}


