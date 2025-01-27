import { useState, useContext } from 'react';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import BottomInputSection from './components/BottomInputSection';
import Sidebar from './Pages/Sidebar/Sidebar';
import { Context } from './context/Context';  // Import the Context

function App() {
  // Get all context values using useContext hook
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
    onSent
  } = useContext(Context);  // Access context values

  return (
    <div className="App h-screen grid grid-flow-row grid-rows-10">
      <div className='w-full row-span-1'>
        <Navbar />
      </div>

      <div className='flex w-full row-span-9'>

        <Sidebar />
        <div className='w-full flex flex-col justify-between'>
          <MainContent
            showResult={showResult}
            resultData={resultData}
            loading={loading}
            recentPrompt={recentPrompt}
            setHiddenDiv={setHiddenDiv}
            HiddenDiv={HiddenDiv}
          />

          <BottomInputSection onSent={onSent} setinput={setinput} input={input} />

        </div>

      </div>
    </div>
  );
}

export default App;
