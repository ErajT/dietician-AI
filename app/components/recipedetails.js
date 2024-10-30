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
        backgroundColor: '#5293ab',
        color: 'white'
      }}
    >
      <Table size="small" aria-label="recipe details table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', width: '40%', color: 'white' }}>Detail</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', width: '60%', color: 'white' }}>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Calories</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>{parseFloat(recipe.calories).toFixed(2)}g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Total Weight</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>{parseFloat(recipe.totalWeight).toFixed(2)}g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Cuisine Type</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>{recipe.cuisineType.join(', ')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Meal Type</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>{recipe.mealType.join(', ')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Dish Type</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>{recipe.dishType.join(', ')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
