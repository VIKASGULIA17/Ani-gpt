import { useContext } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import MainContent from "./components/MainContent"
import Sidebar from "./Pages/Sidebar/Sidebar"
import About from "./Pages/About/About"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import History from "./Pages/History/History"
import ChatPage from "./components/ChatPage"
import { Context } from "./context/Context"

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(Context);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isMainChatPage = location.pathname === '/';
  const isNewChatPage = location.pathname === '/new-chat';

  return (
    <div className={`flex flex-col w-full ${isMainChatPage || isNewChatPage ? 'h-screen overflow-hidden' : 'min-h-screen overflow-auto'} bg-gray-50 dark:bg-[#242424] transition-colors relative`}>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route
          path="/new-chat"
          element={
            <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden relative">
              <div className="hidden md:block relative z-10">
                <Sidebar />
              </div>
              <main className="flex-1 flex flex-col relative z-0">
                <ChatPage />
              </main>
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden relative">
              <div className="hidden md:block relative z-10">
                <Sidebar />
              </div>
              <main className="flex-1 flex flex-col relative z-0">
                <MainContent />
              </main>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App

