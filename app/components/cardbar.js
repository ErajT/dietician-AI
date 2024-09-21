"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const images = [
  "/images/Breakfast-1.jpg",
  "/images/breakfast 2.jpeg",
  "/images/breakfast 3.png",
  "/images/main course.jpg",
  "/images/main course 1.jpeg",
  "/images/main  course 2.jpg",
  "/images/soup.jpg",
  "/images/soup 2.jpg",
  "/images/soup 3.jpeg"
];

export default function RecipeReviewCard() {
  
  const [card1Index, setCard1Index] = useState(0);
  const [card2Index, setCard2Index] = useState(0);
  const [card3Index, setCard3Index] = useState(0);

  // Function to handle continuous image change
  const changeImage = (setIndex, length) => {
    setIndex((prevIndex) => (prevIndex + 1) % length);
  };

  // Set intervals to change images in each card
  useEffect(() => {
    const interval1 = setInterval(() => changeImage(setCard1Index, 3), 3000); // Card 1 changes every 3 seconds
    const interval2 = setInterval(() => changeImage(setCard2Index, 3), 4000); // Card 2 changes every 4 seconds
    const interval3 = setInterval(() => changeImage(setCard3Index, 3), 5000); // Card 3 changes every 5 seconds

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  return (
    <div className="card-bar" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
      {/* Card 1: Images 1-3 */}
      <Card className="animated-card" sx={{ maxWidth: 345 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
          <img
            src={images.slice(0, 3)[card1Index]} // Changes images from 1-3
            alt="Card 1"
            style={{ height: '150px', width: '100%', objectFit: 'cover', borderRadius: '4px' }}
          />
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Breakfast Delights
          </Typography>
        </CardContent>
      </Card>

      
      <Card className="animated-card" sx={{ maxWidth: 345 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
          <img
            src={images.slice(3, 6)[card2Index]} 
            alt="Card 2"
            style={{ height: '150px', width: '100%', objectFit: 'cover', borderRadius: '4px' }}
          />
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Main Courses
          </Typography>
        </CardContent>
      </Card>

      
      <Card className="animated-card" sx={{ maxWidth: 345 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
          <img
            src={images.slice(6, 9)[card3Index]} // Changes images from 7-9
            alt="Card 3"
            style={{ height: '150px', width: '100%', objectFit: 'cover', borderRadius: '4px' }}
          />
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Soups and Starters
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
