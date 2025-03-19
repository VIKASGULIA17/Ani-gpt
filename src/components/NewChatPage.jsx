import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Bot, Sparkles, MessageSquare, Send } from "lucide-react";

const NewChatPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth px-4 py-6 bg-white dark:bg-[#1E1E1E]">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Message */}
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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Code Generation</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Generate code snippets and solutions in multiple programming languages
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <MessageSquare className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Chat Assistant</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Get help with explanations, debugging, and general questions
            </p>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="fixed bottom-8 left-0 right-0 max-w-4xl mx-auto px-4"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Type your message here..."
              className="w-full p-4 pr-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewChatPage; 