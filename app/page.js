"use client";
import React, { useEffect, useRef, useState } from "react";
import Head from 'next/head';
import styled, { keyframes } from "styled-components";
import * as THREE from "three";
import { AppBar, Toolbar, Avatar, Box, Button } from "@mui/material";
import "aos/dist/aos.css";
import AOS from "aos";
import { FaUser, FaRocket, FaChartLine, FaStar, FaComments, FaHeadset } from "react-icons/fa";
import  { createGlobalStyle } from "styled-components";
import Link from 'next/link';
import "./mealgenerator/globals.css";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';



const waveAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Jelligun';
    src: url('/Jelligun-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: bold;
  }
`;

const Page = styled.div`
  background: linear-gradient(to bottom, #e0f7f3, #f0f8f7);
  font-family: "Lobster", cursive;
  overflow-x: hidden;
  color: #2b6777;
  position: relative;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ scrolled }) => (scrolled ? 'rgba(0, 0, 0, 0.85)' : 'transparent')};
  color: white;
  font-size: 1.5em;
  height: 70px;
  z-index: 10;
  transition: background-color 0.3s ease;
  padding: 0 20px;
  font-family: 'Jelligun', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }

  @media (max-width: 480px) {
    font-size: 1em;
    padding: 0 10px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Jelligun', sans-serif;

  .nav-button {
    color: #2b6777;
    padding: 8px 16px;
    text-transform: uppercase;
    font-weight: 1000;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 5px;
    }
  }

  .action-button {
    color: white;
    background-color: #2b6777;
    margin-left: 12px;
    padding: 8px 20px;
    border-radius: 20px;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .nav-button {
      padding: 6px 12px;
      font-size: 0.9em;
    }

    .action-button {
      padding: 6px 16px;
      font-size: 0.9em;
    }
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const MobileMenuIcon = styled(IconButton)`
  display: none;

  @media (max-width: 480px) {
    display: flex;
    color: #2b6777;
  }
`;

const DrawerContent = styled(Box)`
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background-color: #f0f8f7;
  gap: 20px;
  font-family: 'Jelligun', sans-serif;

  .nav-button {
    color: #2b6777;
    font-weight: bold;
    width: 100%;
    justify-content: flex-start;
    text-align: center;
  }

  .action-button {
    color: white;
    background-color: #2b6777;
    font-weight: bold;
    width: 100%;
    justify-content: flex-start;
    text-align: left;
    margin-top: 10px;
  }
`;
const Leaf = styled.div`
position: absolute;
bottom: 0;
width: 200%;
height: 100px;
overflow: hidden;
background-color: transparent;

&::before {
content: '';
display: block;
position: absolute;
width: 200%;
height: 100px;
background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%232b6777" fill-opacity="1" d="M0,160L48,186.7C96,213,192,267,288,266.7C384,267,480,213,576,197.3C672,181,768,203,864,202.7C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') repeat-x;
animation: ${waveAnimation} 12s linear infinite;
filter: blur(3px);
opacity: 0.8;
}
`
const Section = styled.div`
display: flex;
align-items: center;
height: 95vh;
position: relative;
overflow: hidden;
background: transparent;
padding-top: 60px;

&:nth-child(even) {
  flex-direction: row-reverse;
}

@media (max-width: 768px) {
  flex-direction: column;
  height: auto;
}
`;

const TextWrapper = styled.div`
position: absolute;
left: 70px;
z-index: 2;
color: #2b6777;
padding: 50px;
max-width: 700px;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
font-size: 6rem;
font-family: "Jelligun", cursive;
font-weight: bold;
top: 7%;

h3 {
  margin: 0;
}

p {
  font-size: 40px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  line-height: 1.4;
  gap: 10px; 
}

.word {
  display: flex;
}

.letter {
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  animation-delay: calc(var(--delay) * 0.1s);
  animation-fill-mode: forwards; 
  animation-iteration-count: 2; 
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  position: relative;
  font-size: 2.5rem;
  padding: 20px;
  top: 10%;
  text-align: center;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  .side-by-side {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }

  h3 {
    display: inline;
    margin-right: 10px;
    font-size: 2.5rem;
  }

  img {
    display: inline-block;
    width: 50px; /* Adjust the size as needed */
    height: auto;
    margin-left: 10px; /* Add space between h3 and image */
  }

  p {
    font-size: 24px;
    margin-top: 20px;
    max-width: 100%;
    text-align: center;
  }
}
`;


const VideoWrapper = styled.div`
  flex: 1;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-top: -60px;
  }

  img {
    display: none; /* Hide the image on larger screens */
  }

  @media (max-width: 768px) {
    video {
      display: none;
    }
  }
`;


const SecondSection = styled.div`
  padding: 100px 40px;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, #e0f7f3 0%, #f0f8f7 100%);
  color: #2b6777;
  // clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  perspective: 1000px;
  height: 400px;

  h2 {
    font-size: 6rem;
  margin-top: -10px;
  margin-bottom: 60px;
  color: #2b6777;
  font-family: "Jelligun", cursive;
   font-weight: bold;
  }
`;

const QuoteWrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
  justify-content: center;
  perspective: 1000px;
`;

const QuoteCarousel = styled.div`
  display: flex;
  width: fit-content;
  transition: transform 0.5s ease-in-out;
`;

const Quote = styled.div`
  min-width: 300px;
  margin: 0 20px;
  text-align: center;
  opacity: 0.9;
  transition: opacity 0.3s ease, transform 0.7s cubic-bezier(0.42, 0, 0.58, 1);
  transform-style: preserve-3d;
  perspective: 1000px;
  cursor: pointer;

  &:hover {
    opacity: 1;
    transform: rotateY(20deg) translateZ(10px);
  }

  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    margin-bottom: 15px;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.2) rotateY(360deg);
    }
  }

  p {
    font-size: 18px;
    color: #2b6777;
    margin-top: 10px;
    transform: translateZ(20px);
  }
