import ResultSection from './ResultSection';
import { assets } from "../assets/assets";
import { Card } from "@/components/ui/card";
import Markdown from 'react-markdown';
import { useContext, useEffect, useRef } from 'react';
import { Context } from '../context/Context';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, History, Lightbulb } from 'lucide-react';
import HomeCards from "./HomeCards";

const MainContent = ({ showResult, resultData, loading, showTime, recentPrompt, setHiddenDiv, HiddenDiv }) => {
  const { chatHistory, selectedChat, currentChat } = useContext(Context);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);
  
  const suggestions = [
    {
      text: "Show me how to build something by hand",
      icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
      description: "Get step-by-step instructions for DIY projects"
    },
    {
      text: "Show the most important emails in my inbox",
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
      description: "Organize and prioritize your emails"
    },
    {
      text: "Summarize the major events of the Cold War.",
      icon: <History className="w-6 h-6 text-purple-500" />,
      description: "Get concise historical summaries"
    },
    {
      text: "Brainstorm presentation ideas about a topic",
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      description: "Generate creative ideas and concepts"
    },
  ];

  return (
    <Card
      className={`w-full h-[79vh] lg:h-[75vh] shadow-lg shadow-zinc-300 rounded-2xl ${
        !showResult && !selectedChat ? "bg-gradient-to-b from-gray-50 to-white" : "bg-white"
      } flex flex-col overflow-hidden`}
    >
      <AnimatePresence mode="wait">
        {showResult || selectedChat ? (
          <motion.div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto scroll-smooth px-4 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col max-w-4xl mx-auto">
              {selectedChat ? (
                <>
                  {selectedChat.messages.map((message, index) => (
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
              ) : (
                <ResultSection
                  loading={loading}
                  resultData={resultData}
                  showTime={showTime}
                  recentPrompt={recentPrompt}
                  setHiddenDiv={setHiddenDiv}
                  HiddenDiv={HiddenDiv}
                />
              )}
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to AI Chat</h1>
            <p className="text-gray-500 mb-8">Ask me anything or try one of these questions</p>
            <HomeCards />
          </div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default MainContent;
