"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  CardActionArea,
  Modal,
  TextField,
  IconButton,
  Fade,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ChatIcon from "@mui/icons-material/Chat";
import Chatbot from "./Chatbot";
import  { createGlobalStyle } from "styled-components";
// import Navbar from '@components/Navbar';


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Jelligun';
    src: url('/Jelligun-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: bold;
  }
`;
function Home() {
  const [open, setOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    age: 28,
    weight: "70 kg",
    height: "175 cm",
  });

  const features = [
    { title: "Meal Plan", description: "Learn more about Feature 1.", video: "/Main.mp4", link: "/feature1" },
    { title: "Exercise Planner", description: "Discover details of Feature 2.", video: "/ex.mp4", link: "/feature2" },
    { title: "Recipe Generator", description: "Explore Feature 3 and its benefits.", video: "/ex.mp4", link: "/feature3" },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChatbotOpen = () => setChatbotOpen(true);
  const handleChatbotClose = () => setChatbotOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <Container
      maxWidth=""
      sx={{
        background: "linear-gradient(to bottom, #e0f7f3, #f0f8f7)",
        minHeight: "100vh",
        padding: "20px",
        overflow: "hidden",
      }}
    >
       {/* <div> */}
      {/* <Navbar /> */}
      {/* Other components go here */}
    {/* </div> */}
       <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: "#2b6777",  // Adjusted to match previous navbar style
        color: "#ffffff",
        boxShadow: "none",
        padding: "0 20px"
      }}
    >
      <Toolbar>
        <Avatar 
          alt="Logo" 
          src="Logo.png" 
          sx={{ 
            width: 70, 
            height: 70, 
            marginRight: 2 
          }} 
        />
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Button 
          color="inherit" 
          sx={{ 
            mx: 1, 
            color: "white",
            textTransform: "capitalize",
            fontSize: "1rem",
            padding: "8px 16px",
            transition: "background-color 0.3s ease",
            fontWeight: "bold",
            fontWeight: "1000",
            '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" }
            // background-color: rgba(255, 255, 255, 0.2);
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
            fontSize: "1rem",
            padding: "8px 16px",
            transition: "background-color 0.3s ease",
            fontWeight: "bold",
            fontWeight: "1000",
            '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" }
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
            fontSize: "1rem",
            padding: "8px 16px",
            transition: "background-color 0.3s ease",
            fontWeight: "bold",
            fontWeight: "1000",
            '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" }
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
            fontSize: "1rem",
            padding: "8px 16px",
            fontWeight: "bold",
    fontWeight: "1000",
    borderRadius: "20px",
            ml: 2,
            '&:hover': { 
              backgroundColor: "rgba(255, 255, 255, 0.2)", 
              borderColor: "#white" 
            }
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "35vh",
          backgroundImage: "url(/Back4.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          marginTop: 2.5,
          color: "#fff",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "35%",
            transform: "translateY(-50%)",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "left",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" ,}}>
          <>
      <GlobalStyle />
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ fontFamily: "Jelligun, cursive", fontWeight: "bold",fontSize:"3.3rem" }}
      >
        Personal Information
      </Typography>
    </>
            <IconButton onClick={handleOpen} sx={{ color: "#fff", marginLeft: 1 }}>
              <EditIcon />
            </IconButton>
          </Box>
          {/* <Typography variant="h6">Name: {personalInfo.name}</Typography> */}
          <Typography 
  variant="h6" 
  sx={{ fontFamily: "Jelligun, cursive", fontWeight: "bold", fontSize: "2.2rem", mb: -1 }} // Adjust the margin-bottom
>
  Age: {personalInfo.age}
</Typography>
<Typography 
  variant="h6" 
  sx={{ fontFamily: "Jelligun, cursive", fontWeight: "bold", fontSize: "2.2rem", mb:-1 }} // Adjust the margin-bottom
>
  Weight: {personalInfo.weight}
</Typography>
<Typography 
  variant="h6" 
  sx={{ fontFamily: "Jelligun, cursive", fontWeight: "bold", fontSize: "2.2rem" }} // No margin needed for the last item
>
  Height: {personalInfo.height}
</Typography>

        </Box>
      </Box>


<Grid container spacing={2} sx={{ marginTop: 3 }}>
  {features.map((feature, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "200px",
          borderRadius: "15px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover .cardFront": {
            opacity: 0,
            transform: "translateX(-100%)",
          },
          "&:hover .cardBack": {
            opacity: 1,
            transform: "translateX(0)",
          },
        }}
      >
        {/* Front Side with clickable link */}
        <Card
          className="cardFront"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transition: "transform 0.6s ease, opacity 0.4s ease",
            backfaceVisibility: "hidden",
            backgroundColor: "#fff",
            zIndex: 1,
          }}
        >
          <CardActionArea href={feature.link} target="_blank" rel="noopener noreferrer">
            <Box
              component="video"
              src={feature.video}
              autoPlay
              muted
              loop
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.7)",
                borderRadius: "15px 15px 0 0",
              }}
            />
          </CardActionArea>
        </Card>

        {/* Back Side with clickable link */}
        <Card
          className="cardBack"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transition: "transform 0.6s ease, opacity 0.4s ease",
            transform: "translateX(100%)",
            backgroundColor: "#2b6777",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
            backfaceVisibility: "hidden",
            opacity: 0,
            zIndex: 2,
          }}
        >
          <CardActionArea href={feature.link} target="_blank" rel="noopener noreferrer">
            <CardContent sx={{ color: "#fff" }}>
              <Typography variant="h5">{feature.title}</Typography>
              <Typography variant="body2">{feature.description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Grid>
  ))}
</Grid>


      <IconButton
        onClick={handleChatbotOpen}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#cee2d2",
          color: "#000",
          borderRadius: "50%",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          width: 80,
          height: 80,
        }}
      >

      </IconButton>

      {chatbotOpen && <Chatbot onClose={handleChatbotClose} />}

      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "#cee2d2",
              borderRadius: "15px",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
              p: 4,
            }}
          >
            <Typography sx={{ fontFamily: "Jelligun, cursive", fontWeight: "bold",fontSize:"2.2rem" ,color:'#2b6777'}}>Edit Personal Information</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={personalInfo.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Age"
              name="age"
              value={personalInfo.age}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Weight"
              name="weight"
              value={personalInfo.weight}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Height"
              name="height"
              value={personalInfo.height}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              sx={{ marginTop: 2, backgroundColor: "#2b6777", color: "#fff" }}
              onClick={handleClose}
            >
              Save
            </Button>
          </Box>
        </Fade>
      </Modal>
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          width: "300px", 
          height: "auto",
          zIndex: 10, 
        }}
      >
        <Chatbot />
      </Box>
    </Container>
  );
}

export default Home;