"use client";  // Add this line to ensure it's a client-side component

import React, { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query); // Trigger the search
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`searchForm ${loading ? 'move-to-top-right' : ''}`}
    >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a recipe..."
        className="searchInput"
      />
      <button type="submit" className="searchButton">Search</button>
    </form>
  );
};
export default SearchBar;
