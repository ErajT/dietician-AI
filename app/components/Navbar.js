"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Change this import
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
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

const Navbar = ({ transparent, top }) => {
  const router = useRouter(); // Correct hook import
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setLoading(null);
  }, [router.pathname]);

  const handleLogout = () => {
    setLoading('logout');
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem('user');
        setSnackbarOpen(true);
        setTimeout(() => {
          router.push('/');
        }, 1500);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        setLoading(null);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify({ userId: user.uid }));
    }
  });

  const handleNavigation = (path) => () => {
    setLoading(path);
    router.push(path);
  };

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
        backgroundColor: transparent ? "transparent" : "#2b6777",
        color: "#ffffff",
        boxShadow: "none",
        padding: "0 20px",
        marginTop: top ? top : 0,
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
          <Link href="/Home" passHref>
            <Button
              color="inherit"
              onClick={handleNavigation('/Home')}
              sx={{
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
              Home
              {loading === '/Home' && <LinearProgress color="inherit" sx={{ width: '100%', height: 2, position: 'absolute', bottom: 0 }} />}
            </Button>
          </Link>

          <Link href="/mealgenerator" passHref>
            <Button
              color="inherit"
              onClick={handleNavigation('/mealgenerator')}
              sx={{
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
              {loading === '/mealgenerator' && <LinearProgress color="inherit" sx={{ width: '100%', height: 2, position: 'absolute', bottom: 0 }} />}
            </Button>
          </Link>

          <Link href="/exerciseplanner" passHref>
            <Button
              color="inherit"
              onClick={handleNavigation('/exerciseplanner')}
              sx={{
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
              {loading === '/exerciseplanner' && <LinearProgress color="inherit" sx={{ width: '100%', height: 2, position: 'absolute', bottom: 0 }} />}
            </Button>
          </Link>

          <Link href="/recipegenerator" passHref>
            <Button
              color="inherit"
              onClick={handleNavigation('/recipegenerator')}
              sx={{
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
              {loading === '/recipegenerator' && <LinearProgress color="inherit" sx={{ width: '100%', height: 2, position: 'absolute', bottom: 0 }} />}
            </Button>
          </Link>

          <Link href="/Dashboard" passHref>
            <Button
              color="inherit"
              onClick={handleNavigation('/Dashboard')}
              sx={{
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
              {loading === '/Dashboard' && <LinearProgress color="inherit" sx={{ width: '100%', height: 2, position: 'absolute', bottom: 0 }} />}
            </Button>
          </Link>
        </Box>

        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{
            display: { xs: 'none', md: 'flex' },
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
              color: "white",
            },
          }}
        >
          Logout
          {loading === 'logout' && <LinearProgress color="inherit" sx={{ width: '100%', height: 2, position: 'absolute', bottom: 0 }} />}
        </Button>

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
            <Button onClick={handleNavigation('/Home')} className="nav-button">Home</Button>
            <Button onClick={handleNavigation('/mealgenerator')} className="nav-button">Meal Plan</Button>
            <Button onClick={handleNavigation('/exerciseplanner')} className="nav-button">Exercise Plan</Button>
            <Button onClick={handleNavigation('/recipegenerator')} className="nav-button">Recipe Generator</Button>
            <Button onClick={handleNavigation('/Dashboard')} className="nav-button">Dashboard</Button>
            <Button onClick={handleLogout} className="action-button">Logout</Button>
          </DrawerContent>
        </Drawer>
      </Toolbar>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Successfully logged out"
        ContentProps={{
          sx: { backgroundColor: "#2b6777" }
        }}
      />
    </AppBar>
  );
};

export default Navbar;