`;

const ThirdSection = styled.div`
  text-align: center;
  background-color: #f0f8f7;
  padding: 100px 20px;
  position: relative;
  // clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%);
  // height: 700px;
`;
const Heading = styled.h2`
  font-size: 7rem;
  margin-top: -10px;
  margin-bottom: 60px;
  color: #2b6777;
  font-family: "Jelligun", cursive; 
  font-weight: bold;
`;

const BooksWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  perspective: 800px;
  flex-wrap: wrap;
  margin-top: 80px;
`;

const Book = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.5s ease;

  &:hover {
    transform: translateZ(50px);

    .right-panel {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const BookContent = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #2b6777;
  width: 400px;
  height: 300px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
`;

const LeftPanel = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
`;

const RightPanel = styled.div`
  width: 50%;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #2b6777;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  transform: translateX(100%);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.5s ease;

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    line-height: 1.4;
  }
`;
const FourthSection = styled.div`
  padding: 100px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
  color: #2b6777;
  background: #f0f8f7;
`;

const Heading1 = styled.h2`
  font-size: 6rem;
  margin-top: -10px;
  margin-bottom: 60px;
  color: #2b6777;
  font-family: "Jelligun", cursive;
  font-weight: bold;
`;

const UniqueFeature = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 50px;
  perspective: 1500px;
  position: relative;
  z-index: 2;
  padding: 0 50px;
`;

const FeatureCube = styled.a`
  width: 280px;
  height: 280px; /* Increased height */
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s ease-in-out;
  margin: 20px auto;
  cursor: pointer;
  text-decoration: none;
  transform: rotateY(0deg); /* Start with front face */

  &:hover {
    transform: rotateY(-180deg); /* Flip on hover */
  }

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    backface-visibility: hidden; /* Hide backface */
  }

  .front {
    transform: rotateY(0deg) translateZ(1px); /* Front face */
    background-color: #4a9da8;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 15px;
    }
  }

  .back {
    transform: rotateY(180deg) translateZ(1px); /* Back face, hidden initially */
    background-color: #1d4f5b;
    padding: 20px;
    text-align: center;
    line-height: 1.5;
    font-size: 16px;
    color: #f0f0f0;
  }
