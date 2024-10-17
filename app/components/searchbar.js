"use client";  // Ensure it's a client-side component

import React, { useState } from 'react';

const SearchBar = ({ onSearch = () => {}, loading, className = "" }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Check if the query is empty before triggering the search
    if (query.trim()) {
      onSearch(query.trim()); // Trigger the search with trimmed query
    } else {
      alert("Please enter a search term."); // Alert user to enter a query
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`${className} searchForm ${loading ? 'move-to-top-right' : ''}`}
    >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a recipe..."
        className="searchInput"
      />
      <button type="submit" className="searchButton" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;
