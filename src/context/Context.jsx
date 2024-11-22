import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setinput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setshowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const onSent = async () => {
        try {
            // Reset result state
            setResultData("");
            setLoading(true);
            setshowResult(true);

            // Update prompt history
            setRecentPrompt(input);
            setPrevPrompt((prev) => [...prev, input]);

            // Fetch response
            const response = await run(input);
            if (!response) throw new Error("No response received");

            // Split and format response
            const responseParts = response.split("'''");
            let formattedResponse = "";

            responseParts.forEach((part, index) => {
                if (index % 2 === 1) {
                    // Wrap code blocks
                    formattedResponse += `<pre><code>${part}</code></pre>`;
                } else {
                    // Format regular text
                    formattedResponse += part
                        .split("**")
                        .map((chunk, i) =>
                            i % 2 === 1 ? `<b>${chunk}</b>` : chunk
                        )
                        .join("")
                        .replace(/\*/g, "<br>")
                        .replace(/## /g, "<br>");
                }
            });

            // Split formatted response into words for animation
            const words = formattedResponse.split(" ");
            words.forEach((word, index) => {
                delayPara(index, word + " ");
            });

            setLoading(false);
            setinput("");
        } catch (error) {
            console.error("Error handling response:", error);
            setLoading(false);
            setResultData("An error occurred. Please try again.");
        }
    };

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
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
