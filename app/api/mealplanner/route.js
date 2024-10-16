// import { NextResponse } from 'next/server';

// async function getImageUrl(query) {
//     const apiKey = "AIzaSyBTaYcyfnNgv04OQvOq4FceAro7I_BKqqU";
//     const cx = "615fb40a2ff514034"; // Replace with your actual Search Engine ID (cx)
//     const url = `https://customsearch.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}&searchType=image&num=1`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         if (data.items && data.items.length > 0) {
//             return data.items[0].link; // Return the first image result
//         }
//         return null;
//     } catch (error) {
//         console.error("Error fetching image:", error);
//         return null;
//     }
// }

// // async function generateMealPlan(userDetails) {
// //     const content = `Act as a nutritionist and return a weekly meal plan.
// //         Each day of the week should be a key in the response object, and the value should be a list of meals for that day.
// //         Consider the user's preferences for age: ${userDetails.age}, gender: ${userDetails.gender},
// //         meals per day: ${userDetails.mealsPerDay}, and diet type: ${userDetails.dietType}.
// //         Also return the quantities with the ingredients of the meal. Only return the JSON object with no additional text.`;


// //     try {
// //         const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
// //             method: "POST",
// //             headers: {
// //                 "Authorization": `Bearer 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`,
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify({
// //                 "model": "meta-llama/llama-3.1-8b-instruct:free",
// //                 "messages": [
// //                     { "role": "user", "content": JSON.stringify(userDetails) },
// //                     { "role": "system", "content": content },
// //                 ]
// //             })
// //         });

// //         if (!response.ok) {
// //             throw new Error("Failed to generate meal plan");
// //         }

// //         const result = await response.json();
// //         let mealPlan = result.choices[0].message.content;

// //         // Parse the meal plan JSON string if necessary
// //         let jsonStringMatch = mealPlan.match(/\{[\s\S]*\}/);
// //         let jsonString = jsonStringMatch ? jsonStringMatch[0] : null;

// //         if (jsonString) {
// //             // Clean up the string: remove any newlines, backticks, escaped newlines, and escaped quotes
// //             jsonString = jsonString.replace(/[\r\n]+/g, '').trim();
// //             jsonString = jsonString.replace(/`/g, '').trim();
// //             jsonString = jsonString.replace(/\\n/g, '').replace(/\\"/g, '"').trim(); // Replace escaped quotes correctly

// //             try {
// //                 // Parse the cleaned string into JSON
// //                 mealPlan = JSON.parse(jsonString);
// //             } catch (error) {
// //                 console.error("Error parsing meal plan JSON:", error);
// //                 throw new Error("Invalid meal plan format received");
// //             }
// //         } else {
// //             throw new Error("No valid JSON found in the response");
// //         }

// //         // Ensure mealPlan is an object before proceeding
// //         if (typeof mealPlan !== "object" || mealPlan === null) {
// //             throw new Error("Invalid meal plan structure");
// //         }

// //         // Console log the meal plan for Monday
// //         console.log(mealPlan["Monday"]);

// //         // Fetch images for each meal
// //         for (const day in mealPlan) {
// //             console.log(day); // Log the current day
// //             const meals = mealPlan[day];
// //             for (const meal of meals) {
// //                 const imageUrl = await getImageUrl(meal.meal); // Correct usage of 'meal.meal' for querying images
// //                 meal.image = imageUrl || "No image available"; // Add image URL to meal
// //             }
// //         }

// //         return mealPlan;
// //     } catch (error) {
// //         console.error("Error generating meal plan:", error);
// //         return NextResponse.json({
// //             status: "Error",
// //             message: "Could not generate meal plan",
// //         });
// //     }
// // }


// async function generateMealPlan(userDetails) {
//     const content = `Act as a nutritionist and return a weekly meal plan.
//         Each day of the week should be a key in the response object, and the value should be a list of meals for that day.
//         Consider the user's preferences for age: ${userDetails.age}, gender: ${userDetails.gender},
//         meals per day: ${userDetails.mealsPerDay}, and diet type: ${userDetails.dietType}.
//         Also return the quantities with the ingredients of the meal. Only return the JSON object with no additional text.`;

//     try {
//         const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer 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`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 "model": "meta-llama/llama-3.1-8b-instruct:free",
//                 "messages": [
//                     { "role": "user", "content": JSON.stringify(userDetails) },
//                     { "role": "system", "content": content },
//                 ]
//             })
//         });

//         if (!response.ok) {
//             throw new Error("Failed to generate meal plan");
//         }

//         const result = await response.json();
//         let mealPlan = result.choices[0].message.content;

//         // Parse the meal plan JSON string if necessary
//         let jsonStringMatch = mealPlan.match(/\{[\s\S]*\}/);
//         let jsonString = jsonStringMatch ? jsonStringMatch[0] : null;

//         if (jsonString) {
//             // Clean up the string: remove any newlines, backticks, escaped newlines, and escaped quotes
//             jsonString = jsonString.replace(/[\r\n]+/g, '').trim();
//             jsonString = jsonString.replace(/`/g, '').trim();
//             jsonString = jsonString.replace(/\\n/g, '').replace(/\\"/g, '"').trim(); // Replace escaped quotes correctly

//             try {
//                 // Parse the cleaned string into JSON
//                 mealPlan = JSON.parse(jsonString);
//             } catch (error) {
//                 console.error("Error parsing meal plan JSON:", error);
//                 throw new Error("Invalid meal plan format received");
//             }
//         } else {
//             throw new Error("No valid JSON found in the response");
//         }

//         // Ensure mealPlan is an object before proceeding
//         if (typeof mealPlan !== "object" || mealPlan === null) {
//             throw new Error("Invalid meal plan structure");
//         }

//         // Fetch images for each meal
//         for (const day in mealPlan) {
//             const meals = mealPlan[day];
//             for (const meal of meals) {
//                 const imageUrl = await getImageUrl(meal.meal); // Fetch image URL for each meal
//                 meal.image = imageUrl || "No image available"; // Add image URL to meal
//             }
//         }

//         return mealPlan;
//     } catch (error) {
//         console.error("Error generating meal plan:", error);
//         return NextResponse.json({
//             status: "Error",
//             message: "Could not generate meal plan",
//         });
//     }
// }


// export async function POST(req) {
//     try {
//         const userData = await req.json();
//         const mealPlan = await generateMealPlan(userData);

//         return NextResponse.json({
//             status: "Success",
//             mealPlan, // Send the modified meal plan with images
//         });
//     } catch (e) {
//         console.error("Error generating meal plan:", e.message);
//         return NextResponse.json({
//             status: "Error",
//             message: "Could not generate meal plan",
//         });
//     }
// }



import { NextResponse } from 'next/server';

// Function to get an image URL for a meal
async function getImageUrl(query) {
    const apiKey = "YOUR_API_KEY";
    const cx = "YOUR_CX_ID"; // Replace with your actual Search Engine ID
    const url = `https://customsearch.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}&searchType=image&num=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        if (data.items && data.items.length > 0) {
            return data.items[0].link; // Return the first image result
        }

        console.log("No images found for query:", query);
        return null; // Return null if no images found
    } catch (error) {
        console.error("Error fetching image:", error);
        return null; // Return null on error
    }
}

// Function to generate a meal plan based on user details
async function generateMealPlan(userDetails) {
    const content = `Act as a nutritionist and return a weekly meal plan.
        Each day of the week should be a key in the response object, and the value should be a list of meals for that day.
        Consider the user's preferences for age: ${userDetails.age}, gender: ${userDetails.gender},
        meals per day: ${userDetails.mealsPerDay}, and diet type: ${userDetails.dietType}.
        Also return the quantities with the ingredients of the meal. Only return the JSON object with no additional text.`;

    try {
        console.log("API START")
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer YOUR_API_KEY`, // Update with your actual API key
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "meta-llama/llama-3.1-8b-instruct:free",
                "messages": [
                    { "role": "user", "content": JSON.stringify(userDetails) },
                    { "role": "system", "content": content },
                ]
            })
        });
        console.log("API DONE")

        if (!response.ok) {
            throw new Error("Failed to generate meal plan");
        }

        const result = await response.json();
        let mealPlan = result.choices[0].message.content;

        // Parse the meal plan JSON string if necessary
        let jsonStringMatch = mealPlan.match(/\{[\s\S]*\}/);
        let jsonString = jsonStringMatch ? jsonStringMatch[0] : null;

        if (jsonString) {
            // Clean up the string
            jsonString = jsonString.replace(/[\r\n]+/g, '').trim();
            jsonString = jsonString.replace(/`/g, '').trim();
            jsonString = jsonString.replace(/\\n/g, '').replace(/\\"/g, '"').trim();

            try {
                mealPlan = JSON.parse(jsonString);
            } catch (error) {
                console.error("Error parsing meal plan JSON:", error);
                throw new Error("Invalid meal plan format received");
            }
        } else {
            throw new Error("No valid JSON found in the response");
        }

        // Ensure mealPlan is an object before proceeding
        if (typeof mealPlan !== "object" || mealPlan === null) {
            throw new Error("Invalid meal plan structure");
        }

        // Fetch images for each meal
        for (const day in mealPlan) {
            const meals = mealPlan[day];
            for (const meal of meals) {
                const imageUrl = await getImageUrl(meal.name || meal.meal); // Fetch image URL for each meal
                if (imageUrl) {
                    meal.image = imageUrl; // Assign only if valid
                } else {
                    meal.image = "fallback_image_url"; // Use a fallback image URL if needed
                }
            }
        }

        return mealPlan;
    } catch (error) {
        console.error("Error generating meal plan:", error);
        return NextResponse.json({
            status: "Error",
            message: "Could not generate meal plan",
        });
    }
}


// API endpoint to handle POST requests for meal plan generation
export async function POST(req) {
    try {
        const userData = await req.json();
        const mealPlan = await generateMealPlan(userData);

        return NextResponse.json({
            status: "Success",
            mealPlan, // Send the modified meal plan with images
        });
    } catch (e) {
        console.error("Error generating meal plan:", e.message);
        return NextResponse.json({
            status: "Error",
            message: "Could not generate meal plan",
        });
    }
}
