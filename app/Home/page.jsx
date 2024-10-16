// "use client";
// import styled, { createGlobalStyle } from "styled-components";
// import { useState, useEffect, useRef } from "react";
// import { FaCommentDots, FaTimes } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import Tilt from "react-parallax-tilt";
// import Particles from "react-tsparticles";

// // Global styles
// const GlobalStyle = createGlobalStyle`
//   body {
//     margin: 0;
//     font-family: 'Poppins', sans-serif;
//     background-color: #e0e0e0;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: flex-start;
//     min-height: 100vh;
//     perspective: 1500px;
//     overflow: hidden;
//     padding: 40px 20px;
//   }
// `;

// // Particle Background
// const ParticleBackground = styled(Particles)`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   z-index: -1;
// `;

// // Main container for images and text
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 40px;
//   padding: 20px;
// `;

// // Grid for the images (3 top, 3 bottom)
// const ImageGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 20px;
//   width: 100%;
//   justify-items: center;
// `;

// // Image container, blurred except for the active one
// const ImageContainer = styled(Tilt)`
//   width: 250px;
//   height: 350px;
//   position: relative;
//   cursor: pointer;
//   border-radius: 20px;
//   overflow: hidden;
//   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
//   padding: 10px;
//   filter: ${(props) => (props.isActive ? "none" : "blur(1px)")};
//   transition: transform 0.5s ease-in-out, filter 0.5s ease-in-out;

//   &:hover {
//     transform: translateY(-5px) scale(1.05);
//   }
// `;
// // Styled Image
// const StyledImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   transition: transform 0.5s ease;

//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// // Tooltip for displaying text
// const Tooltip = styled(motion.div)`
//   position: absolute;
//   bottom: 15px;
//   left: 10%;
//   transform: translateX(-50%);
//   background-color: rgba(0, 0, 0, 0.8);
//   border-radius: 8px;
//   padding: 8px 12px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   font-size: 1rem;
//   color: #fff;
//   white-space: nowrap;
//   pointer-events: none;
//   z-index: 7; /* Ensure tooltip is visible above image */
// `;

// // Chatbot Button styled
// const ChatbotButton = styled(motion.div)`
//   position: fixed;
//   bottom: 30px;
//   right: 30px;
//   width: 60px;
//   height: 60px;
//   background-color: #007bff;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   cursor: pointer;
//   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     background-color: #0056b3;
//     transform: scale(1.2);
//   }
// `;

// const Home = () => {
//   const slides = [
//     { image: "https://www.kitchenskip.com/wp-content/uploads/2023/02/green-goddess-salad-dressing-f.jpg", text: "Green Goddess Salad" },
//     { image: "https://feelgoodfoodie.net/wp-content/uploads/2019/02/Mediterranean-Chopped-Salad-12.jpg", text: "Mediterranean Salad" },
//     { image: "https://www.herwholesomekitchen.com/wp-content/uploads/2022/09/fall-cobb-salad-1-4-2.jpg", text: "Fall Cobb Salad" },
//     { image: "https://natashaskitchen.com/wp-content/uploads/2021/06/Chicken-Salad-SQ.jpg", text: "Chicken Salad" },
//     { image: "https://www.thespruceeats.com/thmb/QXQsH2cttRxeYKT7pjaIxJQOV9Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/perfect-guacamole-recipe-4161803-hero-01-0a3458e4d1f04e7e8438b0c92ecdcf7a.jpg", text: "Guacamole" },
//     { image: "https://www.simplyrecipes.com/thmb/jbrbyoTh7kDn0qsxf4nPZQHqkws=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Classic-Margarita-LEAD-07-15b0ae2fb2c04b21909740f80e0b99ac.jpg", text: "Classic Margarita" },
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [chatbotVisible, setChatbotVisible] = useState(false);
//   const intervalRef = useRef(null);

//   const startCycle = () => {
//     if (!intervalRef.current) {
//       intervalRef.current = setInterval(() => {
//         setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
//       }, 4000);
//     }
//   };

//   const stopCycle = () => {
//     clearInterval(intervalRef.current);
//     intervalRef.current = null;
//   };

//   const toggleChatbot = () => {
//     setChatbotVisible(!chatbotVisible);
//   };

