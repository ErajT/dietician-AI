"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { signOut, onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth
import { auth } from '@/firebase.config';



const Navbar = ({transparent}) => {

  const router = useRouter();


  const handleLogout = () => {
    // Sign out from Firebase
    signOut(auth).then(() => {
      // Remove user from sessionStorage
      sessionStorage.removeItem('user');

      // Navigate to the base URL
      router.push('/');
    }).catch((error) => {
      console.error("Logout failed:", error);
    });
  };

  // Track auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      sessionStorage.setItem(
        'user',
        JSON.stringify({ userId: user.uid })
      );
    }
  });



  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: transparent ? "transparent" : "#2b6777", // Make background transparent if prop is true
        color: "#ffffff",
        boxShadow: "none",
        padding: "0 20px",
        transition: "background-color 0.3s ease", // Smooth transition for background color change
      }}
    >
      <Toolbar>
        <Avatar
          alt="Logo"
          src="/Logo14.png"
          sx={{
            width: 70,
            height: 70,
            marginRight: 2,
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <Link href="/mealgenerator" passHref>
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
              mx: 1,
              color: "white",
              textTransform: "capitalize",
              fontSize: "1rem",
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
              mx: 1,
              color: "white",
              textTransform: "capitalize",
              fontSize: "1rem",
              padding: "8px 16px",
              transition: "background-color 0.3s ease",
              fontWeight: "bold",
              '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" },
            }}
          >
            Recipe Generator
          </Button>
        </Link>

        <Button
          variant="outlined"
          onClick={handleLogout} // Add logout handler
          sx={{
            color: "white",
            borderColor: "white",
            textTransform: "capitalize",
            fontSize: "1rem",
            padding: "8px 16px",
            fontWeight: "bold",
            borderRadius: "20px",
            ml: 2,
            '&:hover': {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderColor: "white",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;