`;
const FifthSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  text-align: center;
  background-color: #f0f8f7;
  // padding: 100px 20px;
  position: relative;
  // clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%);
  // height: 700px;
`;

const Title = styled.h2`
font-size: 6rem;
margin-top: -10px;
margin-bottom: 60px;
color: #2b6777;
font-family: "Jelligun", cursive;
font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 50px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1000px;
  width: 100%;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &.highlighted {
    border: 2px solid #6c5ce7;
    box-shadow: 0 8px 15px rgba(108, 92, 231, 0.2);
  }
`;

const Icon = styled.div`
  font-size: 2rem;
  color: #6c5ce7;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const TestimonialsSection = styled.div`
  padding: 100px 20px;
  text-align: center;
  background-color: #f9f9f9;
`;

const TestimonialsHeading = styled.h2`
font-size: 6rem;
margin-top: -35px;
margin-bottom: 25px;
color: #2b6777;
font-family: "Jelligun", cursive;
font-weight: bold;
`;

const SubHeading = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 40px;
`;

const TestimonialsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const TestimonialCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const Quote1 = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  font-style: italic;
`;

const Name = styled.h4`
  font-size: 18px;
  color: #f8b739;
  margin: 5px 0;
`;

const Role = styled.p`
  font-size: 14px;
  color: #888;
`;
const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 50px;
  background-color: #2b6777;
  color: #ffffff;
  position: relative;
  font-size: 14px;
  font-weight: bold;

  .wave {
    position: absolute;
    top: -10px;
    left: 0;
    width: 100%;
    height: 20px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%232b6777" fill-opacity="1" d="M0,224L48,192C96,160,192,96,288,80C384,64,480,96,576,128C672,160,768,192,864,181.3C960,171,1056,117,1152,96C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat;
    background-size: cover;
  }

  .footer-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    z-index: 1; /* Keeps content above the wave */
  }

  .app-name {
    // margin-left: 20px;
  }

  .copyright {
    // margin-right: 80px;
    margin-left: 600px;
    font-size: 1.7rem;
    font-weight :bold;
    color: #d3d3d3; /* Light gray for a subtle look */
    font-family: "Jelligun", cursive;
  }
`;

