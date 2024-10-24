"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import ResponsiveDialog from '../../components/popup'; 
import RecipeTable from '../../components/recipedetails';
import IngredientsTable from '../../components/ingredients';
import AccordionTransition from '../../components/recipeinstruction';
import MediaCard from '../../components/ad';
import '../../styling/recipegenerator.css';

const IndividualRecipe = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dish, setDish] = useState(null);
  const [id, setId] = useState(null); 
  const [openDialog, setOpenDialog] = useState(false); 
  const [mediaCardAnimation, setMediaCardAnimation] = useState(false); // New state for animation control

  useEffect(() => {
    const storedDish = sessionStorage.getItem('dish');
    const storedId = sessionStorage.getItem('id'); 
    setDish(storedDish); 
    setId(storedId); 

    if (storedDish && storedId) {
      fetchRecipes(storedDish, storedId); 
    }

    // Trigger animation on page load
    setMediaCardAnimation(true);
  }, []);

  const fetchRecipes = async (query, recipeId) => {
    setLoading(true);
    try {
      const response = await fetch('/api/recipegenerator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dish: query }), 
      });

      const jsonData = await response.json();
      if (jsonData.status === "Success") {
        const selectedRecipe = jsonData.message[Number(recipeId)]; 
        setRecipe(selectedRecipe); 
        setError(false);

        if (selectedRecipe.calories < 600) {
          setOpenDialog(true); 
        }
      } else {
        setRecipe(null); 
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching recipes.</div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
      {recipe && (
        <div style={{
          border: '6px solid #102820',
          borderRadius: '10px',
          marginLeft: '4vw',
          width: '60%',
          marginTop: '3%',
          backgroundColor: '#7c9c81',
          marginBottom:'10%',
        }}>
          <h1 style={{ display: 'flex', justifyContent: 'center' }}>{recipe.name}</h1>
          
          <div>
            <div style={{
              backgroundColor: '#425c46',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              width: '15%',
              height: '15%',
              borderRadius: '50%',
              marginLeft: '40%',
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.4)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ width: '60%', height: '50%', marginTop: '7%', marginLeft: '20%', justifyContent: 'center', display: 'flex' }}>
              <RecipeTable recipe={recipe} />
            </div>
          </div>

          <div>
            <div style={{ alignItems: 'center', alignContent: 'center' }}>
              <IngredientsTable recipe={recipe} style={{ margin: '0 auto', textAlign: 'left' }} />
              <div style={{ margin: '10% 10%' }}>
                <AccordionTransition />
              </div>
            </div>
          </div>
        </div>
      )}

      <div 
        style={{
          display: 'flex',
          alignItems: 'right',
          flexDirection: 'column',
          width: '100%',
          height: 'auto',
          alignItems: 'flex-start',
          position: 'fixed',
          marginTop: '3%',
          marginLeft: '75%',
          zIndex: 1000,
        }}
      >
        <div 
          style={{
            alignItems: 'left',
            backgroundColor: 'green',
            marginBottom: '3%',
            animation: mediaCardAnimation ? 'slideDown 1s ease-out' : 'none', // Trigger animation
          }}
        >
          <MediaCard videoUrl={'/images/food1.mp4'} />
        </div>
      </div>

      <ResponsiveDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
    </div>
  );
};

// Add the keyframes CSS for the slide down animation
const css = `
@keyframes slideDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

export default IndividualRecipe;