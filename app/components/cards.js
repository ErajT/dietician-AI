import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import '../styling/recipegenerator.css';

export default function ActionAreaCard({ name, image, cuisineType, calories, ingredients }) {
  return (
    <div className="recipe-card">
      <img src={image} alt={name} className="recipe-image" />
      <h3>{name}</h3>
      <p>Cuisine Type: {cuisineType}</p>
      <p>Calories: {calories}</p>
      <p>Ingredients: {ingredients.join(', ')}</p>
    </div>
  );
}
