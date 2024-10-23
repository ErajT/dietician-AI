import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

// Custom styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function IngredientsTable({ recipe }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '90%',
        marginTop: '10%',
        boxShadow: `
          0px 4px 10px rgba(0, 128, 0, 0.4),  
          0px 8px 15px rgba(0, 100, 0, 0.2)
        `,
        backgroundColor: '#abc7b0',
        overflow: 'visible',
      }}
    >
      <Table size="medium" aria-label="ingredients table">
        
        <TableBody>
          {recipe.ingredients.map((ingredient, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>
                <Checkbox />
              </StyledTableCell>
              <StyledTableCell>{ingredient.name}</StyledTableCell>
              <StyledTableCell align="right">
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  style={{
                    width: '40%',
                    height: '40%',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer',
                  }}
                  className="ingredient-image"
                />
              </StyledTableCell>
             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <style jsx>{`
        .ingredient-image {
          transition: transform 0.3s ease; // Smooth transition for scaling
        }
        .ingredient-image:hover {
          transform: scale(1.5); // Scale effect on hover
        }
      `}</style>
    </TableContainer>
  );
}
