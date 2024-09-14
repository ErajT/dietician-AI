"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import SearchBar from '../components/searchbar';
import CardExample from '../components/placeholder'; // Assuming you have a card component.
import '../styling/recipegenerator.css';

export default function RecipeGeneratorPage() {
  const [searchClicked, setSearchClicked] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSearch = (query) => {
    console.log('Search Query:', query);
    const postData = async () => {
      const data = {
        'dish': query,
      };
  
      try {
        const response = await fetch('http://localhost:3000/api/recipegenerator', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',  
          },
          body: JSON.stringify(data), 
        });

        const jsonData = await response.json();  
        setResponseMessage(jsonData.message);
        console.log('Response Message:', jsonData.message);    
      } catch (error) {
        console.error('There was an error with the POST request:', error);
        setResponseMessage('Error: ' + error.message);
      }
    };
    
    setSearchClicked(true);
  };

  return (
    <div className="recipe-background">
      {searchClicked ? (
        // When search is clicked, show this section
        <div className="recipe-cart-background">
          <div className="cart-search-bar">
            <SearchBar onSearch={handleSearch} />
            <div className="all-carts">
              <CardExample />
  
            </div>
          </div>
        </div>
      ) :
      
      
      (
        // When search is not clicked, show the original content
        <div className="overlay">
          <h1 className="recipe-generator">Recipe Generator</h1>
          <h3 className="recipe-subheading">Quick & Easy Recipe</h3>
          <SearchBar onSearch={handleSearch} />
        </div>
      )}
    </div>
  );
}


