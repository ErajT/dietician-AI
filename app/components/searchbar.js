"use client";  // Add this line to ensure it's a client-side component

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query); // Call the function passed as prop with the search query
  };

  return (
    <form onSubmit={handleSubmit} className="searchForm">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a recipe..."
        className="searchInput" // Apply styles
      />
      <button type="submit" className="searchButton">Search</button>
    </form>
  );
};

export default SearchBar;
