import { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../context/Context";  
import { motion } from "framer-motion";
import { AiOutlineLike } from "react-icons/ai";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { MdContentCopy } from "react-icons/md";
import Markdown from "react-markdown";
import { Bot, Rotate3d } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; 
import user_icon from "../assets/user_icon.png"; 
import SyntaxHighlighter from 'react-syntax-highlighter';import { atelierCaveLight, atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const LoadingDots = () => (
  <div className="flex items-center space-x-2">
    {[0, 150, 300].map((delay) => (
      <div
        key={delay}
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </div>
);

const ResultSection = ({ loading, resultData, recentPrompt, showTime }) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { setInput, onSent } = useContext(Context);
  const { isDarkMode } = useTheme();  
  const resultRef = useRef(null);

  // Only scroll to new result if it's the last one (active loading)
  useEffect(() => {
    if (loading && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSpeaking]);

  // Copy text handler
  const handleCopy = (text) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Text-to-speech handler
  const handleSpeak = (text) => {
    if (!text) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Regenerate prompt handler
  const handleRegenerate = () => {
    if (!recentPrompt) return;
    
    setInput(recentPrompt);
    
    // Add a small delay to ensure input is set before sending
    setTimeout(() => {
      onSent();
    }, 100);
  };

  // Like toggle handler
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
// Custom code renderer for markdown
const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  
  return !inline ? (
    <div className="rounded-md overflow-hidden my-2">
      <SyntaxHighlighter
        language={language || 'text'}
        style={isDarkMode ? atomOneDark : atelierCaveLight}
        className="!bg-gray-100 dark:!bg-gray-800 !p-4 !rounded-md"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
      {children}
    </code>
  );
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
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start gap-2 sm:gap-3">
            <img
              src={user_icon}
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
          <p className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">
            Assistant
          </p>
        </div>

        <motion.div
          className="w-full max-w-[85%] bg-white dark:bg-[#100f0f] rounded-2xl shadow-lg dark:shadow-purple-900/10 border border-gray-100 dark:border-gray-700/50 p-2 sm:p-4 overflow-scroll"
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-full">
            {loading ? (
              <LoadingDots />
            ) : (
              <Markdown
                className="text-[14px] sm:text-[15px] whitespace-pre-wrap break-words text-gray-800 dark:text-gray-200 leading-relaxed"
                components={{
                  code: CodeBlock
                }}
              >
                {resultData || ""}
              </Markdown>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-[#333333]">
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={handleLike} 
                className={`${isLiked ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'} transition-colors`}
              >
                <AiOutlineLike className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <button 
                onClick={() => handleSpeak(resultData)} 
                className={`${isSpeaking ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'} transition-colors`}
              >
                <HiOutlineSpeakerWave className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <button 
                onClick={() => handleCopy(resultData)} 
                className="text-gray-500 dark:text-gray-400 transition-colors"
              >
                {copied ? (
                  <span className="text-blue-500 text-xs">Copied!</span>
                ) : (
                  <MdContentCopy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                )}
              </button>
              <button 
                onClick={handleRegenerate} 
                className="text-gray-500 dark:text-gray-400"
              >
                <Rotate3d className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
            <span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">
              {showTime || new Date().toLocaleTimeString()}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResultSection;