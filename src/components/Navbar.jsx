import { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  History, 
  Settings, 
  HelpCircle, 
  LogOut,
  Menu,
  X,
  Plus,
  User,
  ChevronDown,
  MessageSquare
} from "lucide-react";
import { Settings as SettingsModal } from "../components/ui/settings";
import { Help } from "../components/ui/help";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, startNewChat } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
    setIsProfileOpen(false);
  };

  const handleNewChat = () => {
    startNewChat();
    navigate("/new-chat");
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
    setIsOpen(false);
  };

  const handleHelpClick = () => {
    setIsHelpOpen(true);
    setIsOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const mobileNavItems = [
    { icon: <MessageSquare className="w-5 h-5" />, label: "New Chat", onClick: handleNewChat },
    { icon: <History className="w-5 h-5" />, label: "History", onClick: () => handleNavigation("/history") },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", onClick: handleSettingsClick },
    { icon: <HelpCircle className="w-5 h-5" />, label: "Help", onClick: handleHelpClick },
    { icon: <User className="w-5 h-5" />, label: "About", onClick: () => handleNavigation("/about") },
    { icon: <LogOut className="w-5 h-5" />, label: "Logout", onClick: handleLogout },
  ];

  return (
    <>
      <nav className="relative bg-white/80 dark:bg-black/80 shadow-md dark:shadow-gray-900 z-10">
        <div className="flex items-center justify-between text-xl lg:text-2xl p-2 lg:p-5 text-gray-600 dark:text-gray-300">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={assets.logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
          </Link>
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center space-x-6">
            <Link
              to="/"
              className={`text-lg py-1 px-3 rounded-lg transition-all duration-200 ${
                location.pathname === '/' 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-lg py-1 px-3 rounded-lg transition-all duration-200 ${
                location.pathname === '/about' 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              About
            </Link>
          </div>
          
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <button
                  onClick={handleLogout}
                  className="hidden lg:block px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="relative hidden lg:block" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-200 rounded-lg"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Profile</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg dark:shadow-gray-900 border border-gray-100 dark:border-gray-800 py-1.5 z-50"
                    >
                      <Link
                        to="/login"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-200"
                      >
                        <User className="w-4 h-4" />
                        Sign in
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-200"
                      >
                        <User className="w-4 h-4" />
                        Create account
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Mobile Menu Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-r border-purple-100 dark:border-purple-900/30 shadow-[0_0_15px_rgba(168,85,247,0.1)] dark:shadow-[0_0_15px_rgba(168,85,247,0.05)] z-50 lg:hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-6 border-b border-purple-100 dark:border-purple-900/30">
                    <div className="flex items-center justify-between">
                      <img src={assets.logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                      >
                        <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <nav className="flex-1 px-4 py-6 space-y-2">
                    {mobileNavItems.map((item, index) => (
                      <motion.button
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                          if (item.onClick) {
                            item.onClick();
                          }
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          location.pathname === item.path
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white"
                        }`}
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    ))}
                  </nav>

                  {/* Footer */}
                  <div className="p-4 border-t border-purple-100 dark:border-purple-900/30">
                    {isAuthenticated ? (
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200"
                      >
                        <LogOut className="w-6 h-6" />
                        <span className="font-medium">Logout</span>
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <Link
                          to="/login"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-center w-full px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white rounded-xl transition-all duration-200"
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                        >
                          Sign up
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Modals */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <Help isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </>
  );
};

export default Navbar;
