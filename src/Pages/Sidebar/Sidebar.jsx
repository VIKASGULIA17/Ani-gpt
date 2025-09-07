import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";
import {
  Home,
  History,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Plus
} from "lucide-react";
import { Help } from "../../components/ui/help";

const Sidebar = () => {
  const {  startNewChat, clearChat } = useContext(Context);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);


  const handleNewChat = () => {
    startNewChat();
    setIsOpen(false);
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
    setIsOpen(false);
  };

  const handleHelpClick = () => {
    setIsHelpOpen(true);
    setIsOpen(false);
  };

  const navItems = [
    {
      label: "New Chat",
      icon: <Plus className="w-5 h-5" />,
      onClick: handleNewChat
    },
    {
      label: "Home",
      icon: <Home className="w-5 h-5" />,
      path: "/"
    },
    {
      label: "History",
      icon: <History className="w-5 h-5" />,
      path: "/history"
    },
    
    {
      label: "Help",
      icon: <HelpCircle className="w-5 h-5" />,
      onClick: handleHelpClick
    },
    {
      label: "Clear Chat",
      icon: <LogOut className="w-5 h-5" />,
      onClick: clearChat
    }
  ];

  return (
    <>
      
      

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex flex-col w-64 bg-white dark:bg-black shadow-lg dark:shadow-gray-900 h-full"
      >
        <div className="p-6 border-b dark:border-gray-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ani-GPT
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 pt-6">
          {navItems.map((item) =>
            item.path ? (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (item.label === "Home") startNewChat();
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={item.onClick}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            )
          )}
        </nav>
        

        
      </motion.div>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modals */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
        <div className="pointer-events-auto">
          
          <Help isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
