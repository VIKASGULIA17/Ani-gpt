import { useContext } from "react"
import Navbar from "./components/Navbar"
import MainContent from "./components/MainContent"
import BottomInputSection from "./components/BottomInputSection"
import Sidebar from "./Pages/Sidebar/Sidebar"
import { Context } from "./context/Context"

function App() {
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

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 ">
      <Navbar />
      <div className="flex flex-1 my-4   overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col ">
          <div className="flex-1 overflow-y-auto">
            <MainContent
              showResult={showResult}
              resultData={resultData}
              loading={loading}
              recentPrompt={recentPrompt}
              setHiddenDiv={setHiddenDiv}
              HiddenDiv={HiddenDiv}
            />
          </div>
          <BottomInputSection onSent={onSent} setinput={setinput} input={input} />
        </main>
      </div>
    </div>
  )
}

export default App

