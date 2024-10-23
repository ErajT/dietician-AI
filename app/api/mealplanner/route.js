import { NextResponse } from 'next/server';


async function generateMealPlan(mealDetails) {
    // console.log(mealDetails);

        if (!mealDetails) {
            return NextResponse.json({
                status: "Error",
                message: "All parameters are required",
            });
        }

        const diet = mealDetails.diet;
        const health = mealDetails.health;
        const cuisineType = mealDetails.cuisineType;
        const mealType = mealDetails.mealType;
        const calories = mealDetails.calories;
        const excluded = mealDetails.excluded;

        let allother = '';

        // Diet (array)
        if (diet && diet.length > 0) {
        diet.forEach(item => {
            allother += `&diet=${encodeURIComponent(item)}`;
        });
        }

        // Health (array)
        if (health && health.length > 0) {
        health.forEach(item => {
            allother += `&health=${encodeURIComponent(item)}`;
        });
        }

        // Cuisine Type (array)
        if (cuisineType && cuisineType.length > 0) {
        cuisineType.forEach(item => {
            allother += `&cuisineType=${encodeURIComponent(item)}`;
        });
        }

        // Meal Type (string)
        if (mealType) {
        allother += `&mealType=${encodeURIComponent(mealType)}`;
        }

        // Calories (string/number)
        if (calories) {
        allother += `&calories=${encodeURIComponent(calories)}`;
        }

        // Excluded (string)
        if (excluded) {
        allother += `&excluded=${encodeURIComponent(excluded)}`;
        }

        // console.log(allother);

        // Fetch data from the external API
        const apiResponse = await fetch(
            `https://api.edamam.com/api/recipes/v2?type=public&app_id=96d9dd87&app_key=45d8152fa5e12eb7e048665a448bbfd7${allother}`
        );
           
        if (!apiResponse.ok) {
            throw new Error("Edamam API not working");
        }

        // Parse the response from the API
        const data = await apiResponse.json();
        // console.log(data);
        const hits = data["hits"];
        console.log(hits);


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

            return {
                ...recipeDetails, // Spread the recipe details object
                image: recipe.image,
            };
        }));
        return result;
    }

export async function POST(req) {
    try {
        const mealData = await req.json();

        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const mealPlanResult = {};  // To store the final result with meal plans for each day
        const mealPlans = {};  // To store generated meal plans for each cuisine type

        // For each meal type in mealData, generate a meal plan
        for (let j = 0; j < mealData.mealType.length; j++) {
            const mealType = mealData.mealType[j];

            // Clone the meal data and update the mealType for this iteration
            const mealDetailsForDay = { ...mealData, mealType };

            // Call the generateMealPlan function with the updated mealDetails
            const mealPlan = await generateMealPlan(mealDetailsForDay);

            // Save the generated meal plan for the current meal type in the mealPlans object
            mealPlans[mealType] = mealPlan;  // Store the meal plan for each mealType (e.g., Breakfast, Lunch, etc.)
        }

        // Iterate over the days of the week and assign meal plans for each day
        for (let i = 0; i < daysOfWeek.length; i++) {
            const day = daysOfWeek[i];
            mealPlanResult[day] = {};  // Initialize the object for the current day

            // For each meal type, assign the corresponding meal plan for the current day
            for (let j = 0; j < mealData.mealType.length; j++) {
                const mealType = mealData.mealType[j];

                // Assign the ith meal plan from the generated meal plans (e.g., first recipe on Monday, second on Tuesday)
                if (mealPlans[mealType] && mealPlans[mealType].length > i) {
                    mealPlanResult[day][mealType] = mealPlans[mealType][i];
                } else {
                    mealPlanResult[day][mealType] = "No result found";  // Fallback if there are not enough results
                }
            }
        }

        console.log(mealPlanResult);


        return NextResponse.json({
            status: "Success",
            mealPlan: mealPlanResult,
        });

    } catch (e) {
        console.error("Error generating meal plan:", e.message);
        return NextResponse.json({
            status: "Error",
            message: "Could not generate meal plan",
        });
    }
}
