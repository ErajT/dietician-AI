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
import MultiSelectDropdown from '../components/MultiSelectDropdown'; // Adjust path as needed

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
    diet: [],        // Initialize as empty array
    health: [],      // Initialize as empty array
    cuisineType: [], // Initialize as empty array
    calories: "",    // Initialize as an empty string
    mealType: [],    // Initialize as empty array
    excluded: ""     // Initialize as an empty string
  });
  
  
    
  const [loading, setLoading] = useState(false);

  const handleMultiSelectChange = (key) => (values) => {
    setFormData((prevData) => ({ ...prevData, [key]: values }));
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
    padding: 4,
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
          fontStyle: "italic",
          fontFamily: "Jelligun",
          fontSize: "1.7rem",
        }}
      >
        Taste Meets Health
        <RestaurantIcon sx={{ fontSize: 24, color: "white", marginLeft: 1, marginRight: 1 }} />
        Design Your Ideal Meal Plan!
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "center" }}>

      {/*Diet Type Dropdown */}
      <MultiSelectDropdown
        label="Diet Type"
        options={[
          "balanced",
          "high-fiber",
          "high-protein",
          "low-carb",
          "low-fat",
          "low-sodium",
        ]}
        selected={formData.diet}
        setSelected={(value) => setFormData({ ...formData, diet: value })}
        required // Make this field required
      />


        {/* Health Conditions Dropdown */}
        <MultiSelectDropdown
          label="Health Conditions"
          options={[
            "alcohol-cocktail",
            "alcohol-free",
            "celery-free",
            "crustacean-free",
            "dairy-free",
            "DASH",
            "egg-free",
            "fish-free",
            "fodmap-free",
            "gluten-free",
            "immuno-supportive",
            "keto-friendly",
            "kidney-friendly",
            "kosher",
            "low-fat-abs",
            "low-potassium",
            "low-sugar",
            "lupine-free",
            "Mediterranean",
            "mollusk-free",
            "mustard-free",
            "no-oil-added",
            "paleo",
            "peanut-free",
            "pescatarian",
            "pork-free",
            "red-meat-free",
            "sesame-free",
            "shellfish-free",
            "soy-free",
            "sugar-conscious",
            "sulfite-free",
            "tree-nut-free",
            "vegan",
            "vegetarian",
            "wheat-free",
          ]}
          selected={formData.health}
          setSelected={(value) => setFormData({ ...formData, health: value })}
          required // Make this field required
        />

        {/* Cuisine Type Dropdown */}
        <MultiSelectDropdown
          label="Cuisine Type"
          options={[
            "American",
            "Asian",
            "British",
            "Caribbean",
            "Central Europe",
            "Chinese",
            "Eastern Europe",
            "French",
            "Indian",
            "Italian",
            "Japanese",
            "Kosher",
            "Mediterranean",
            "Mexican",
            "Middle Eastern",
            "Nordic",
            "South American",
            "South East Asian",
          ]}
          selected={formData.cuisineType}
          setSelected={(value) => setFormData({ ...formData, cuisineType: value })}
          required // Make this field required
        />


        {/* Meal Type Section  */}
        <FormGroup
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            marginBottom: 2,
            justifyContent: "center", // Center contents
          }}
        >
          <Typography sx={{ color: "white", marginRight: 2, textAlign: "left", width: "100%", fontWeight: "bold" }}>
            Meal Type:
          </Typography>
          {["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"].map((meal) => (
            <FormControlLabel
              key={meal}
              control={
                <Checkbox
                  checked={formData.mealType.includes(meal)} // Change mealTypes to mealType
                  onChange={() => {
                    const currentIndex = formData.mealType.indexOf(meal); // Change mealTypes to mealType
                    const newMealTypes = [...formData.mealType]; // Change mealTypes to mealType

                    if (currentIndex === -1) {
                      newMealTypes.push(meal);
                    } else {
                      newMealTypes.splice(currentIndex, 1);
                    }
                    setFormData({ ...formData, mealType: newMealTypes }); // Change mealTypes to mealType
                  }}
                  sx={{
                    color: "white", // Color of the checkbox when unchecked
                    '&.Mui-checked': {
                      color: "white", // Color of the checkbox when checked
                    },
                  }}
                />
              }
              label={meal}
              sx={{
                color: "white",
                marginRight: 2,
                '&.MuiFormControlLabel-root': {
                  marginBottom: 0,
                },
              }}
            />
          ))}
        </FormGroup>

        {/* Calories Input */}
        <TextField
          label="Calories"
          type="number"
          fullWidth
          value={formData.calories}
          onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
          required
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

        {/* Exclude Ingredients */}
        <TextField
          label="Excluded Ingredients"
          type="text"
          fullWidth
          value={formData.excluded} // Match the state key
          onChange={(e) => {
            const inputValue = e.target.value;

            // Regular expression to allow letters, commas, and spaces only
            const regex = /^[a-zA-Z\s,]*$/;

            // Check if input matches the regex
            if (regex.test(inputValue)) {
              setFormData({ ...formData, excluded: inputValue }); // Update state only if valid
            }
          }} // Update state on change
          required // Make this field required
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
              color: "#2b6777",
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
