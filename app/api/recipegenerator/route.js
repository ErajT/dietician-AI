import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        // Parse the JSON body from the request
        const { dish } = await req.json();

        console.log(dish);

        if (!dish) {
            return NextResponse.json({
                status: "Error",
                message: "Dish parameter is required",
            });
        }

        // Fetch data from the external API (Edamam)
        const apiResponse = await fetch(
            `https://api.edamam.com/api/recipes/v2?q=${dish}&app_id=26b2e150&app_key=c0257cc4bd0eb717b3c2886acfaf1b01&type=public`
        );

        if (!apiResponse.ok) {
            throw new Error("Edamam API not working");
        }

        // Parse the response from the API
        const data = await apiResponse.json();
        console.log(data);
        const hits = data["hits"];

        // Process each recipe and return the necessary details
        const result = hits.map(hit => {
            const recipe = hit.recipe;
      

            // Prepare the recipe details
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
                dishType: recipe.dishType,
                image: recipe.image
            };

            return recipeDetails;
         
        });

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
