"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase.config';
import styled from 'styled-components';

const DrawerContent = styled(Box)`
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background-color: #f0f8f7;
  gap: 20px;

  .nav-button {
    font-family: 'Jelligun', sans-serif;
    color: #2b6777;
    font-weight: bold;
    width: 100%;
    justify-content: flex-start;
    text-align: left;
  }

  .action-button {
    font-family: 'Jelligun', sans-serif;
    color: white;
    background-color: #2b6777;
    font-weight: bold;
    width: 100%;
    justify-content: flex-start;
    text-align: left;
    margin-top: 10px;
  }
`;

const Navbar = () => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem('user');
        router.push('/');
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify({ userId: user.uid }));
    }
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

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
          src="/Logo14.png"
          sx={{
            width: 95,
            height: 75,
            marginLeft: -5, 
            marginRight: 2,
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Link href="/mealgenerator" passHref>
  <Button
    color="inherit"
    sx={{
      // fontFamily: 'Jelligun, sans-serif',
      mx: 1,
      color: "white",
      textTransform: "capitalize",
      fontSize: "1.2rem",
      padding: "8px 16px",
      transition: "background-color 0.3s ease",
      fontWeight: "bold",
      '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" },
    }}
  >
    Meal Plan
  </Button>
</Link>
          <Link href="/exerciseplanner" passHref>
            <Button
              color="inherit"
              sx={{
                // fontFamily: 'Jelligun, sans-serif',
                mx: 1,
                color: "white",
                textTransform: "capitalize",
                fontSize: "1.2rem",
                padding: "8px 16px",
                transition: "background-color 0.3s ease",
                fontWeight: "bold",
                '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" },
              }}
            >
              Exercise Plan
            </Button>
          </Link>
          <Link href="/recipegenerator" passHref>
            <Button
              color="inherit"
              sx={{
                // fontFamily: 'Jelligun, sans-serif',
                mx: 1,
                color: "white",
                textTransform: "capitalize",
                fontSize: "1.2rem",
                padding: "8px 16px",
                transition: "background-color 0.3s ease",
                fontWeight: "bold",
                '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" },
              }}
            >
              Recipe Generator
            </Button>
          </Link>
          <Link href="/recipegenerator" passHref>
            <Button
              color="inherit"
              sx={{
                // fontFamily: 'Jelligun, sans-serif',
                mx: 1,
                color: "white",
                textTransform: "capitalize",
                fontSize: "1.2rem",
                padding: "8px 16px",
                transition: "background-color 0.3s ease",
                fontWeight: "bold",
                '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" },
              }}
            >
             Dashboard
            </Button>
          </Link>
        </Box>

        <Button
  variant="outlined"
  onClick={handleLogout}
  sx={{
    display: { xs: 'none', md: 'flex' }, // Ensures this button is only shown on medium and larger screens
    // fontFamily: 'Jelligun, sans-serif',
    color: "#2b6777",
    borderColor: "white",
    textTransform: "capitalize",
    fontSize: "1.2rem",
    padding: "8px 8px",
    fontWeight: "bold",
    borderRadius: "20px",
    backgroundColor: "#f0f8f7",
    width: "90px",
    height: "50px",
    ml: 2,
    alignItems: "center",
    justifyContent: "center",
    '&:hover': {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderColor: "white",
      color:"white",
    },
  }}
>
  Logout
</Button>


        {/* Menu Icon for small screens */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <DrawerContent role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <Link href="/mealgenerator" passHref>
              <Button className="nav-button">Meal Plan</Button>
            </Link>
            <Link href="/exerciseplanner" passHref>
              <Button className="nav-button">Exercise Plan</Button>
            </Link>
            <Link href="/recipegenerator" passHref>
              <Button className="nav-button">Recipe Generator</Button>
            </Link>
            <Link href="/recipegenerator" passHref>
              <Button className="nav-button">Dashboard</Button>
            </Link>
            <Button onClick={handleLogout} className="action-button">Logout</Button>
          </DrawerContent>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


