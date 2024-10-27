"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "@mui/material/styles";

const MealGeneratorHome = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleNewMealPlan = () => {
    router.push("/mealgenerator/newmealplanner");
  };

  const handleExistingMealPlan = () => {
    router.push("/mealgenerator/planner");
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
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent overlay
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingTop: theme.spacing(10),
          paddingLeft: theme.spacing(4),
        }}
      >
        <Typography variant="h5" sx={{ color: "#ffffff", marginBottom: 1 }}>
          Welcome to
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: "bold", color: "#ffffff", marginBottom: 0 }}>
            <TypeAnimation
              sequence={["Meal Generator", 500]}
              speed={50}
              repeat={Infinity}
              // cursor={false}
            />
          </Typography>
          
          {/* Slogan below the heading */}
          <Typography
            variant="subtitle1"
            sx={{
              color: "#ffffff",
              marginTop: theme.spacing(15),
              fontStyle: "none",
              width: '100%', // Match the width of the heading
              textAlign: "left", // Align to the left for a consistent look
              position:"fixed"
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

      {/* Buttons positioned at the bottom-right */}
      <Box
        sx={{
          position: "absolute",
          right: theme.spacing(6),
          bottom: theme.spacing(10),
          display: "flex",
          gap: theme.spacing(2),
          zIndex: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewMealPlan}
          sx={{
            padding: 2,
            width: "200px",
            borderRadius: "15px",
            backgroundColor: "#4CAF50",
            color:"white",
            "&:hover": {
              backgroundColor: "#45a049",
              transform: "scale(1.05)",
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
            padding: 2,
            width: "200px",
            borderRadius: "15px",
            backgroundColor: "#4CAF50",
            color:"white",
            "&:hover": {
              backgroundColor: "#45a049",
              transform: "scale(1.05)",
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
