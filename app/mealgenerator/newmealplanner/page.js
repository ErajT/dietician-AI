"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Container,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { motion } from "framer-motion";
import '../globals.css';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HexagonGallery from "../bganimation/HexagonGallery"; // Adjust path as needed

// Background Images
const images = [
  "/images/meal1.jpg",
  "/images/meal2.jpg",
  "/images/meal3.jpg",
  "/images/meal4.jpg",
  "/images/meal5.jpg",
  "/images/meal6.jpg",
  "/images/meal7.jpg",
  "/images/meal8.jpg",
  "/images/meal9.jpg",
  "/images/meal10.jpg",
  "/images/meal11.jpg",
  "/images/meal12.jpg",
];

const MealGeneratorPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    diet: "",
    health: [],
    cuisineType: [],
    mealType: [],
    calories: "",
    excluded: "",
  });

  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedArray = checked
        ? [...prevData[category], value]
        : prevData[category].filter((item) => item !== value);
      return { ...prevData, [category]: updatedArray };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(
        `/mealgenerator/planner?diet=${JSON.stringify(
          formData.diet
        )}&health=${JSON.stringify(
          formData.health
        )}&cuisineType=${JSON.stringify(
          formData.cuisineType
        )}&mealType=${JSON.stringify(formData.mealType)}&calories=${
          formData.calories
        }&excluded=${formData.excluded}`
      );
    }, 1000);
  };

  return (
    <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center", // Center the heading horizontally
      position: "relative",
      padding: 4,
      backgroundColor: '#e0f7f3',
      }}

    >
      {/* Hexagon Gallery Background */}
      <HexagonGallery />

      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          color: "#2b6777",
          marginBottom: 1,
          textAlign: "center", // Center the text
          marginTop: 0,
          width: "100%", // Ensure the heading takes the full width
          fontFamily:"Jelligun",
          fontSize:"4rem",
          fontWeight:"bold"

        }}
      >
        Meal Plan Generator
      </Typography>

      {/* Form Section */}
      <Box
        sx={{
          width: "100%", // Full width for form section on smaller screens
          maxWidth: "40%", // Limits width for larger screens
          zIndex: 2,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center", // Aligns the form to the right
          marginLeft: "auto", // Aligns form to the right

        }}
      
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            borderRadius: "12px",
          }}
        >
          <Container
            sx={{
              padding: 5,
              color: "white",
              paddingTop: 3, // Adds padding from the top
              backgroundColor: "#2b6777",
              borderRadius: "12px",
              justifyContent: "center",
              boxShadow: "0 8px 8px rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Centers all input fields within the form

            }}
          >


            {/* Form Heading */}
            <Typography
  variant="subtitle1"
  sx={{
    color: "white",
    marginBottom: 2,
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
     fontStyle:"italic",
     fontFamily:"Jelligun",
     fontSize:"1.7rem"


  }}
>
  Taste Meets Health
  <RestaurantIcon sx={{ fontSize: 24, color: "white", marginLeft: 1, marginRight: 1  }} />
  Design Your Ideal Meal Plan!
