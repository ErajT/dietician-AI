"use client"; // Mark the component as a client component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import ResponsiveDialog from '../../components/popup'; 
import RecipeTable from '../../components/recipedetails';
import IngredientsTable from '../../components/ingredients';
import '../../styling/recipegenerator.css';
import { Margin, Padding } from '@mui/icons-material';


const IndividualRecipe = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null); // Store the selected recipe
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dish, setDish] = useState(null);
  const [id, setId] = useState(null); // State for id
  const [openDialog, setOpenDialog] = useState(false); 
  const [isHovered, setIsHovered] = useState(false); 
  useEffect(() => {
    
    const storedDish = sessionStorage.getItem('dish');
    const storedId = sessionStorage.getItem('id'); 

    setDish(storedDish); 
    setId(storedId); // Set the id state

  
    console.log('Stored Dish:', storedDish);
    console.log('Stored ID:', storedId);

    
    if (storedDish && storedId) {
      fetchRecipes(storedDish, storedId); 
    }
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
      console.log('API Response:', jsonData); // Log the response

      if (jsonData.status === "Success") {
        const selectedRecipe = jsonData.message[Number(recipeId)]; // Get the recipe at the specified id
        setRecipe(selectedRecipe); // Set the selected recipe
        setError(false);

        // Check the calories and open the dialog if less than 600
        if (selectedRecipe.calories < 600) {
          setOpenDialog(true); 
        }

      } else {
        setRecipe(null); // Clear recipe if not successful
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Render loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching recipes.</div>;

  // Render recipe details
  return (
    <div >
      {recipe && (
        <div>
          <h1 style={{
             
  fontFamily: 'Poppins, sans-serif', 
  fontSize: '4em',  
  marginLeft:'10%',        
  color: '#102820',               
        
  alignItems : "center",
  justifyContent :"center",
  fontWeight: 'bold',     
           
}}>{recipe.name}</h1>


<div style={{ 
    display: 'flex', 
     
    alignItems: 'center', 

    backgroundColor:'#9cb5a1', 
    width: '100%',
    height:'50%'
}} >
 
<div style={{'width':'30%',marginLeft:'10%'}}>
    <RecipeTable recipe={recipe}  /></div>
  
  <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '30%', 
      height: '20%', 
      border: '10% solid red',
      marginLeft:'10%',
      backgroundColor:'#9cb5a1',
      padding:'2% 1%',
  }}>
    <img
                src={recipe.image}
                alt={recipe.name}
                style={{
                  width: '90%',
                  height: '90%',
                  transition: 'transform 0.3s ease', 
                  transform: isHovered ? 'scale(1.2)' : 'scale(1)', 
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} 
              /> {/* Recipe image */}
  </div>
</div>


        

<div style={{
    textAlign: 'left',
    padding: '0 10%',
     justifyContent:'left',
      justifyItems:'left',
      display:'flex',
      justifyContent:'flex-start',

      
}}>
  <h2 style={{
      fontFamily: 'Poppins, sans-serif',
      fontSize: '2em',
      color: '#102820',
      fontWeight: 'bold',
      marginBottom: '5%', // Optional: Add space below the heading
  }}>
    Ingredients:
  </h2>
  
  <div style={{
      display: 'block', 
      width: '100%',
      justifyContent:'left',
      justifyItems:'left',
      marginLeft:'-20%',
  }}>
    <IngredientsTable recipe={recipe} style={{ margin: '0 auto', textAlign: 'left' }} /> {/* Ensure the table is left-aligned */}
  </div>
</div>
            
            </div>
      )}

    
      <ResponsiveDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
    </div>
  );
};

export default IndividualRecipe;
