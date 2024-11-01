"use client";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ name, image, cuisineType, calories, ingredients }) {
  return (
    <Card sx={{ maxWidth: 500, minHeight: 200  }}>
      <CardMedia className="media-image"
        sx={{ height:200 , objectFit: 'cover' }}
        image={image} 
        title={name} 
      />
      <CardContent  className="card-content">
        <Typography gutterBottom variant="h5" component="div" >
          {name} 
        </Typography>
        <Typography variant="body2" >
          Cuisine: {cuisineType} 
        </Typography>
        <Typography variant="body2" >
          Calories: {calories ? calories.toFixed(2) : 'N/A'}
        </Typography>
        
      </CardContent>
    </Card>
  );
}