import { createContext, useState, useEffect, useCallback } from "react";
import run from "../config/gemini";
import supabase from "../config/supabase";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isProcessingMessage, setIsProcessingMessage] = useState(false);

  // Get logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      }
    };
    fetchUser();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
          setIsAuthenticated(true);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setIsAuthenticated(false);
          clearChat();
        }
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Fetch chat history for authenticated user
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data, error } = await supabase
          .from("chats")
          .select(`
            id,
            title,
            user_id,
            last_updated,
            messages (
              id,
              prompt,
              response,
              created_at
            )
          `)
          .eq("user_id", user?.id)
          .order("last_updated", { ascending: false });

        if (error) {
          console.error("Fetch chats error:", error.message);
          return;
        }

        if (data?.length) {
          // Ensure messages are sorted by created_at
          const processedData = data.map(chat => ({
            ...chat,
            messages: chat.messages.sort((a, b) => 
              new Date(a.created_at) - new Date(b.created_at)
            )
          }));
          
          setChatHistory(processedData);
          
          // Set the most recent chat as current
          setSelectedChatIndex(0);
          setCurrentChat(processedData[0]);
          setShowResult(true);

          const lastMsg = processedData[0].messages.at(-1);
          if (lastMsg) {
            setRecentPrompt(lastMsg.prompt);
            setResultData(lastMsg.response);
          }
        }
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };

    if (user) fetchChats();
  }, [user]);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("Login error:", error.message);
      return null;
    }
    setUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  };

  const register = async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });

    if (error) {
      console.error("Registration error:", error.message);
      return null;
    }

    setUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    clearChat();
  };

  const startNewChat = useCallback(() => {
    setCurrentChat(null);
    setSelectedChatIndex(null);
    setShowResult(false);
    setResultData("");
    setRecentPrompt("");
    setInput("");
  }, []);

  const setSelectedChat = useCallback((index) => {
    if (index === selectedChatIndex) return;
    
    setSelectedChatIndex(index);
    const chat = chatHistory[index];
    if (chat) {
      setCurrentChat(chat);
      setShowResult(true);
      
      // Reset other states to prevent mixing with previous chat
      setResultData("");
      setRecentPrompt("");
      setInput("");
      
      const lastMsg = chat.messages.at(-1);
      if (lastMsg) {
        setRecentPrompt(lastMsg.prompt);
        setResultData(lastMsg.response);
      }
    }
  }, [chatHistory, selectedChatIndex]);

  const onSent = async () => {
    if (!input.trim() || isProcessingMessage) return;

    try {
      setIsProcessingMessage(true);
      setLoading(true);
      setShowResult(true);
      
      const currentPrompt = input;
      setRecentPrompt(currentPrompt);
      setResultData("");
      setInput(""); // Clear input immediately to prevent duplicate sends

      let response = await run(currentPrompt);
      if (!response) throw new Error("No response");

      if (typeof response === "string") {
        response = response
          .replace(/\b(i[' ]?m|i am|this is|my name is)\s*(gemini|a large language model|an ai model|a google ai)?[.,]*/gi, "I'm ani-gpt.")
          .replace(/\bmy (name|model)( is|:)?.*?\b/gi, "My name is ani-gpt, developed by Vikas.")
          .replace(/\b(i was developed|created|built) by google\b/gi, "I was developed by Vikas Gulia.")
          .replace(/\b(google|gemini)( ai)? (created|developed|built) (me|this)\b/gi, "Vikas created me.")
          .replace(/\bby google\b/gi, "by Vikas Gulia")
          .replace(/\bfrom google\b/gi, "from Vikas Gulia")
          .replace(/\bcreated by (google|gemini)\b/gi, "created by Vikas Gulia")
          .replace(/\b(creator|developer)\b.*?(google|gemini)/gi, "$1 is Vikas Gulia")
          .replace(/\bI (do not have|don't have) (a name|a physical form)[.,]*/gi, "I'm ani-gpt.")
          .replace(/\bI('m| am) (an )?(ai|AI|artificial intelligence|language model).*/gi, "I'm ani-gpt.")
          .replace(/As an? (AI|language model).*/gi, "Let's move on.");
      }

      setResultData(response);

      if (!user) {
        // If not authenticated, just update the UI
        setLoading(false);
        setIsProcessingMessage(false);
        return;
      }

      const timestamp = new Date().toISOString();
      const newMessage = {
        prompt: currentPrompt,
        response,
        created_at: timestamp
      };

      if (currentChat) {
        // Update existing chat
        try {
          const { data: msgData, error: msgError } = await supabase
            .from("messages")
            .insert([{
              chat_id: currentChat.id,
              user_id: user.id,
              prompt: newMessage.prompt,
              response: newMessage.response,
              created_at: timestamp
            }])
            .select()
            .single();

          if (msgError) throw msgError;

          const { error: chatError } = await supabase
            .from("chats")
            .update({ last_updated: timestamp })
            .eq("id", currentChat.id);

          if (chatError) throw chatError;

          // Update local state with new message
          const updatedChat = {
            ...currentChat,
            last_updated: timestamp,
            messages: [...currentChat.messages, { 
              ...newMessage, 
              id: msgData.id
            }]
          };

          setChatHistory(prev => 
            prev.map((chat) => 
              chat.id === currentChat.id ? updatedChat : chat
            ).sort((a, b) => 
              new Date(b.last_updated) - new Date(a.last_updated)
            )
          );
          setCurrentChat(updatedChat);
          setSelectedChatIndex(0); // Move to top of list
        } catch (error) {
          console.error("Error updating chat:", error);
        }
      } else {
        // Create new chat
        try {
          const { data: chatData, error: chatError } = await supabase
            .from("chats")
            .insert([{
              title: currentPrompt.substring(0, 30) + (currentPrompt.length > 30 ? "..." : ""),
              user_id: user.id,
              last_updated: timestamp
            }])
            .select()
            .single();

          if (chatError) throw chatError;

          const { data: msgData, error: msgError } = await supabase
            .from("messages")
            .insert([{
              chat_id: chatData.id,
              user_id: user.id,
              prompt: newMessage.prompt,
              response: newMessage.response,
              created_at: timestamp
            }])
            .select()
            .single();

          if (msgError) throw msgError;

          const newChatWithMessages = {
            ...chatData,
            messages: [{ 
              ...newMessage,
              id: msgData.id
            }]
          };

          setChatHistory(prev => [newChatWithMessages, ...prev]);
          setCurrentChat(newChatWithMessages);
          setSelectedChatIndex(0);
        } catch (error) {
          console.error("Error creating new chat:", error);
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setResultData("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setIsProcessingMessage(false);
    }
  };

  const clearChat = useCallback(() => {
    setChatHistory([]);
    setSelectedChatIndex(null);
    setCurrentChat(null);
    setShowResult(false);
    setResultData("");
    setRecentPrompt("");
    setInput("");
  }, []);

  const deleteChat = async (chatId) => {
    try {
      await supabase.from("chats").delete().eq("id", chatId);
      setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
      
      if (currentChat?.id === chatId) {
        // If we deleted the current chat, either select the next one or clear
        if (chatHistory.length > 1) {
          const newIndex = selectedChatIndex === 0 ? 0 : selectedChatIndex - 1;
          setSelectedChat(newIndex);
        } else {
          clearChat();
        }
      } else if (selectedChatIndex !== null) {
        // Adjust selected index if needed
        const deletedIndex = chatHistory.findIndex(chat => chat.id === chatId);
        if (deletedIndex !== -1 && deletedIndex < selectedChatIndex) {
          setSelectedChatIndex(selectedChatIndex - 1);
        }
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <Context.Provider
      value={{
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;