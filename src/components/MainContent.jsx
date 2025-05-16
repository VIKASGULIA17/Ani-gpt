import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useContext } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { Bot, Sparkles, MessageSquare, Code } from "lucide-react";

const FeatureCard = ({ title, description, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white dark:bg-[#242424] rounded-xl shadow-lg dark:shadow-purple-900/10 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

const MainContent = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { startNewChat } = useContext(Context);

  const features = [
    {
      title: "AI-Powered Responses",
      description: "Get intelligent and context-aware responses powered by advanced AI technology.",
      icon: <Bot className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Code Generation",
      description: "Generate high-quality code snippets and solutions in multiple programming languages.",
      icon: <Code className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Natural Language Processing",
      description: "Understand and process human language naturally for better communication.",
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />
    }
  ];

  const handleStartNewChat = () => {
    startNewChat();
    navigate('/new-chat');
  };
  const handleLearnMore = () => {
    // Logic to navigate to the learn more page
    navigate('/about');
  };
  return (
    <div className="flex-1 overflow-y-auto scroll-smooth px-4 py-6 bg-white dark:bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Bot className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">AniGPT</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your intelligent AI companion for coding, learning, and problem-solving.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Getting Started Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-[#1E1E1E] dark:to-[#242424] rounded-2xl p-8 shadow-lg dark:shadow-purple-900/10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Begin your journey with AniGPT by starting a new conversation or exploring our features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleStartNewChat}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center text-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Start New Chat
              </button>
              <button
              onClick={handleLearnMore}
               className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainContent;
