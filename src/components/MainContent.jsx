import ResultSection from './ResultSection';
import { assets } from "../assets/assets";

import { Card, CardContent } from "@/components/ui/card"

import Markdown from 'react-markdown';

const MainContent = ({ showResult, resultData, loading, showTime, recentPrompt, setHiddenDiv, HiddenDiv }) => {
  const suggestions = [
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
  ]
  return (
    <Card
      className={`w-auto mx-4 h-[79vh] lg:h-[75vh] shadow-lg shadow-zinc-300  rounded-2xl ${!showResult ? "bg-slate-100" : "bg-gray-100"
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
          <div className="text-4xl lg:text-6xl font-medium p-5">
            <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
              Welcome To Ani-gpt.
            </span>
            <p className="text-base md:block md:text-lg md:py-7 lg:block lg:text-xl text-center text-wrap pt-4 lg:px-20 font-normal text-[#7a7373]">
              Completely transforming your relationship with AI, providing a
              richer, more customized, and fluid interaction that adapts to
              your needs and preferences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-scroll gap-4 max-w-4xl mx-auto px-2 mb-4 lg:px-4 lg:mb-20 rounded-3xl">
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="cursor-pointer hover:bg-accent transition-colors">
                <CardContent className="flex items-center gap-3 p-3 lg:gap-7 lg:p-7">
                  <div className="bg-background rounded-full p-1 border-2 border-border">
                    <img className="w-6 h-6" src={suggestion.icon || "/placeholder.svg"} alt={`${suggestion.text} icon`} />
                  </div>
                  <p className="text-sm md:text-base text-foreground">{suggestion.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default MainContent;
