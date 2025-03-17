import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";
import { 
  Home, 
  History, 
  Settings, 
  HelpCircle, 
  LogOut,
  Menu,
  X,
  Plus
} from "lucide-react";
import { useState } from "react";
import { Settings as SettingsModal } from "../../components/ui/settings";

const Sidebar = () => {
  const { isAuthenticated, setIsAuthenticated, startNewChat } = useContext(Context);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleNewChat = () => {
    startNewChat();
    setIsOpen(false); // Close mobile menu if open
  };

  const navItems = [
    { icon: <Plus className="w-5 h-5" />, label: "New Chat", path: "/new", onClick: handleNewChat },
    { icon: <Home className="w-5 h-5" />, label: "Home", path: "/" },
    { icon: <History className="w-5 h-5" />, label: "History", path: "/history" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", onClick: () => setIsSettingsOpen(true) },
    { icon: <HelpCircle className="w-5 h-5" />, label: "Help", path: "/help" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg md:hidden"
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <img src={assets.logo} alt="Logo" className="w-32 h-8" />
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              item.path ? (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => {
                    if (item.onClick) {
                      item.onClick();
                    }
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200"
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            ))}
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex flex-col w-64 bg-white shadow-lg h-full"
      >
        <div className="p-6">
          <img src={assets.logo} alt="Logo" className="w-32 h-8" />
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            item.path ? (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  if (item.onClick) {
                    item.onClick();
                  }
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            )
          ))}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default Sidebar;
