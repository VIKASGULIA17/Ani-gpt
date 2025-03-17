import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useContext } from "react";
import { Context } from "../context/Context";

const HomeCards = () => {
  const { setinput, onSent } = useContext(Context);

  const cards = [
    {
      question: "What is artificial intelligence?",
      description: "Learn about the basics of AI and its applications in modern technology."
    },
    {
      question: "How does machine learning work?",
      description: "Understand the fundamentals of machine learning and its various types."
    },
    {
      question: "What is deep learning?",
      description: "Explore the concepts of deep learning and neural networks."
    },
    {
      question: "What are the applications of AI?",
      description: "Discover real-world applications of artificial intelligence across different industries."
    }
  ];

  const handleCardClick = (question) => {
    setinput(question);
    onSent();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleCardClick(card.question)}
        >
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-800 font-medium mb-1">{card.question}</h3>
              <p className="text-sm text-gray-500">{card.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HomeCards; 