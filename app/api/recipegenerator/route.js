import { NextResponse } from 'next/server';

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
            throw new Error("Failed to fetch recipes");
        }

        // Parse the response from the API
        const data = await apiResponse.json();

        // Log data and return the response
        // console.log(data["hits"][0]["recipe"]);

        const hits = data["hits"];
        
        const result = hits.map(hit => {
            const recipe = hit.recipe;
            
            // Extracting information from each recipe
            const name = recipe.label;
            const image = recipe.image; // Adjust the path as necessary based on the actual structure
            const ingredients = recipe.ingredients?.map(ingredient => ({
                name: ingredient.text,
                quantity: ingredient.quantity,
                unit: ingredient.measure,
                food: ingredient.food,
                weight: ingredient.weight,
                image: ingredient.image
            })) || [];
            
            return {
                name,
                image,
                ingredients,
                calories: recipe.calories,
                totalCO2Emissions: recipe.totalCO2Emissions,
                co2EmissionsClass: recipe.co2EmissionsClass,
                totalWeight: recipe.totalWeight,
                totalTime: recipe.totalTime,
                cuisineType: recipe.cuisineType,
                mealType: recipe.mealType,
                dishType: recipe.dishType
            };
        });
        
        // console.log(result);


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
