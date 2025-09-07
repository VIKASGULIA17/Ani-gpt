import { useContext } from "react";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";
import { Trash2, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabase"; 

const History = () => {
  const { chatHistory, setSelectedChat, deleteChat, setCurrentChat } = useContext(Context);
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const messageDate = new Date(date);
    const isToday = messageDate.toDateString() === today.toDateString();
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isNaN(messageDate)) return "Invalid date";

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    return messageDate.toLocaleDateString();
  };

  const handleChatClick = (index) => {
    const selectedChat = chatHistory[index];
    if (selectedChat) {
      const safeChat = {
        ...selectedChat,
        messages: Array.isArray(selectedChat.messages) ? selectedChat.messages : [],
      };

      setCurrentChat(safeChat);
      setSelectedChat(index);
      navigate("/new-chat");
    }
  };

  const handleDeleteChat = async (chatId, e) => {
    e.stopPropagation(); 
    
    try {
      const { error } = await supabase
        .from("chats")
        .delete()
        .eq("id", chatId);
      
      if (error) {
        console.error("Error deleting chat:", error);
        return;
      }
      
      deleteChat(chatId);
    } catch (error) {
      console.error("Error in handleDeleteChat:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
        Chat History
      </h2>
      
      {chatHistory.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">No chat history yet</p>
        </div>
      ) : (
        <div className="space-y-2 md:px-10 lg:px-20 ">
          {chatHistory.map((chat, index) => (
            <motion.div
              key={chat.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex items-center justify-between lg:py-4 p-3 bg-white border-2 border-zinc-600 dark:bg-black rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={() => handleChatClick(index)}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {chat.title || chat.messages?.[0]?.prompt?.substring(0, 30) || "New Chat"}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {chat.last_updated
                      ? formatDate(chat.last_updated)
                      : (chat.messages?.[0]?.timestamp
                        ? formatDate(chat.messages[0].timestamp)
                        : "Unknown date")}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => handleDeleteChat(chat.id, e)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Delete chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;