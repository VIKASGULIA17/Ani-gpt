import { useContext } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import MainContent from "./components/MainContent"
import BottomInputSection from "./components/BottomInputSection"
import Sidebar from "./Pages/Sidebar/Sidebar"
import About from "./Pages/About/About"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import History from "./Pages/History/History"
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
  const {
    input,
    setinput,
    resultData,
    loading,
    showResult,
    recentPrompt,
    setRecentPrompt,
    setHiddenDiv,
    HiddenDiv,
    onSent,
  } = useContext(Context)

  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isMainChatPage = location.pathname === '/';

  return (
    <div className={`flex flex-col w-full ${isMainChatPage ? 'h-screen overflow-hidden' : 'min-h-screen overflow-auto'} bg-gray-50 relative`}>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route
          path="/"
          element={
            <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden relative">
              <div className="hidden md:block relative z-10">
                <Sidebar />
              </div>
              <main className="flex-1 flex flex-col relative z-0">
                <div className="flex-1 overflow-y-auto pb-20 md:pb-24">
                  <div className="max-w-4xl mx-auto px-4">
                    <MainContent
                      showResult={showResult}
                      resultData={resultData}
                      loading={loading}
                      recentPrompt={recentPrompt}
                      setHiddenDiv={setHiddenDiv}
                      HiddenDiv={HiddenDiv}
                    />
                  </div>
                </div>
                {isMainChatPage && (
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
                    <div className="max-w-4xl mx-auto px-4">
                      <BottomInputSection onSent={onSent} setinput={setinput} input={input} />
                    </div>
                  </div>
                )}
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

