import { useContext, useRef, useEffect } from "react";
import { Context } from "../context/Context";
import { motion } from "framer-motion";
import { Bot, Send } from "lucide-react";
import ResultSection from "./ResultSection";

const ChatPage = () => {
  const { 
    input, 
    setinput, 
    resultData, 
    loading, 
    showResult, 
    recentPrompt, 
    setHiddenDiv, 
    HiddenDiv,
    onSent,
    currentChat
  } = useContext(Context);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentChat, loading, resultData]);

  const handleSend = () => {
    if (input.trim()) {
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
          {!showResult && !currentChat && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
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
          
          {currentChat && (
            <>
              {currentChat.messages.map((message, index) => (
                <motion.div
                  key={message.timestamp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ResultSection
                    loading={false}
                    resultData={message.response}
                    showTime={new Date(message.timestamp).toLocaleTimeString()}
                    recentPrompt={message.prompt}
                    setHiddenDiv={setHiddenDiv}
                    HiddenDiv={HiddenDiv}
                  />
                </motion.div>
              ))}
            </>
          )}
          
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
                setHiddenDiv={setHiddenDiv}
                HiddenDiv={HiddenDiv}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setinput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-4 pr-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`absolute right-2 p-2 rounded-lg transition-all duration-200 ${
                input.trim()
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  : "bg-gradient-to-r from-blue-400 to-purple-400 text-white/50 cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 