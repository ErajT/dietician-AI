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
        console.log(result);
        console.log(result.choices[0].message.content);
        console.log("genAI response");
        return result;
    } catch (error) {
        // console.error("Error fetching recipe instructions:", error.message);
        return NextResponse.json({
            status: "Error",
            message: "Could not generate recipe",
        });
    }
}

export async function POST(req, res) {
    try {
        // Parse the JSON body from the request
        const { recipeDetails } = await req.json();

            const instructions = await getRecipeInstructions(recipeDetails);
            console.log("recipe instructions gotten")
            console.log(instructions);

        // Return the final result
        return NextResponse.json({
            status: "Success",
            message: instructions,
        });
    } catch (e) {
        console.error("Error fetching recipes:", e.message);
        return NextResponse.json({
            status: "Error",
            message: "Could not generate recipe",
        });
    }
}
