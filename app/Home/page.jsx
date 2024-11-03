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
import styled, { createGlobalStyle } from "styled-components";
import { CircularProgress } from "@mui/material";
import Navbar from '../components/Navbar';

// Global styles
// Global styles
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Jelligun';
    src: url('/Jelligun-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'Jelligun', sans-serif;
  }
`;

// Chatbot styles
const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatbotTab = styled.div`
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

const ChatbotPopup = styled.div`
  width: 320px;
  max-height: 450px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background-color: #2b6777;
  color: white;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const ChatContent = styled.div`
  padding: 10px;
  flex-grow: 1;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const Message = styled.div`
  text-align: ${({ sender }) => (sender === "user" ? "right" : "left")};
  color: ${({ sender }) => (sender === "user" ? "#2b6777" : "black")};
  margin: 5px 0;
  padding: 8px;
  background-color: ${({ sender }) => (sender === "user" ? "#e0f7fa" : "#eaeaea")};
  border-radius: 10px;
  max-width: 80%;
  margin-left: ${({ sender }) => (sender === "user" ? "auto" : "0")};
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: white;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-right: 5px;
  background-color: #2b6777;
  color: white;
  // color: white;
`;

const SendButton = styled.button`
  background-color: #2b6777;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  font-size: 18px;
  color: white;
`;

const TypingIndicator = styled.div`
  color: gray;
  font-size: 12px;
  padding: 5px;
  text-align: left;
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

// Chatbot component
const Chatbot = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: input }),
      });

      const data = await response.json();

      const botText =
        typeof data === "string"
          ? data
          : data.message || JSON.stringify(data);

      const botMessage = { sender: "bot", text: botText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage =
        error.message || "Error connecting to chatbot API.";
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: errorMessage },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ChatbotContainer>
      <ChatbotTab onClick={toggleChatbot}>
        <ChatIcon style={{ fontSize: "40px", color: "#2b6777" }} />
      </ChatbotTab>

      {isOpen && (
        <ChatbotPopup>
          <ChatHeader>
            Chatbot
            <CloseButton onClick={toggleChatbot}>✖</CloseButton>
          </ChatHeader>
          <ChatContent>
            {messages.map((msg, index) => (
              <Message key={index} sender={msg.sender}>
                {msg.text}
              </Message>
            ))}
            {isTyping && (
              <LoadingIndicator>
                <CircularProgress size={20} />
                <TypingIndicator>Typing.....</TypingIndicator>
              </LoadingIndicator>
            )}
          </ChatContent>

          <InputContainer>
            <ChatInput
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message.."
            />
            <SendButton onClick={sendMessage}>Send</SendButton>
          </InputContainer>
        </ChatbotPopup>
      )}
    </ChatbotContainer>
  );
};

// Home component
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
    { title: "Meal Planner", description: "Effortlessly plan and manage your meals to maintain a healthy diet.", video: "/Meal2.mp4", link: "/feature1" },
    { title: "Exercise Planner", description: "Easily discover and manage personalized workouts to achieve your fitness goals.", video: "/ex.mp4", link: "/feature2" },
    { title: "Recipe Generator", description: "Generate delicious recipes tailored to your culinary preferences.", video: "/Recipe.mp4", link: "/feature3" },
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
      <GlobalStyle />
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: "#2b6777",
          color: "#ffffff",
          boxShadow: "none",
          padding: "0 20px"
        }}
      >
        <Navbar/>
        {/* <Toolbar>
          <Avatar 
            alt="Logo" 
            src="Logo14.png" 
            sx={{ 
              width: 95,
              height: 75,
              marginLeft: -5, 
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
              fontSize: "1rem",
              padding: "8px 16px",
              transition: "background-color 0.3s ease",
              fontWeight: "bold",
              fontWeight: "1000",
              '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" }
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
        </Toolbar> */}
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
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ fontFamily: "Jelligun, cursive", fontWeight: "bold", fontSize:"3.3rem" }}
            >
              Personal Information
            </Typography>
            <IconButton onClick={handleOpen} sx={{ color: "#fff", marginLeft: 1 }}>
              <EditIcon />
            </IconButton>
          </Box>
          <Typography 
            variant="h6" 
            sx={{ fontFamily: "Jelligun, cursive", fontWeight: "bold", fontSize: "2.2rem", mb: -1 }}
          >
            Age: {personalInfo.age}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ fontFamily: "Jelligun, cursive", fontWeight: "bold", fontSize: "2.2rem", mb: -1 }}
          >
            Weight: {personalInfo.weight}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ fontFamily: "Jelligun, cursive", fontWeight: "bold", fontSize: "2.2rem" }}
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
                  <CardContent sx={{ color: "#fff",fontFamily: "Jelligun, cursive" }}>
                    <Typography variant="h4" sx={{ fontFamily: "Jelligun, cursive",fontSize:"2rem",fontWeight:"bold" }}>{feature.title}</Typography>
                    <Typography variant="body1" sx={{ fontFamily: "Jelligun, cursive",fontSize:"1.5rem" }}>{feature.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>

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
            <Typography sx={{ fontFamily: "Jelligun, cursive", fontWeight: "bold", fontSize:"2.2rem" ,color:'#2b6777'}}>Edit Personal Information</Typography>
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

      <Box sx={{ position: "absolute", bottom: 20, right: 20, zIndex: 10 }}>
        <Chatbot />
      </Box>
    </Container>
  );
}

export default Home;