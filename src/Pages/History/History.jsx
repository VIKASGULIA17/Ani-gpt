import { useContext } from "react";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";
import { Trash2, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const { chatHistory, setSelectedChat, deleteChat, setCurrentChat } = useContext(Context);
  const navigate = useNavigate();

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const messageDate = new Date(date);
    const isToday = messageDate.toDateString() === today.toDateString();
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    return messageDate.toLocaleDateString();
  };

  const handleChatClick = (index) => {
    console.log("Chat clicked:", index);
    const selectedChat = chatHistory[index];
    console.log("Selected chat:", selectedChat);
    
    if (selectedChat) {
      // First set the current chat
      setCurrentChat(selectedChat);
      // Then set the selected chat index
      setSelectedChat(index);
      // Finally navigate to the chat page
      navigate("/new-chat");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Chat History</h1>
      
      {chatHistory.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No chat history yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {chatHistory.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleChatClick(index)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-gray-800 dark:text-gray-100 font-medium mb-1 line-clamp-2">
                    {chat.messages[0]?.prompt || "New Chat"}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(chat.messages[0]?.timestamp)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History; 