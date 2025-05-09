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
          fontSize: '3rem', 
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
            padding: 1,
            width: "9rem",          // Width in rem
            height: "2.5rem",           // Height in rem
            borderRadius: "30rem",    // Full semicircle shape
            backgroundColor: "white",
            color: "#2b6777",
            fontFamily: "Jelligun",
            fontSize: "2.3rem",
            fontWeight: "bold",
            display: "flex",            // Enables flexbox
            alignItems: "center",       // Centers content vertically
            justifyContent: "center",
            textTransform: "none",    // Prevents all caps
            "&:hover": {
              backgroundColor: "white",
              transform: "scale(1.05)",
              boxShadow: `
              0px 0px 20px 5px rgba(43, 103, 119, 0.6),   // Stronger shadow with increased blur and spread
              0px 0px 15px 5px rgba(255, 255, 255, 0.4)   // White neon glow on top
            `,

            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveConfirmationDialog;
