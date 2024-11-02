"use client";
import { useRouter } from 'next/navigation'; // Import the router
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactTyped } from 'react-typed';
import SearchBar from '../components/searchbar';
import Navbar from '../components/Navbar';
import '../styling/recipepage.css'; // Make sure to style the video here
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
       
        <div className="recipe-background" style={{ backgroundColor: 'transparent' }}>
          {/* Background video */}
          
          <video autoPlay muted loop playsInline className="background-video">
            <source src="/images/bg2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="gradient-overlay"></div>

          {/* Overlay content */}
         
          <div className="content-overlay" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '90vh', 
            width:'100%',
            marginTop:'-5rem'
            
        
            
          }}>
                      <Navbar transparent />

                    <h1 
          className="recipe-generator" 
          style={{ fontFamily: 'Jelligun, cursive',
           
            alignItems: 'left',
            fontSize:'7rem',
            fontWeight:'bold',
            marginLeft:'-10rem',
            
          }}
        >
          <ReactTyped
            strings={["Recipe Generator"]}
            typeSpeed={100}
            backSpeed={100}
            showCursor={true}
            cursorChar="_"
            loop
          />
        </h1>

        <Typography 
          variant="h5" 
          component="h3" 
          className="recipe-subheading" 
          style={{ fontFamily: 'Jelligun, cursive',fontSize:'3rem' }}
        >
          Quick & Easy Recipes
        </Typography>
           
            <SearchBar onSearch={handleSearch} loading={false} />
            </div>
         
        </div>
      )}
    </div>
  );
}
