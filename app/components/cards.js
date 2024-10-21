import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for Next.js routing
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import '../styling/recipegenerator.css';

export default function ActionAreaCard({ id, name, image, cuisine, calories,dishQuery }) {
  const router = useRouter(); // Get the router object

  const handleCardClick = () => {
    const recipeId = Number(id); // Convert the passed id prop to a number
    if (isNaN(recipeId)) {
      console.error('Invalid recipe ID');
      return;
    }
  
    console.log('Recipe ID:', recipeId); // Log to verify it's a number
    sessionStorage.setItem('dish', dishQuery); // Save dishQuery to session storage
    sessionStorage.setItem('id', recipeId); // Save recipe ID to session storage
    router.push(`/recipegenerator/indivivualrecipe`); // Navigate to the individual recipe page without query parameters
  };

  return (
    <div className="flip-card" onClick={handleCardClick}> {/* Container for the flipping effect */}
      <div className="flip-card-inner">  {/* Inner container for flipping */}
        {/* Front side of the card */}
        <Card className="flip-card-front">
          <CardActionArea > {/* Handle click to navigate */}
            <CardMedia
              component="img"
              image={image}  
              alt={name}
              style={{ width: 260, height: 260 }}  
              
            />
          </CardActionArea>
        </Card>

        {/* Back side of the card */}
        <Card className="flip-card-back">
          <CardContent>
            
            <Typography variant="h5" component="h1" fontWeight="bold" style={{ fontSize: '2rem' }}>
              {name}  {/* Dynamic name */}
            </Typography>
            <Typography variant="body2">
              <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Cuisine:</span> {cuisine}  {/* Dynamic cuisine */}
            </Typography>
            <Typography variant="body2">
              <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Calories:</span> {Number(calories).toFixed(2)}  {/* Dynamic calories */}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
