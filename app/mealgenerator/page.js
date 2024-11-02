"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "@mui/material/styles";
import './globals.css';
import Navbar from "../components/Navbar";


const MealGeneratorHome = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleNewMealPlan = () => {
    router.push("/mealgenerator/newmealplanner");
  };

  const handleExistingMealPlan = () => {
    router.push("/mealgenerator/SavedMealPlan");
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

<Navbar transparent />

        <Typography
          variant="h5"
          sx={{
            color: "#ffffff",
            fontSize: { xs: "2rem", md: "3.5rem" },
            marginBottom: { xs: 1, md: -2 },
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
          onClick={handleNewMealPlan}
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
            "&:hover": {
              backgroundColor: "#2b6777",
              transform: "scale(1.05)",
              boxShadow: "0px 0px 5px 5px rgba(43, 103, 119, 0.5), 0px 0px 20px 10px rgba(43, 103, 119, 0.5)",
            },
          }}
        >
          Generate New Meal Plan
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleExistingMealPlan}
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
            "&:hover": {
              backgroundColor: "#2b6777",
              transform: "scale(1.05)",
              boxShadow: "0px 0px 5px 5px rgba(43, 103, 119, 0.5), 0px 0px 20px 10px rgba(43, 103, 119, 0.5)",
            },
          }}
        >
          View Existing Meal Plan
        </Button>
      </Box>
    </Box>
  );
};

export default MealGeneratorHome;
