import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog({ open, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Use effect to automatically close the dialog after 4 seconds
  React.useEffect(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => {
        handleClose();
      }, 4000); // Close the dialog after 4000 milliseconds (4 seconds)
    }

    // Cleanup the timer on unmount or when open state changes
    return () => {
      clearTimeout(timer);
    };
  }, [open, handleClose]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          width: '25em', // Set custom width
          borderRadius: '2em',
          height: '10em', // Set custom height
          backgroundColor: '#2b6777', // Set background color (light green here)
          
        },
      }}
    >
      <DialogTitle 
        id="responsive-dialog-title"
        sx={{
          fontSize: '2em', 
          fontWeight: 'bold',
          textAlign: 'center', 
          color: 'white',
        }}
      >
        {"Hurray!"}
      </DialogTitle>
      
        
      <DialogContent>
        <DialogContentText
          sx={{
            fontSize: '1em', 
            color: 'white', 
            textAlign: 'center', 
          }}
        >
          This recipe is low on calories and packed with flavor!
          Enjoy guilt-free deliciousness!
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
