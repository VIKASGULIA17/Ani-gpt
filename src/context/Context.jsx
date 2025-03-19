import { createContext, useState, useEffect } from "react";
import run from "../config/gemini"; // Import the API function
import Cookies from 'js-cookie';

export const Context = createContext();

const CHAT_HISTORY_COOKIE = 'chat_history';
const COOKIE_EXPIRY_DAYS = 7; // Chat history will be stored for 7 days

const ContextProvider = (props) => {
  // Define states
  const [input, setinput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setshowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isNewChat, setIsNewChat] = useState(false);

  // Load chat history from cookies on mount
  useEffect(() => {
    const storedChatHistory = Cookies.get(CHAT_HISTORY_COOKIE);
    if (storedChatHistory) {
      try {
        const parsedHistory = JSON.parse(storedChatHistory);
        setChatHistory(parsedHistory);
      } catch (error) {
        console.error('Error parsing chat history from cookies:', error);
      }
    }
  }, []);

  // Save chat history to cookies whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      Cookies.set(CHAT_HISTORY_COOKIE, JSON.stringify(chatHistory), { expires: COOKIE_EXPIRY_DAYS });
    } else {
      Cookies.remove(CHAT_HISTORY_COOKIE);
    }
  }, [chatHistory]);

  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    // Here you would typically make an API call to your backend
    // For demo purposes, we'll simulate a successful login
    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      email,
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
    return mockUser;
  };

  const register = async (name, email, password) => {
    // Here you would typically make an API call to your backend
    // For demo purposes, we'll simulate a successful registration
    const mockUser = {
      id: '1',
      name,
      email,
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setChatHistory([]);
    setSelectedChatIndex(null);
    setCurrentChat(null);
    setshowResult(false);
    setResultData("");
    setRecentPrompt("");
    setinput("");
    Cookies.remove(CHAT_HISTORY_COOKIE);
  };

  // Function to handle delay for the animation
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const startNewChat = () => {
    setCurrentChat(null);
    setSelectedChatIndex(null);
    setshowResult(false);
    setResultData("");
    setRecentPrompt("");
    setinput("");
    setIsNewChat(true);
  };

  const setSelectedChat = (index) => {
    console.log("Setting selected chat index:", index);
    setSelectedChatIndex(index);
    if (index !== null && chatHistory[index]) {
      const selectedChat = chatHistory[index];
      console.log("Setting current chat:", selectedChat);
      setCurrentChat(selectedChat);
      setshowResult(true);
      if (selectedChat.messages && selectedChat.messages.length > 0) {
        const lastMessage = selectedChat.messages[selectedChat.messages.length - 1];
        setResultData(lastMessage.response);
        setRecentPrompt(lastMessage.prompt);
      }
      setIsNewChat(false);
    }
  };

  // onSent function to handle prompt submission
  const onSent = async () => {
    if (!input.trim()) return;
    
    try {
      setResultData(""); 
      setLoading(true);
      setshowResult(true);

      setRecentPrompt(input);
      const response = await run(input);
      if (!response) throw new Error("No response received");

      // Set the full response immediately without animation
      setResultData(response);

      const newMessage = {
        prompt: input,
        response: response,
        timestamp: new Date().toISOString()
      };

      if (currentChat) {
        // Add message to existing chat
        const updatedChat = {
          ...currentChat,
          messages: [...currentChat.messages, newMessage],
          lastUpdated: new Date().toISOString()
        };
        setChatHistory(prev => prev.map((chat, index) => 
          index === selectedChatIndex ? updatedChat : chat
        ));
        setCurrentChat(updatedChat);
      } else {
        // Create new chat thread
        const newChat = {
          id: Date.now(),
          title: input.substring(0, 30) + (input.length > 30 ? "..." : ""),
          messages: [newMessage],
          lastUpdated: new Date().toISOString()
        };
        setChatHistory(prev => [newChat, ...prev]);
        setCurrentChat(newChat);
        setSelectedChatIndex(0);
      }
      
      setLoading(false);
      setinput("");
    } catch (error) {
      console.error("Error handling response:", error);
      setLoading(false);
      setResultData("An error occurred. Please try again.");
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    setSelectedChatIndex(null);
    setCurrentChat(null);
    setshowResult(false);
    setResultData("");
    setRecentPrompt("");
    setinput("");
    Cookies.remove(CHAT_HISTORY_COOKIE);
  };

  const deleteChat = (chatId) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChat?.id === chatId) {
      setCurrentChat(null);
      setSelectedChatIndex(null);
      setshowResult(false);
      setResultData("");
      setRecentPrompt("");
      setinput("");
    } else if (selectedChatIndex !== null && chatHistory[selectedChatIndex]?.id === chatId) {
      setSelectedChatIndex(null);
    }
  };

  // Context value to share states and functions
  const contextValue = {
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setinput,
    chatHistory,
    selectedChatIndex,
    setSelectedChat,
    clearChat,
    startNewChat,
    currentChat,
    setCurrentChat,
    isAuthenticated,
    user,
    login,
    register,
    logout,
    deleteChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children} {/* Render child components */}
    </Context.Provider>
  );
};

export default ContextProvider;
