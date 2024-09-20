import { NextResponse } from 'next/server';

async function generateMealPlan(userDetails) {
  const content = "Act as a nutritionist and return a weekly meal plan. Each day of the week should be a key in the response object, and the value should be a list of meals for that day. Consider the user's preferences for the number of meals per day, the time they want to eat, and their dietary restrictions. Only return the JSON object with no additional text.";

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
                  { "role": "user", "content": JSON.stringify(userDetails) },
                  { "role": "system", "content": content },
              ]
          })
      });

      if (!response.ok) {
          throw new Error("Failed to generate meal plan");
      }

      const result = await response.json();
      console.log("Meal plan response:", result);
      return result.choices[0].message.content;
  } catch (error) {
      return NextResponse.json({
          status: "Error",
          message: "Could not generate meal plan",
      });
  }
}

export async function POST(req) {
    try {
        const userData = await req.json();
        const mealPlan = await generateMealPlan(userData);

        return NextResponse.json({
            status: "Success",
            mealPlan: JSON.parse(mealPlan), // Parse the LLM response into JSON
        });
    } catch (e) {
        console.error("Error generating meal plan:", e.message);
        return NextResponse.json({
            status: "Error",
            message: "Could not generate meal plan",
        });
    }
}
