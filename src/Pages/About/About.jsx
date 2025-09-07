import { motion } from "framer-motion";
import { FaBrain, FaRobot, FaMagic } from "react-icons/fa";
import { BsSpeedometer2 } from "react-icons/bs";
import { AiOutlineApi } from "react-icons/ai";

const About = () => {
  const features = [
    {
      icon: <FaBrain className="text-4xl text-blue-500" />,
      title: "Advanced AI",
      description: "Powered by cutting-edge artificial intelligence technology to provide intelligent and contextual responses."
    },
    {
      icon: <BsSpeedometer2 className="text-4xl text-green-500" />,
      title: "Fast & Efficient",
      description: "Lightning-fast response times and efficient processing to help you get answers quickly."
    },
    {
      icon: <FaRobot className="text-4xl text-purple-500" />,
      title: "Smart Assistant",
      description: "Your personal AI assistant that learns and adapts to your needs and preferences."
    },
    {
      icon: <FaMagic className="text-4xl text-yellow-500" />,
      title: "Creative Solutions",
      description: "Generate creative ideas, solve complex problems, and get innovative suggestions."
    },
    {
      icon: <AiOutlineApi className="text-4xl text-red-500" />,
      title: "Versatile API",
      description: "Built on powerful AI APIs to handle a wide range of tasks and queries effectively."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-[#1E1E1E] dark:to-[#242424] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">AniGPT</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your intelligent AI companion powered by advanced machine learning, designed to assist, create, and innovate alongside you.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-[#242424] rounded-xl shadow-lg dark:shadow-purple-900/10 p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-4xl font-bold mb-2">50+ </h4>
              <p className="text-lg">Users Worldwide</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-bold mb-2">500+</h4>
              <p className="text-lg">Queries Answered</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-bold mb-2">87%</h4>
              <p className="text-lg">Satisfaction Rate</p>
            </div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            To make advanced AI technology accessible to everyone, empowering users with intelligent solutions that enhance productivity, creativity, and learning.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 