import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#2b6777", 
        color: "#ffffff",
        boxShadow: "none",
        padding: "0 20px",
      }}
    >
      <Toolbar>
        <Avatar
          alt="Logo"
          src="Logo.png"
          sx={{
            width: 70,
            height: 70,
            marginRight: 2,
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <Button
          color="inherit"
          sx={{
            mx: 1,
            color: "white",
            textTransform: "capitalize",
            fontSize: "1.1rem",
            padding: "8px 16px",
            transition: "background-color 0.3s ease",
            fontWeight: "bold",
            '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" },
          }}
        >
          Meal Plan
        </Button>

        <Button
          color="inherit"
          sx={{
            mx: 1,
            color: "white",
            textTransform: "capitalize",
            fontSize: "1.1rem",
            padding: "8px 16px",
            transition: "background-color 0.3s ease",
            fontWeight: "bold",
            '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" },
          }}
        >
          Exercise Plan
        </Button>

        <Button
          color="inherit"
          sx={{
            mx: 1,
            color: "white",
            textTransform: "capitalize",
            fontSize: "1.1rem",
            padding: "8px 16px",
            transition: "background-color 0.3s ease",
            fontWeight: "bold",
            '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" },
          }}
        >
          Recipe Generator
        </Button>

        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            textTransform: "capitalize",
            fontSize: "1.1rem",
            padding: "8px 16px",
            fontWeight: "bold",
            borderRadius: "20px",
            ml: 2,
            '&:hover': {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderColor: "white",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
