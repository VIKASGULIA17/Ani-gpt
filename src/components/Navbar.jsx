import { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import {
  Home,
  History,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
  MessageSquare
} from "lucide-react";
import { Settings as SettingsModal } from "../components/ui/settings";
import { Help } from "../components/ui/help";
import { ThemeToggle } from "./ThemeToggle";
import supabase from "../config/supabase";

// Helper components
const NavLink = ({ to, label, isActive }) => (
  <Link
    to={to}
    className={`text-lg py-1 px-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`}
  >
    {label}
  </Link>
);

const MobileMenuItem = ({ icon, label, onClick, isActive, index }) => (
  <motion.button
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        : "text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </motion.button>
);

const ProfileDropdown = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="absolute right-0 mt-2 w-48 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg border dark:border-gray-800 py-1.5 z-50"
  >
    <Link
      to="/login"
      onClick={onClose}
      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white"
    >
      <User className="w-4 h-4" />
      Sign in
    </Link>
    <Link
      to="/register"
      onClick={onClose}
      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white"
    >
      <User className="w-4 h-4" />
      Create account
    </Link>
  </motion.div>
);

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, startNewChat } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const mobileNavItems = [
    { label: "New Chat", icon: <MessageSquare className="w-5 h-5" />, path: "/new-chat", action: () => { startNewChat(); navigate("/new-chat"); } },
    { label: "Home", icon: <Home className="w-5 h-5" />, path: "/", action: () => navigate("/") },
    { label: "History", icon: <History className="w-5 h-5" />, path: "/history", action: () => navigate("/history") },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, action: () => setIsSettingsOpen(true) },
    { label: "Help", icon: <HelpCircle className="w-5 h-5" />, action: () => setIsHelpOpen(true) },
    { label: "About", icon: <User className="w-5 h-5" />, path: "/about", action: () => navigate("/about") }
  ];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      return;
    }
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="relative bg-white/80 dark:bg-black/80 shadow-md z-10">
        <div className="flex items-center justify-between p-3 lg:p-5 text-gray-600 dark:text-gray-300">
          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={assets.logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex flex-1 justify-center space-x-6">
            <NavLink to="/" label="Home" isActive={location.pathname === "/"} />
            <NavLink to="/about" label="About" isActive={location.pathname === "/about"} />
          </div>

          {/* Profile + Theme */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <div className="relative hidden lg:block" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white rounded-lg"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">Profile</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>
                {isProfileOpen && <ProfileDropdown onClose={() => setIsProfileOpen(false)} />}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white dark:bg-gray-800 shadow-lg z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                <img src={assets.logo} className="h-10 w-10 rounded-full object-cover" />
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-2">
                {mobileNavItems.map((item, index) => (
                  <MobileMenuItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    onClick={() => {
                      item.action?.();
                      setIsOpen(false);
                    }}
                    isActive={item.path && location.pathname === item.path}
                    index={index}
                  />
                ))}
              </nav>
              <div className="p-4 border-t dark:border-gray-700">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                      Sign in
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Modals */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <Help isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </>
  );
};

export default Navbar;
