import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function RecipeTable({ recipe }) {
  return (
      <TableContainer 
        component={Paper} 
        sx={{ 
          width: '100%', 
          borderRadius: '1em', // Add border radius
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', 
          backgroundColor:'#abc7b0',
        }}
      >
      <Table  size="small" aria-label="recipe details table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', width: '40%' }}>Detail</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', width: '60%' }}>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Calories</TableCell>
            <TableCell align="right">{recipe.calories}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Weight</TableCell>
            <TableCell align="right">{recipe.totalWeight}g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cuisine Type</TableCell>
            <TableCell align="right">{recipe.cuisineType.join(', ')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Meal Type</TableCell>
            <TableCell align="right">{recipe.mealType.join(', ')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dish Type</TableCell>
            <TableCell align="right">{recipe.dishType.join(', ')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
