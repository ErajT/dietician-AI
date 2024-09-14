import { NextResponse } from 'next/server';

// Helper function to fetch recipe instructions from OpenRouter API
async function getRecipeInstructions(recipeDetails) {
    const content = "Act as a chef and return a list of steps needed to create the dish using the ingredients specified, don't include any introduction or conclusion, just return the list with all of the steps.";
    
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer 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`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "meta-llama/llama-3.1-8b-instruct:free",
                "messages": [
                    { "role": "user", "content": JSON.stringify(recipeDetails) },
                    { "role": "system", "content": content },
                ]
            })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch recipe instructions");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching recipe instructions:", error.message);
        return null;
    }
}

export async function POST(req, res) {
    try {
        // Parse the JSON body from the request
        const { dish } = await req.json();

        if (!dish) {
            return NextResponse.json({
                status: "Error",
                message: "Dish parameter is required",
            });
        }

        // Fetch data from the external API
        const apiResponse = await fetch(
            `https://api.edamam.com/api/recipes/v2?q=${dish}&app_id=26b2e150&app_key=c0257cc4bd0eb717b3c2886acfaf1b01&type=public`
        );
        
        if (!apiResponse.ok) {
            throw new Error("Edamam API not working");
        }

        // Parse the response from the API
        const data = await apiResponse.json();
        const hits = data["hits"];


        // Process each recipe and fetch instructions for it
        const result = await Promise.all(hits.map(async (hit) => {
            const recipe = hit.recipe;

            // Prepare the entire recipe details to pass to the getRecipeInstructions function
            const recipeDetails = {
                name: recipe.label,
                ingredients: recipe.ingredients?.map(ingredient => ({
                    name: ingredient.text,
                    weight: ingredient.weight,
                    image: ingredient.image
                })) || [],
                calories: recipe.calories,
                totalWeight: recipe.totalWeight,
                totalTime: recipe.totalTime,
                cuisineType: recipe.cuisineType,
                mealType: recipe.mealType,
                dishType: recipe.dishType
            };

            // Fetch instructions using the recipe details
            const instructions = await getRecipeInstructions(recipeDetails);
            // console.log(instructions["choices"][0]["message"]["content"]);

            return {
                ...recipeDetails, // Spread the recipe details object
                image: recipe.image,
                recipeInstructions: instructions["choices"][0]["message"]["content"], // Add the generated instructions here
            };
        }));

        // Return the final result
        return NextResponse.json({
            status: "Success",
            message: result,
        });
    } catch (e) {
        console.error("Error fetching recipes:", e.message);
        return NextResponse.json({
            status: "Error",
            message: "Could not generate recipe",
        });
    }
}
