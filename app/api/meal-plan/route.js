// export async function POST(req, res) {
//     try {
//       const { calories, healthRestrictions, ingredients } = await req.json();
  
//       // Validate inputs
//       if (!calories || isNaN(calories)) {
//         return new Response(
//           JSON.stringify({ error: 'Calories must be a valid number.' }),
//           { status: 400 }
//         );
//       }
  
//       if (!ingredients || ingredients.length === 0) {
//         return new Response(
//           JSON.stringify({ error: 'Ingredients are required.' }),
//           { status: 400 }
//         );
//       }
  
//       // Use the API key stored in the environment variable
//       const apiKey = process.env.MEAL_PLAN_API_KEY;
//       const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${ingredients}&number=1&maxCalories=${calories}&diet=${healthRestrictions}`;
  
//       const apiResponse = await fetch(apiUrl, {
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//         },
//       });
  
//       if (!apiResponse.ok) {
//         throw new Error('Failed to fetch meal plan from external API');
//       }
  
//       const mealPlan = await apiResponse.json();
//       return new Response(JSON.stringify(mealPlan), { status: 200 });
      
//     } catch (error) {
//       console.error('Error fetching meal plan:', error);
//       return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//         status: 500,
//       });
//     }
//   }
  
import { NextResponse } from 'next/server';

// Fetch meal plan from Spoonacular API
export async function POST(req) {
    try {
        // Parse the input data from the request body
        const { calories, diet, exclude } = await req.json();

        // Validate the input
        if (!calories) {
            return NextResponse.json({ error: 'Calories are required.' }, { status: 400 });
        }

        // Build the request URL for Spoonacular's meal plan generator
        const apiKey = process.env.SPOONACULAR_API_KEY;
        const apiUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${calories}&diet=${diet}&exclude=${exclude}`;

        // Fetch the meal plan from Spoonacular API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch meal plan');
        }

        // Parse the response data
        const data = await response.json();

        // Return the meal plan as JSON
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}

