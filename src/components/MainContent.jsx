import ResultSection from './ResultSection';
import { assets } from "../assets/assets";



import Markdown from 'react-markdown';

const MainContent = ({ showResult, resultData, loading, showTime, recentPrompt, setHiddenDiv, HiddenDiv }) => {
  return (
    <div
      className={`main-container w-auto shadow-lg shadow-zinc-300  mx-5 h-[73vh] rounded-2xl ${!showResult ? "bg-slate-100" : "bg-gray-100"
        } flex flex-col text-center`}
    >
      {showResult ? (
        <ResultSection
          loading={loading}
          resultData={resultData}
          showTime={showTime}
          recentPrompt={recentPrompt}
          setHiddenDiv={setHiddenDiv}
          HiddenDiv={HiddenDiv}
        />
      ) : (
        <>
          <div className="greet lg:mx-32 text-4xl lg:text-6xl font-medium p-5">
            <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
              Welcome To Ani-gpt.
            </span>
            <p className="hidden lg:block lg:text-xl text-center text-wrap pt-4 px-96 font-normal text-[#7a7373]">
              Completely transforming your relationship with AI, providing a
              richer, more customized, and fluid interaction that adapts to
              your needs and preferences.
            </p>
          </div>
          <div className="lg:mb-10 lg:block flex-col items-center  lg:gap-4">
            {[
              {
                text: "Show me how to build something by hand",
                icon: assets.bulb_icon,
              },
              {
                text: "Show the most important emails in my inbox",
                icon: assets.message_icon,
              },
              {
                text: "Summarize the major events of the Cold War.",
                icon: assets.history_icon,
              },
              {
                text: "Brainstorm presentation ideas about a topic",
                icon: assets.compass_icon,
              },
            ].map((card, index) => (
              <div
                key={index}
                className="card hover:bg-slate-200 shadow-lg  border-t-2 mx-3 w-auto lg:w-[30vw] px-3 p-2 lg:p-4 lg:mx-[30vw] rounded-xl relative cursor-pointer flex  items-center gap-2 mb-2"
              >
                <img
                  className="w-7 lg:w-9 p-1 border-2 bg-white rounded-3xl"
                  src={card.icon}
                  alt="Card Icon"
                />
                <p className="text-gray-600 text-[10px] lg:text-lg font-medium">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MainContent;