//   useEffect(() => {
//     startCycle();
//     return () => stopCycle();
//   }, []);

//   return (
//     <>
//       <GlobalStyle />
//       <ParticleBackground
//         options={{
//           particles: {
//             number: { value: 80 },
//             color: { value: "#ffffff" },
//             shape: { type: "circle" },
//             opacity: { value: 0.5, random: true },
//             size: { value: 3 },
//             move: { enable: true, speed: 2 },
//           },
//         }}
//       />
//       <Container>
//         <ImageGrid>
//           {slides.map((slide, index) => (
//             <ImageContainer
//               key={index}
//               options={{ max: 25, scale: 1.05, speed: 300 }}
//               isActive={index === activeIndex}
//               onMouseEnter={() => {
//                 setActiveIndex(index);
//                 stopCycle(); // Stop the animation on hover
//               }}
//               onMouseLeave={() => {
//                 startCycle(); // Restart the animation on mouse leave
//               }}
//             >
//               <StyledImage src={slide.image} alt={slide.text} />
//               {index === activeIndex && (
//                 <Tooltip
//                   initial={{ opacity: 0, translateY: -10 }}
//                   animate={{ opacity: 1, translateY: 0 }}
//                   exit={{ opacity: 0, translateY: -10 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {slide.text}
//                 </Tooltip>
//               )}
//             </ImageContainer>
//           ))}
//         </ImageGrid>
//       </Container>

//       <ChatbotButton
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={toggleChatbot}
//       >
//         <FaCommentDots size={25} />
//       </ChatbotButton>

//       <AnimatePresence>
//         {chatbotVisible && (
//           <motion.div
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 100 }}
//             transition={{ duration: 0.3 }}
//             style={{
//               position: "fixed",
//               bottom: "100px",
//               right: "30px",
//               background: "#fff",
//               borderRadius: "10px",
//               boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
//               width: "300px",
//               height: "400px",
//               display: "flex",
//               flexDirection: "column",
//               padding: "20px",
//             }}
//           >
//             <FaTimes
//               style={{ margin: "10px", alignSelf: "flex-end", cursor: "pointer" }}
//               size={20}
//               onClick={toggleChatbot}
//             />
//             {/* Chatbot content */}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Home;
"use client";
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Card, CardContent, CardActionArea } from '@mui/material';

function Home() {
  const personalInfo = {
    name: 'John Doe',
    age: 28,
    weight: '70 kg',
    height: '175 cm'
  };

  const features = [
    { title: 'Feature 1', video: '/Main.mp4', link: '/feature1' },
    { title: 'Feature 2', video: '/video2.mp4', link: '/feature2' },
    { title: 'Feature 3', video: '/video3.mp4', link: '/feature3' },
    { title: 'Feature 4', video: '/video4.mp4', link: '/feature4' }
  ];

  return (
    <Container maxWidth="" sx={{ background: '#cee2d2', minHeight: '100vh', padding: '20px' }}>
      {/* Top Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#cee2d2', color: '#000' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit">Settings</Button>
          <Button color="inherit">Help</Button>
          <Button color="inherit" sx={{ marginLeft: 'auto' }}>
            Logo
          </Button>
        </Toolbar>
      </AppBar>

      {/* Image with Personal Info */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '220px',
          backgroundImage: 'url(/Back1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          marginTop: 2,
          color: '#fff'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '20%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            // backgroundColor: 'rgba(0, 0, 0, 0.6)'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Personal Information
          </Typography>
          <Typography variant="body1">Name: {personalInfo.name}</Typography>
          <Typography variant="body1">Age: {personalInfo.age}</Typography>
          <Typography variant="body1">Weight: {personalInfo.weight}</Typography>
          <Typography variant="body1">Height: {personalInfo.height}</Typography>
          <Button
            variant="contained"
            sx={{ marginTop: 2, backgroundColor: '#000' }}
            href="/dashboard"
          >
            Go to Dashboard
          </Button>
        </Box>
      </Box>

      {/* Feature Cards */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <CardActionArea href={feature.link}>
                <Box
                  component="video"
                  src={feature.video}
                  autoPlay
                  muted
                  loop
                  sx={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
                <CardContent
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: '#fff'
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2">
                    Description for {feature.title}. Click to learn more.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
