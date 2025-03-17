/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing Gemini API key. Please check your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

async function run(prompt) {
  if (!prompt) {
    throw new Error("Prompt is required");
  }

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

    const result = await chatSession.sendMessage(prompt);
    const response = result.response.text();
    
    if (!response) {
      throw new Error("No response received from the model");
    }

    return response;

  } catch (error) {
    console.error("Error in running the Generative AI model:", error);
    throw new Error("Failed to process your request. Please try again.");
  }
}

export default run;
