import { createContext, useState } from "react";
import run from "../config/gemini"; // Import the API function

export const Context = createContext();

const ContextProvider = (props) => {
  // Define states
  const [input, setinput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Function to handle delay for the animation
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  // onSent function to handle prompt submission
  const onSent = async () => {
    try {
      setResultData(""); 
      setLoading(true); 
      setshowResult(true);

      setRecentPrompt(input);
      setPrevPrompt((prev) => [...prev, input]);

      const response = await run(input); // Call the API
      if (!response) throw new Error("No response received");

      // Display each word in the formatted response with animation
      const words = response.split(" ");
      words.forEach((word, index) => {
        delayPara(index, word + " ");
      });
      setResultData(response); // Update the result data
      setLoading(false); // Hide loading indicator
      setinput(""); // Clear input field
    } catch (error) {
      console.error("Error handling response:", error);
      setLoading(false);
      setResultData("An error occurred. Please try again.");
    }
  };

  // Context value to share states and functions
  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setinput
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children} {/* Render child components */}
    </Context.Provider>
  );
};

export default ContextProvider;
