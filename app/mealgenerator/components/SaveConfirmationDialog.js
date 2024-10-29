'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const SaveConfirmationDialog = ({ open, onClose }) => {
  const router = useRouter();

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      sx={{
        '& .MuiPaper-root': { 
          borderRadius: '20px', 
          padding: 2, 
          backgroundColor: '#2b6777',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
          maxWidth: '400px',
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          fontFamily: 'Jelligun, cursive', 
          fontSize: '2.5rem', 
          color: '#e0f7f3', 
          fontWeight: 'bold', 
          textAlign: 'center',
        }}
      >
        Meal Plan Saved
      </DialogTitle>
      
      <DialogContent 
        sx={{
          textAlign: 'center',
          color: '#e0f7f3',
          fontSize: '1.5rem',
          fontFamily: 'Jelligun, cursive',
        }}
      >
        <Typography>Your meal plan has been saved successfully!</Typography>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
        <Button 
          onClick={onClose} 
          variant="contained" 
          color="secondary" 
          sx={{
            paddingX: 3,
            paddingY: 1,
            fontSize: '1.3rem',
            fontWeight: 'bold',
            fontFamily: 'Jelligun, cursive',
            backgroundColor: 'white',
            color: '#2b6777',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'white'
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveConfirmationDialog;