function AnimatedText({ text }) {
  return (
    <p>
      {text.split(" ").map((word, wordIndex) => (
        <span className="word" key={wordIndex}>
          {word.split("").map((char, charIndex) => (
            <span
              className="letter"
              key={charIndex}
              style={{ "--delay": wordIndex * 5 + charIndex }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}



function useCarousel(length) {
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % length);
    }, 3000);
    return () => clearInterval(interval);
  }, [length]);

  return index;
}

export default function Home() {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  useEffect(() => {
    AOS.init();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const leafCount = 100;
    const leaves = [];
    const loader = new THREE.TextureLoader();

    loader.load(
      "leaf3.png",
      (texture) => {
        const geometry = new THREE.PlaneGeometry(0.5, 0.5 * (texture.image.height / texture.image.width));
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

        for (let i = 0; i < leafCount; i++) {
          const leaf = new THREE.Mesh(geometry, material);
          leaf.position.set(Math.random() * 20 - 10, Math.random() * 10, Math.random() * 20 - 10);
          leaf.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);
          leaves.push(leaf);
          scene.add(leaf);
        }
      },
      undefined,
      (error) => console.error("Error loading texture:", error)
    );

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      leaves.forEach((leaf) => {
        leaf.rotation.x += 0.01;
        leaf.rotation.y += 0.01;
        leaf.position.y -= 0.02;
        if (leaf.position.y < -5) {
          leaf.position.y = 10;
        }
      });
      renderer.render(scene, camera);
    }
    animate();

    const handleScroll = () => {
      const navbar = document.querySelector("nav");
      const navLinks = document.querySelectorAll(".nav-button");
      const actionButtons = document.querySelectorAll(".action-button");
      const logo = document.querySelector("nav img");

      if (window.scrollY > 50) {
        navbar.style.backgroundColor = "#2b6777";
        logo.src = "Logo14.png";
        navLinks.forEach((link) => {
          link.style.color = "white";
        });
        actionButtons.forEach((button) => {
          button.style.backgroundColor = "#f0f8f7";
          button.style.color = "#2b6777";
        });
      } else {
        navbar.style.backgroundColor = "transparent";
        logo.src = "Logo15.png";
        navLinks.forEach((link) => {
          link.style.color = "";
        });
        actionButtons.forEach((button) => {
          button.style.backgroundColor = "#2b6777";
          button.style.color = "white";
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      clearTimeout(loadingTimeout);
    };
  }, []);

  const quotes = [
    {
      text: "Life has no remote,Get up and change it yourself.",
      img: "/QR.png",
    },
    {
      text: "Nutrition Isn't just about eating,It's about learning to live",
      img: "/U.png",
    },
    {
      text: "Exercise is king.Nutrition is queen.Put them together and you've got a kingdom",
      img: "/QE.png",
    },
    {
      text: "Nothing tastes as good as healthy feels",
      img: "/QF.png",
    },
    {
      text: "When diet is wrong, medicine is of no use. When diet is correct medicine is of no need",
      img: "/B.png",
    },
    {
      text: "Let food be thy medicine and medicine be thy food",
      img: "/QS.png",
    },
  ];

  const quotesLoop = [...quotes, ...quotes];
  const currentIndex = useCarousel(quotes.length);
  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  

  return (
    <Page>
      {/* <Head>
          <title>Meal Plan Page</title>
          <link rel="icon" href="/path-to-your-image/favicon.ico" />
      </Head> */}
      <Background ref={mountRef} />
      <Navbar scrolled={scrolled}>
      <Toolbar sx={{ width: "100%" }}>
        <Avatar alt="Logo" src="Logo15.png" sx={{ width: 100, height: 100, marginLeft: -5, marginTop: 1 }} />
        <Box sx={{ flexGrow: 1 }} />

        <NavLinks>
          <Button className="nav-button" onClick={() => handleScroll('main')}>Main</Button>
          <Button className="nav-button" onClick={() => handleScroll('reflection')}>Reflection</Button>
          <Button className="nav-button" onClick={() => handleScroll('features')}>Features</Button>
          <Button className="nav-button" onClick={() => handleScroll('tracker')}>Tracker</Button>
          <Button className="nav-button" onClick={() => handleScroll('benefits')}>App Benefit</Button>
          <Button className="nav-button" onClick={() => handleScroll('reviews')}>Client Review</Button>
          <Button className="nav-button" onClick={() => handleScroll('footer')}>Footer</Button>
          <Link href="/login" passHref>
            <Button variant="contained" className="action-button">Login</Button>
          </Link>
          <Link href="/signup" passHref>
            <Button variant="contained" className="action-button">Signup</Button>
          </Link>
        </NavLinks>

        <MobileMenuIcon onClick={toggleDrawer(true)}>
          <MenuIcon />
        </MobileMenuIcon>

        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <DrawerContent
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Button className="nav-button" onClick={() => handleScroll('main')}>Main</Button>
            <Button className="nav-button" onClick={() => handleScroll('reflection')}>Reflection</Button>
            <Button className="nav-button" onClick={() => handleScroll('features')}>Features</Button>
            <Button className="nav-button" onClick={() => handleScroll('tracker')}>Tracker</Button>
            <Button className="nav-button" onClick={() => handleScroll('benefits')}>App Benefit</Button>
            <Button className="nav-button" onClick={() => handleScroll('reviews')}>Client Review</Button>
            <Button className="nav-button" onClick={() => handleScroll('footer')}>Footer</Button>
            <Link href="/login" passHref>
              <Button variant="contained" className="action-button">Login</Button>
            </Link>
            <Link href="/signup" passHref>
              <Button variant="contained" className="action-button">Signup</Button>
            </Link>
          </DrawerContent>
        </Drawer>
      </Toolbar>
    </Navbar>

    <Section id="main">
    <TextWrapper>
      <h3>Restore Balance,</h3>
      <h3>Embrace Life</h3>
      <AnimatedText text="A digital wellness companion to help you find balance with personalized fitness, nutrition, and mindfulness tools empowering you to live each moment fully." />
    </TextWrapper>
    <VideoWrapper>
      <video autoPlay muted loop playsInline>
        <source src="/section7.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img src="/section9.png" alt="Wellness companion" />
    </VideoWrapper>
    <Leaf/>
  </Section>
      <SecondSection id="reflection">
        <h2 data-aos="fade-right">Thoughtful Reflections</h2>
        <QuoteWrapper>
          <QuoteCarousel
            style={{
              transform: `translateX(-${currentIndex * 320}px)`,
              transition: "transform 1s cubic-bezier(0.42, 0, 0.58, 1)",
            }}
          >
            {quotesLoop.map((quote, i) => (
              <Quote key={i}>
                <img src={quote.img} alt={`Quote ${i + 1}`} />
                <p>{quote.text}</p>
              </Quote>
            ))}
          </QuoteCarousel>
        </QuoteWrapper>
        <Leaf />
      </SecondSection>

      <ThirdSection id="features">
      <GlobalStyle />
        <Heading data-aos="fade-right">A Palette of Offerings</Heading>
        <BooksWrapper>
          <Book>
            <BookContent>
              <LeftPanel>
                <video src="meal.mp4" autoPlay muted loop playsInline />
              </LeftPanel>
              <RightPanel className="right-panel">
                <h3>Meal Planner</h3>
                <p>Customized meal plans tailored to your dietary needs.</p>
              </RightPanel>
            </BookContent>
          {/* </Book> */}
            </Book>
        <Book>
          <BookContent>
            <LeftPanel>
              <video src="ex.mp4" autoPlay muted loop playsInline />
            </LeftPanel>
            <RightPanel className="right-panel">
              <h3>Exercise Planner</h3>
              <p>Personalized workouts to achieve your fitness goals.</p>
            </RightPanel>
          </BookContent>
        </Book>
        <Book>
          <BookContent>
            <LeftPanel>
              <video src="Recipe.mp4" autoPlay muted loop playsInline />
            </LeftPanel>
            <RightPanel className="right-panel">
              <h4>Recipe Generator</h4>
              <p>Generate delicious recipes tailored to your culinary preferences.</p>
            </RightPanel>
          </BookContent>
        </Book>
      </BooksWrapper>
      <Leaf/>
    </ThirdSection>

    <FourthSection id="tracker">
      <Heading1 data-aos="fade-up">Track for Complete Wellness</Heading1>
      <UniqueFeature>
        <FeatureCube >
          <div className="front">
            <img src="calorie.jpeg" alt="Calorie Tracker" />
          </div>
          <div className="back">
            <h2>Calorie Tracker</h2>
          </div>
        </FeatureCube>
        <FeatureCube >
          <div className="front">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh85IdUW3ih3UALUUr_x8cnYiwTkpvqeu-gQ&s" alt="Water Tracker" />
          </div>
          <div className="back">
            <h2>Water Tracker</h2>
          </div>
        </FeatureCube>
        <FeatureCube >
          <div className="front">
            <img src="https://www.sleepcycle.com/wp-content/uploads/2022/09/hscwmain-1920x1270.jpg" alt="Sleep Tracker" />
          </div>
          <div className="back">
            <h2>Sleep Tracker</h2>
          </div>
        </FeatureCube>
      </UniqueFeature>
      <Leaf/>
    </FourthSection>
    <FifthSection id="benefits">
      <Title>Your Essential App for Life Enhancement</Title>
      {/* <Subtitle>Explore the features designed to simplify and enhance your experience.</Subtitle> */}
      
      <CardContainer>
        <Card>
          <Icon><FaUser /></Icon>
          <CardTitle>User Friendly</CardTitle>
          <CardDescription>AppMart brings you smooth, intuitive user interactions that are optimized for a hassle-free experience.</CardDescription>
        </Card>

        <Card className="highlighted">
          <Icon><FaRocket /></Icon>
          <CardTitle>Super Fast</CardTitle>
          <CardDescription>This application will help you work efficiently with fast load times and seamless connections.</CardDescription>
        </Card>

        <Card>
          <Icon><FaChartLine /></Icon>
          <CardTitle>Insightful Analytics</CardTitle>
          <CardDescription>Gain effective insights that can help you analyze and improve your overall experience.</CardDescription>
        </Card>

        <Card>
          <Icon><FaStar /></Icon>
          <CardTitle>Highly Rated</CardTitle>
          <CardDescription>Loved by hundreds of users, this app has received rave reviews across the board.</CardDescription>
        </Card>

        <Card>
          <Icon><FaComments /></Icon>
          <CardTitle>User Forum Forum</CardTitle>
          <CardDescription>It’s a space where users can share tips, ideas, and get help from the community.</CardDescription>
        </Card>

        <Card>
          <Icon><FaHeadset /></Icon>
          <CardTitle>24/7 Support</CardTitle>
          <CardDescription>Got an issue? Our dedicated support team is always available to assist you.</CardDescription>
        </Card>
      </CardContainer>
      <Leaf/>
    </FifthSection>
    <TestimonialsSection id="reviews">
      <TestimonialsHeading>Client Review</TestimonialsHeading>
      {/* <SubHeading>Subscribe Easy Tutorials YouTube channel to watch more videos.</SubHeading> */}
      
      <TestimonialsContainer>

        <TestimonialCard>
          <ProfileImage src="https://fdiinc.com/wp-content/uploads/2021/02/professional-female-circle-1030x1030.png" alt="Testimonial 1" />
          <Quote1>“Like this video and ask your questions in the comment section, don’t forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop.”</Quote1>
          <Name>Avinash Kr</Name>
          <Role>Co-Founder at xyz</Role>
        </TestimonialCard>
      
        <TestimonialCard>
          <ProfileImage src="https://themusclemedics.com/wp-content/uploads/2018/04/Circle-Profile-PNG.png" alt="Testimonial 2" />
          <Quote1>“Like this video and ask your questions in the comment section, don’t forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop.”</Quote1>
          <Name>Bharat Kunal</Name>
          <Role>Manager at xyz</Role>
        </TestimonialCard>
      
        <TestimonialCard>
          <ProfileImage src="https://www.staffsprep.com/software/flat_faces_icons/png/flat_faces_icons_circle/flat-faces-icons-circle-6.png" alt="Testimonial 3" />
          <Quote1>“Like this video and ask your questions in the comment section, don’t forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop.”</Quote1>
          <Name>Prabhakar D</Name>
          <Role>Founder / CEO at xyz</Role>
        </TestimonialCard>
      </TestimonialsContainer>
    </TestimonialsSection>
    <Footer id="footer">
    <div className="wave"></div>
    <div className="footer-content">
      {/* <div className="app-name">Velora</div> */}
      <div className="copyright">
        &copy; 2024 Velora | All Rights Reserved
      </div>
    </div>
  </Footer>
  </Page>
);
}