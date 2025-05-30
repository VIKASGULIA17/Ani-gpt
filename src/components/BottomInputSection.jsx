import { useState } from "react";
import { Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const BottomInputSection = ({ onSent, setInput, input }) => {
  const [isListening, setIsListening] = useState(false);

  const handleMicClick = async () => {
    try {
      if (!isListening) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(prev => prev + ' ' + transcript);
          setIsListening(false);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        setIsListening(true);
      }
    } catch (error) {
      console.error('Speech recognition not supported:', error);
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      onSent();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-1">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="px-6 py-6 h-12 lg:h-14 pr-12 lg:pr-16 text-base lg:text-lg rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-700 focus:border-blue-200 dark:focus:border-purple-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-2 focus:ring-blue-100 dark:focus:ring-purple-300 focus:outline-none focus-visible:outline-none transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Button
              size="icon"
              variant={isListening ? "default" : "ghost"}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full dark:hover:bg-gray-700"
              onClick={handleMicClick}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center"
              >
                <Mic
                  className={`h-5 w-5 ${isListening
                    ? 'text-red-500 animate-pulse'
                    : 'text-gray-500 dark:text-gray-400'
                  }`}
                />
              </motion.div>
              <span className="sr-only">
                {isListening ? 'Stop listening' : 'Start voice input'}
              </span>
            </Button>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="icon"
              variant="default"
              onClick={handleSend}
              disabled={!input.trim()}
              className="h-12 w-12 lg:h-14 lg:w-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-200 dark:shadow-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-6 w-6 text-white" />
              <span className="sr-only">Send message</span>
            </Button>
          </motion.div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};

export default BottomInputSection;
