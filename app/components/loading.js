// LoadingSkeleton.tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

const Image = styled('img')({
  width: '50%',
});

const Loading = () => {
  return (
    <div >
     
          <Skeleton
        variant="rectangular"
        width="20vw"
        height="40vh"
        sx={{
          backgroundColor: '#102820',  // Green background color
          borderRadius: '5%',  // Rounded corners
          border: '2px solid',             
          borderTopColor: '#ffffff',       // Light color on top (simulates light source)
          borderLeftColor: '#ffffff',      // Light color on left
          borderBottomColor: '#555555',    // Dark color on bottom (simulates shadow)
          borderRightColor: '#555555',     // Dark color on right
        }}
      >
        <div style={{ paddingTop: '57%' }} />
      </Skeleton>
    </div>
  );
};

export default Loading;
