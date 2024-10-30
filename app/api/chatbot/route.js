import { NextResponse } from "next/server";

export async function POST(req){

    try{
        const {data} = await req.json()

        const flashcards = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer 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`,
             
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "meta-llama/llama-3.1-8b-instruct:free",
              "messages": [
                {"role": "user", "content": data},
                {"role": "system", "content": "Act as a query resolver for a health software solution named velora. this app contains features like recipe generation, meal plan generation, exercise plan generation, sleep, water, bmi and calorie trackers. you need to guide users on their queries accordingly. donot add any markdowns, bullets or list numbers in your response. also, keep your response short and concise."},
              ],
            })
          });
          
          const flashcardsRes = await flashcards.json();
          console.log(flashcardsRes)
        return NextResponse.json(flashcardsRes.choices[0].message.content);
    }
    catch(e){
        return NextResponse.json({error:e.message,status:500});

    }
}