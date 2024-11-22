/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from"@google/generative-ai";

const apiKey = "AIzaSyCa4xt14b9w2W0WM5hyPvC8zB1OHZ2ysJ0";

const genAI = new GoogleGenerativeAI(apiKey);

async function run(prompt) {
  try {
    const model = await genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [], // You can populate this array with previous messages if needed
    });

    const result = await chatSession.sendMessage(prompt);  // Replace with actual input
    // console.log(result.response.text());
    return result.response.text();  // Ensure correct response access based on the SDK's response structure

  } catch (error) {
    console.error("Error in running the Generative AI model:", error);
  }
}

export default run;
