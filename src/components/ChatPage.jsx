import { useContext, useRef, useEffect } from "react";
import { Context } from "../context/Context";
import { motion } from "framer-motion";
import ResultSection from "./ResultSection";
import BottomInputSection from "./BottomInputSection";
import { useTheme } from "../context/ThemeContext";
import { Bot } from "lucide-react";

const ChatPage = () => {
  const { 
    input, 
    setInput, 
    resultData, 
    loading, 
    recentPrompt,
    currentChat,
    onSent
  } = useContext(Context);

  const chatContainerRef = useRef(null);
  const { isDarkMode } = useTheme();

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentChat, loading, resultData]);

  // Function to handle the sending of the message
  const handleSend = () => {
    if (input.trim()) {
      // Let the Context provider handle all message processing and database operations
      onSent();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto scroll-smooth px-4 py-6 bg-white dark:bg-[#1E1E1E]"
      >
        <div className="max-w-4xl mx-auto">
          {(!currentChat || !currentChat.messages || currentChat.messages.length === 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              {/* Welcome message and instructions */}
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Bot className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                New Chat Started
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Ask me anything! I'm here to help with coding, learning, and problem-solving.
              </p>
            </motion.div>
          )}
          
          {/* Display current chat history */}
          {currentChat && currentChat.messages && currentChat.messages.length > 0 && (
            <>
              {currentChat.messages.map((message, index) => (
                <motion.div
                  key={`msg-${index}-${message.created_at || Date.now()}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ResultSection
                    loading={false}
                    resultData={message.response}
                    showTime={message.created_at ? new Date(message.created_at).toLocaleTimeString() : ''}
                    recentPrompt={message.prompt}
                  />
                </motion.div>
              ))}
            </>
          )}

          {/* Show loading indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ResultSection
                loading={true}
                resultData={resultData}
                recentPrompt={recentPrompt}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Section */}
      <BottomInputSection input={input} setInput={setInput} onSent={handleSend} onKeyPress={handleKeyPress} />
    </div>
  );
};

export default ChatPage;