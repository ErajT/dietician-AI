import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for Next.js routing
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import '../styling/recipegenerator.css';

export default function ActionAreaCard({ id, name, image, cuisine, calories, dishQuery }) {
  const router = useRouter(); // Get the router object

  const handleCardClick = () => {
    const recipeId = Number(id); // Convert the passed id prop to a number
    if (isNaN(recipeId)) {
      console.error('Invalid recipe ID');
      return;
    }

    console.log('Recipe ID:', recipeId); 
    sessionStorage.setItem('dish', dishQuery); 
    sessionStorage.setItem('id', recipeId); 
    router.push(`/recipegenerator/indivivualrecipe`); 
  };

  return (
    <div className="flip-card" onClick={handleCardClick}> {/* Container for the flipping effect */}
      <div className="flip-card-inner">  {/* Inner container for flipping */}
        
        {/* Front side of the card */}
        <Card className="flip-card-front">
          <CardActionArea> {/* Handle click to navigate */}
            <CardMedia
              component="img"
              image={image}  
              alt={name}
              style={{ width: 260, height: 300 }}  
            />
          </CardActionArea>
        </Card>

        {/* Back side of the card with scrollable content */}
        <Card className="flip-card-back">
          <CardContent
            style={{
              maxHeight: 'auto', // Limit the height of the content
               // Enable vertical scroll if content exceeds max height
            }}
          >
            <Typography variant="h5" component="h1" fontWeight="bold" style={{ fontSize: '2rem' , fontFamily: 'Jelligun, cursive',paddingBottom:'8%'}}>
              {name}  {/* Dynamic name */}
            </Typography>
            <Typography variant="body2" style={{ontWeight: 'bold', fontSize: '2rem',fontFamily: 'Jelligun, cursive'}}>
              <span style={{ fontWeight: 'bold', fontSize: '2rem',fontFamily: 'Jelligun, cursive' }}>Cuisine:</span> {cuisine}  {/* Dynamic cuisine */}
            </Typography>
            <Typography variant="body2">
              <span style={{ fontWeight: 'bold', fontSize: '2rem',fontFamily: 'Jelligun, cursive' }}>Calories:</span> {Number(calories).toFixed(2)}  {/* Dynamic calories */}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
