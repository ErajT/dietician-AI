"use client";  // Ensure it's a client-side component

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import '../styling/recipepage.css'; 

const SearchField = ({ onSearch = () => {}, loading, className = "" }) => {
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
    <Box
      component="form"
      onSubmit={handleSubmit} 
      className={`${className} searchForm ${loading ? 'move-to-top-right' : ''}`}
      sx={{ '& .MuiTextField-root': { m: 1, width: '90ch', borderRadius: '25px' }, display: 'flex', alignItems: 'center' }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-search"
        label="Search for a recipe..."
        type="search"
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        className="searchInput"
        InputProps={{
          style: { borderRadius: '20rem', }, // This applies border-radius to the input element
        }}
        
        style={{ width: '40em' , backgroundColor:'white'}} 
        sx={{
          width: '30em', // Custom width
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'gray', 
            },
            '&:hover fieldset': {
              borderColor: 'blue', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'green', // Border color when focused
            },
          },
        }}
      />
      <Button 
  type="submit" 
  variant="contained" 
  color="primary" 
  disabled={loading} 
  sx={{
    padding: "1rem",
    width: "15%",
    height: '75%',
    borderRadius: "20px",
    backgroundColor: "#2b6777",
    color: "white",
    fontFamily: "Jelligun, sans-serif",
    fontSize: "1.3rem",
    fontWeight: "bold",
    transition: "transform 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#2b6777",
      transform: "scale(1.05)",
    },
  }}
>
  {loading ? 'Searching...' : 'Search'}
</Button>

    </Box>
  );
};

export default SearchField;
