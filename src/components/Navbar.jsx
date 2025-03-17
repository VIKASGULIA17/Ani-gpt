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
  ChevronDown
} from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, startNewChat } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
    setIsOpen(false);
    navigate('/');
  };

  const mobileNavItems = [
    { icon: <Plus className="w-6 h-6" />, label: "New Chat", onClick: handleNewChat, path: "/new" },
    { icon: <Home className="w-6 h-6" />, label: "Home", path: "/" },
    { icon: <History className="w-6 h-6" />, label: "History", path: "/history" },
    { icon: <Settings className="w-6 h-6" />, label: "Settings", path: "/settings" },
    { icon: <HelpCircle className="w-6 h-6" />, label: "Help", path: "/help" },
  ];

  return (
    <nav className="relative bg-white shadow-md z-20">
      <div className="flex items-center justify-between text-xl lg:text-2xl p-2 lg:p-5 text-gray-600">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        {/* Logo */}
        <Link to="/" className="text-blue-600 font-bold hover:text-blue-700">AniGPT</Link>
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-6">
          <Link
            to="/"
            className={`text-lg py-1 transition-colors ${
              location.pathname === '/' ? 'text-blue-600' : 'text-gray-900 hover:text-blue-500'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-lg py-1 transition-colors ${
              location.pathname === '/about' ? 'text-blue-600' : 'text-gray-900 hover:text-blue-500'
            }`}
          >
            About
          </Link>
        </div>
        
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <User className="w-6 h-6 text-gray-600" />
              <button
                onClick={handleLogout}
                className="hidden lg:block text-gray-600 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="relative hidden lg:block" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
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
                    className="absolute right-0 mt-2 w-44 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-100 py-1.5 z-50"
                  >
                    <Link
                      to="/login"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                    >
                      <User className="w-4 h-4" />
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
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
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white/80 backdrop-blur-md border-r border-gray-200 shadow-xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <img src={assets.logo} alt="Logo" className="w-32 h-8" />
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-6 h-6" />
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
                        } else if (item.path) {
                          navigate(item.path);
                          setIsOpen(false);
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        location.pathname === item.path
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                    >
                      <LogOut className="w-6 h-6" />
                      <span className="font-medium">Logout</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center w-full px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200"
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
  );
};

export default Navbar;
