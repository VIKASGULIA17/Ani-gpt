import { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import Sidebar from "./Pages/Sidebar/Sidebar";
import About from "./Pages/About/About";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import History from "./Pages/History/History";
import ChatPage from "./components/ChatPage";
import { Context } from "./context/Context";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authLoading } = useContext(Context);
  const location = useLocation();

  if (authLoading) return <div className="text-center p-8">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated, authLoading } = useContext(Context);

  if (authLoading) return <div className="text-center p-8">Loading...</div>;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
};

function App() {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const isMainChatPage = location.pathname === "/";
  const isNewChatPage = location.pathname === "/new-chat";

  return (
    <div
      className={`flex flex-col w-full ${
        isMainChatPage || isNewChatPage
          ? "h-screen overflow-hidden"
          : "min-h-screen overflow-auto"
      } bg-gray-50 dark:bg-[#242424] transition-colors relative`}
    >
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={
          <AuthRoute><Login /></AuthRoute>
        } />
        <Route path="/register" element={
          <AuthRoute><Register /></AuthRoute>
        } />

        {/* Protected Routes */}
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/new-chat" element={
          <ProtectedRoute>
            <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden relative">
              <div className="hidden md:block relative z-10">
                <Sidebar />
              </div>
              <main className="flex-1 flex flex-col relative z-0">
                <ChatPage />
              </main>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden relative">
              <div className="hidden md:block relative z-10">
                <Sidebar />
              </div>
              <main className="flex-1 flex flex-col relative z-0">
                <MainContent />
              </main>
            </div>
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
