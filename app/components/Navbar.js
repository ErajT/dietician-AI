import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const [router, setRouter] = useState(null); // Store router instance
  const auth = getAuth();

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
    if (typeof window !== 'undefined') {
      const { useRouter } = require('next/router'); // Dynamically import useRouter
      setRouter(useRouter());
    }
  }, []);

  const handleLogout = () => {
    if (router) {
      signOut(auth)
        .then(() => {
          sessionStorage.removeItem('user');
          router.push('/');
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    }
  };

  useEffect(() => {
    if (isClient) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          sessionStorage.setItem(
            'user',
            JSON.stringify({ userId: user.uid })
          );
        }
      });
    }
  }, [isClient, auth]);

  if (!isClient || !router) return null;

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
          src="Logo14.png"
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
          onClick={handleLogout}
          sx={{
            color: "white",
            borderColor: "white",
            textTransform: "capitalize",
            fontSize: "1.1rem",
            padding: "8px 16px",
            fontWeight: "bold",
            borderRadius: "20px",
            ml: 2,
            backgroundColor: "#f0f8f7",
            color: "#2b6777",
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
