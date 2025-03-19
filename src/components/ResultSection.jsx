import { useState, useRef, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { MdContentCopy } from "react-icons/md";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight, atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Markdown from "react-markdown";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { Context } from "../context/Context";
import { Bot } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ResultSection = ({ loading, resultData, showTime, recentPrompt, setHiddenDiv, HiddenDiv }) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { onSent, setinput } = useContext(Context);
  const { isDarkMode } = useTheme();
  const resultRef = useRef(null);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [resultData, loading]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRegenerate = () => {
    setinput(recentPrompt);
    onSent();
  };

  const handleQuestionClick = (question) => {
    setinput(question);
    onSent();
  };

  return (
    <motion.div
      className="w-full max-w-[95vw] mx-auto mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* User Message */}
      <motion.div
        className="flex flex-col items-end mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <motion.div 
          className="w-full max-w-[85%] bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleQuestionClick(recentPrompt)}
        >
          <div className="flex items-start gap-2 sm:gap-3">
            <img
              src={assets.user_icon}
              alt="User"
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white mt-1 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] sm:text-[15px] break-words leading-relaxed">
                {recentPrompt}
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="mt-1"
        >
          <FaEdit
            onClick={(e) => {
              e.stopPropagation();
              setHiddenDiv(!HiddenDiv);
            }}
            className="cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-purple-400 transition-colors"
          />
        </motion.div>
      </motion.div>

      {/* AI Response */}
      <motion.div
        ref={resultRef}
        className="flex flex-col items-start"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-purple-400" />
          <p className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">Assistant</p>
        </div>
        
        <motion.div 
          className="w-full max-w-[85%] bg-white dark:bg-[#242424] rounded-2xl shadow-lg dark:shadow-purple-900/10 border border-gray-100 dark:border-gray-700/50 p-2 sm:p-4"
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-full">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            ) : (
              <Markdown
                className="text-[14px] sm:text-[15px] whitespace-pre-wrap break-words text-gray-800 dark:text-gray-200 leading-relaxed"
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const isCodeBlock = !inline && match;

                    return isCodeBlock ? (
                      <motion.div 
                        className="relative group my-2 sm:my-3 w-full"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative w-full">
                          <motion.button
                            onClick={() => handleCopy(children)}
                            className="absolute top-1 right-1 bg-gray-100 dark:bg-[#1E1E1E] text-gray-700 dark:text-gray-300 p-1 sm:p-1.5 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-[#2D2D2D]"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {copied ? "Copied!" : <MdContentCopy className="w-3 h-3"/>}
                          </motion.button>
                          <div className="w-full overflow-x-auto">
                            <div className="w-full">
                              <SyntaxHighlighter
                                language={match[1]}
                                style={isDarkMode ? atomOneDark : atelierCaveLight}
                                PreTag="div"
                                customStyle={{
                                  borderRadius: "0.5rem",
                                  padding: "0.75rem",
                                  margin: "0.25rem 0",
                                  backgroundColor: isDarkMode ? "#1E1E1E" : "#f8fafc",
                                  border: `1px solid ${isDarkMode ? "#333333" : "#e2e8f0"}`,
                                  fontSize: "0.875rem",
                                  overflowX: "auto",
                                  maxWidth: "100%",
                                  width: "100%",
                                  whiteSpace: "pre-wrap",
                                  wordBreak: "break-word",
                                  overflowWrap: "break-word"
                                }}
                                {...props}
                              >
                                {String(children).trim()}
                              </SyntaxHighlighter>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <code className="bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded text-sm font-mono break-all dark:text-gray-200" {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {resultData}
              </Markdown>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-[#333333]">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-purple-400 transition-colors"
              >
                <AiOutlineLike className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSpeak(resultData)}
                className={`text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-purple-400 transition-colors ${isSpeaking ? 'text-blue-500 dark:text-purple-400' : ''}`}
              >
                <HiOutlineSpeakerWave className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleCopy(resultData)}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-purple-400 transition-colors"
              >
                {copied ? "Copied!" : <MdContentCopy className="w-3 h-3 sm:w-3.5 sm:h-3.5"/>}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRegenerate}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-purple-400 transition-colors"
              >
                <img
                  src={assets.Rotate_arrow}
                  alt="Regenerate"
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 dark:invert"
                />
              </motion.button>
            </div>
            <span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">
              {showTime}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResultSection;
