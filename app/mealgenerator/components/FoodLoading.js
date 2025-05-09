// import React from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import { motion } from 'framer-motion';

// const LeafLoading = () => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#cee2d2',
//         color: '#102820',
//       }}
//     >
//       <motion.div
//         initial={{ y: -20 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Loading your meal plan...
//         </Typography>
//       </motion.div>
//       <CircularProgress sx={{ color: '#102820' }} />

//       {/* Interactive leaf animation without rotation */}
//       <motion.img
//         src="/images/Leaf.gif" // Adjust the path based on your folder structure
//         alt="Loading Leaves"
//         style={{ width: '100px', marginTop: '20px' }}
//         initial={{ scale: 1 }}
//         animate={{
//           scale: [1, 1.1, 1], // Scale up and down
//           opacity: [0.8, 1, 0.8], // Fade in and out
//         }}
//         transition={{
//           repeat: Infinity,
//           duration: 2,
//           ease: 'easeInOut',
//         }}
//       />
//     </Box>
//   );
// };

// export default LeafLoading;



// app/components/FoodLoading.js

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const FoodLoading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#cee2d2',
        color: '#102820',
      }}
    >
      <motion.img
        src="https://example.com/path-to-your-fruit-or-vegetable-icon.png" // Replace with your food icon
        alt="Loading"
        style={{ width: '100px', marginBottom: '20px' }}
        animate={{ rotate: [0, 10, -10, 0], y: [0, -20, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <Typography variant="h5">Loading your meal plan...</Typography>
    </Box>
  );
};

export default FoodLoading;