</Typography>

            <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "center"}}>
              {/* Diet Type */}
              <TextField
                label="Diet Type"
                fullWidth
                value={formData.diet}
                onChange={(e) =>
                  setFormData({ ...formData, diet: e.target.value })
                }
                sx={{
                  marginBottom: 2,
                  input: { color: "white" },
                  label: { color: "white" },
                  '& label.Mui-focused': {
                    color: 'white', // Keep label text white when focused
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white', // White outline
                    },
                    '&:hover fieldset': {
                      borderColor: 'white', // White outline on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white', // White outline when focused
                    },
                  },
                }}
              />

              {/* Health Conditions */}
              <FormGroup
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  marginBottom: 2,
                  justifyContent: "center", // Center contents
                }}
              >
                <Typography sx={{ color: "white", marginRight: 2, textAlign: "left", width: "100%",fontWeight:"bold" }}>
            Health Conditions:
          </Typography>
                {[
                  "alcohol-free",
                  "sugar-conscious",
                  "nut-free",
                  "gluten-free",
                ].map((condition) => (
                  <FormControlLabel
                    key={condition}
                    control={
                      <Checkbox
                        checked={formData.health.includes(condition)}
                        onChange={(e) => handleCheckboxChange(e, "health")}
                        value={condition}
                        sx={{
                          '&.MuiCheckbox-root': {
                            position: "relative",
                            color: "white",
                            
                          },
                          '&.MuiCheckbox-root:before': {
                            content: '""',
                            position: "absolute",
                            top: -2,
                            left: -2,
                            right: -2,
                            bottom: -2,
                            // border: "2px solid white", // White border effect
                            borderRadius: "4px",
                          },
                          '&.Mui-checked': {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label={condition.charAt(0).toUpperCase() + condition.slice(1)}
                    sx={{ color: "white", marginRight: 2 }}
                  />
                ))}
                <TextField
                  label="Other Health Conditions"
                  fullWidth
                  value={
                    formData.health.includes("other")
                      ? formData.health.find((item) => item !== "other")
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prevData) => ({
                      ...prevData,
                      health: value
                        ? [
                            ...prevData.health.filter((item) => item !== "other"),
                            value,
                          ]
                        : prevData.health.filter((item) => item !== "other"),
                    }));
                  }}
                  sx={{
                    marginBottom: 2,
                    input: { color: "white" },
                    label: { color: "white" },
                    '& label.Mui-focused': {
                      color: 'white', // Keep label text white when focused
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white', // White outline
                      },
                      '&:hover fieldset': {
                        borderColor: 'white', // White outline on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white', // White outline when focused
                      },
                    },
                  }}
                />
              </FormGroup>

              {/* Cuisine Type */}
              <FormGroup
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  marginBottom: 2,
                  justifyContent: "center", // Center contents
                }}
              >
                <Typography sx={{ color: "white", marginRight: 2, textAlign: "left", width: "100%" ,fontWeight:"bold"}}>
            Cuisine Type:
          </Typography>
                {[
                  "Italian",
                  "Mexican",
                  "Indian",
                  "Chinese",
                  "Mediterranean",
                ].map((cuisine) => (
                  <FormControlLabel
                    key={cuisine}
                    control={
                      <Checkbox
                  checked={formData.cuisineType.includes(cuisine)}
                  onChange={(e) => handleCheckboxChange(e, "cuisineType")}
                  value={cuisine}
                  sx={{
                    '&.MuiCheckbox-root': {
                      position: "relative",
                      color: "white",
                    },
                    '&.MuiCheckbox-root:before': {
                      content: '""',
                      position: "absolute",
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      // border: "2px solid white", // White border effect
                      borderRadius: "4px",
                    },
                    '&.Mui-checked': {
                      color: "white",
                    },
                  }}
                />
                    }
                    label={cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                    sx={{ color: "white", marginRight: 2 }}
                  />
                ))}
                <TextField
                  label="Other Cuisine"
                  fullWidth
                  value={
                    formData.cuisineType.includes("other")
                      ? formData.cuisineType.find((item) => item !== "other")
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prevData) => ({
                      ...prevData,
                      cuisineType: value
                        ? [
                            ...prevData.cuisineType.filter((item) => item !== "other"),
                            value,
                          ]
                        : prevData.cuisineType.filter((item) => item !== "other"),
                    }));
                  }}
                  sx={{
                    marginBottom: 2,
                    input: { color: "white" },
                    label: { color: "white" },
                    '& label.Mui-focused': {
                      color: 'white', // Keep label text white when focused
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white', // White outline
                      },
                      '&:hover fieldset': {
                        borderColor: 'white', // White outline on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white', // White outline when focused
                      },
                    },
                  }}
                />
              </FormGroup>

              {/* Meal Type */}
              <FormGroup
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  marginBottom: 2,
                  justifyContent: "center", // Center contents
                }}
              >
                <Typography sx={{ color: "white", marginRight: 2, textAlign: "left", width: "100%",fontWeight:"bold"}}>
            Meal Type:
          </Typography>
                {["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"].map((meal) => (
                  <FormControlLabel
                    key={meal}
                    control={
                      <Checkbox
                  checked={formData.mealType.includes(meal)}
                  onChange={(e) => handleCheckboxChange(e, "mealType")}
                  value={meal}
                  sx={{
                    '&.MuiCheckbox-root': {
                      position: "relative",
                      color: "white",
                    },
                    '&.MuiCheckbox-root:before': {
                      content: '""',
                      position: "absolute",
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      // border: "2px solid white", // White border effect
                      borderRadius: "4px",
                    },
                    '&.Mui-checked': {
                      color: "white",
                    },
                  }}
                />
                    }
                    label={meal}
                    sx={{ color: "white", marginRight: 2 }}
                  />
                ))}
              </FormGroup>

              {/* Calories Input */}
              <TextField
                label="Calories Goal"
                type="number"
                fullWidth
                value={formData.calories}
                onChange={(e) =>
                  setFormData({ ...formData, calories: e.target.value })
                }
                sx={{
                  marginBottom: 2,
                  input: { color: "white" },
                  label: { color: "white" },
                  '& label.Mui-focused': {
                    color: 'white', // Keep label text white when focused
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white', // White outline
                    },
                    '&:hover fieldset': {
                      borderColor: 'white', // White outline on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white', // White outline when focused
                    },
                  },
                }}
              />

              {/* Excluded Ingredients */}
              <TextField
  label="Excluded Ingredients"
  fullWidth
  value={formData.excluded}
  onChange={(e) =>
    setFormData({ ...formData, excluded: e.target.value })
  }
  sx={{
    marginBottom: 2,
    input: { color: "white" },
    label: { color: "white" },
    '& label.Mui-focused': {
      color: 'white', // Keep label text white when focused
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // White outline
      },
      '&:hover fieldset': {
        borderColor: 'white', // White outline on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white', // White outline when focused
      },
    },
  }}
/>


              {/* Submit Button */}
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    marginTop: 2,
  }}
>
  <Button
    variant="contained"
    type="submit"
    sx={{
      backgroundColor: "white",
      color:"#2b6777 ",
      

      "&:hover": {
        backgroundColor: "#efefef",
      },
    }}
  >
    Generate Meal Plan
  </Button>
</Box>

            </form>
          </Container>
        </motion.div>
      </Box>


    </Box>
  );
};

export default MealGeneratorPage;
