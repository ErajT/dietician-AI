"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "@mui/material/styles";
import './globals.css';
import Navbar from "../components/Navbar";
import React, { useState } from 'react';
// import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


const MealGeneratorHome = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleNewMealPlan = () => {
    router.push("/mealgenerator/newmealplanner");
  };

  const handleExistingMealPlan = () => {
    router.push("/mealgenerator/SavedMealPlan");
  };
  const [loadingNew, setLoadingNew] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(false);

  const handleNewMealPlann = () => {
    setLoadingNew(true);
    // Simulate an async operation
    setTimeout(() => {
      setLoadingNew(false);
      handleNewMealPlan();
      // Add your logic here
    }, 2000);
  };

  const handleExistingMealPlann = () => {
    setLoadingExisting(true);
    // Simulate an async operation
    setTimeout(() => {
      setLoadingExisting(false);
      handleExistingMealPlan();
      // Add your logic here
    }, 2000);
  };
  

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        backgroundImage: `url("/images/mainbg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(0),
      }}
    >


      {/* Dark overlay for better text visibility */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

      {/* Navbar */}
      {/* <Box sx={{ position: "relative", zIndex: 2 }}>
        <Navbar transparent white/>
      </Box> */}




      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "flex-start",
          paddingTop: theme.spacing(4),
          paddingLeft: { xs: theme.spacing(2), md: theme.spacing(4) },
          textAlign: { xs: "center", md: "left" },
        }}
      >

{/* <Navbar transparent /> */}
<Navbar transparent top="-10px" />


{/* <Navbar transparent /> */}

<Typography
  variant="h5"
  sx={{
    color: "#ffffff",
    fontSize: { xs: "2rem", md: "3.5rem" },
    marginBottom: { xs: 1, md: -2 },
    marginTop: { xs: 9, md: 10 }, // Adjust these values as needed
  }}
  className="jelligun-font"
>
  Welcome to
</Typography>


        {/* Centered Type Animation and Slogan */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginTop: { xs: 0, md: -5 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              fontSize: { xs: "5rem", md: "8rem" },
            }}
            className="jelligun-font"
          >
            <TypeAnimation
              sequence={["Meal Generator", 500]}
              speed={50}
              repeat={Infinity}
            />
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#ffffff",
              fontSize: { xs: "1.5rem", md: "2.2rem" },
              fontFamily: "Jelligun",
              marginTop: theme.spacing(-4),
            }}
          >
            <TypeAnimation
              sequence={["Your journey to a healthier lifestyle starts here", 500]}
              speed={50}
              repeat={Infinity}
              cursor={false}
            />
          </Typography>
        </Box>
      </Box>

      {/* Buttons positioned at the bottom-right */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: theme.spacing(2), md: theme.spacing(8) },
          bottom: { xs: theme.spacing(4), md: theme.spacing(8) },
          display: "flex",
          gap: theme.spacing(2),
          zIndex: 2,
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
        }}
      >
        <Button
        variant="contained"
        color="primary"
        onClick={handleNewMealPlann}
        sx={{
          width: { xs: "12rem", md: "17rem" },
          height: { xs: "3rem", md: "4rem" },
          borderRadius: "50rem",
          backgroundColor: "#2b6777",
          color: "white",
          fontFamily: "Jelligun",
          fontSize: { xs: "1.5rem", md: "2rem" },
          fontWeight: "bold",
          textTransform: "none",
          position: "relative",
          "&:hover": {
            backgroundColor: "#2b6777",
            transform: "scale(1.05)",
            boxShadow: "0px 0px 5px 5px rgba(43, 103, 119, 0.5), 0px 0px 20px 10px rgba(43, 103, 119, 0.5)",
          },
        }}
        disabled={loadingNew}
      >
        {loadingNew ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Generate New Meal Plan"}
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleExistingMealPlann}
        sx={{
          width: { xs: "12rem", md: "17rem" },
          height: { xs: "3rem", md: "4rem" },
          borderRadius: "50rem",
          backgroundColor: "#2b6777",
          color: "white",
          fontFamily: "Jelligun",
          fontSize: { xs: "1.5rem", md: "2rem" },
          fontWeight: "bold",
          textTransform: "none",
          position: "relative",
          "&:hover": {
            backgroundColor: "#2b6777",
            transform: "scale(1.05)",
            boxShadow: "0px 0px 5px 5px rgba(43, 103, 119, 0.5), 0px 0px 20px 10px rgba(43, 103, 119, 0.5)",
          },
        }}
        disabled={loadingExisting}
      >
        {loadingExisting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "View Existing Meal Plan"}
      </Button>
      </Box>
    </Box>
  );
};

export default MealGeneratorHome;
