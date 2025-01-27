import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import Markdown from 'react-markdown'
import { Context } from "../../context/Context";
import { AiOutlineLike } from "react-icons/ai";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight, lightfair } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Main = () => {
  const [HiddenDiv, setHiddenDiv] = useState(false);
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setinput,
    input,
  } = useContext(Context);

  // Date
  const date = new Date();
  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  return (
    <div className="overflow-hidden main flex-1 z-50 min-h-screen pb-[15vh] relative">
      {HiddenDiv && (
        <div className="w-[90vw] h-screen fixed z-40 backdrop-blur-sm">
          <div>
            <textarea
              name=""
              id=""
              className="border-2 border-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-100 text-black p-4 rounded w-96 h-96"
            ></textarea>
          </div>
          <button
            className="w-20 h-10 px-4 py-2 bg-red-400 absolute right-[34%] top-[50%] text-white"
            onClick={() => setHiddenDiv(false)}
          >
            Close
          </button>
        </div>
      )}
      {/* Navbar */}
      <div className="nav flex items-center justify-between text-xl lg:text-2xl p-2 lg:p-5 text-gray-600">
        <img src={assets.menu_icon} className="w-7 h-7 lg:hidden" alt="" />
        <p>Ani-gpt</p>
        <img
          className="h-8 w-8  border-[1px]  lg:w-12 lg:h-12 lg:border-2 border-black rounded-full"
          src={assets.user_icon}
          alt="User Icon"
        />
      </div>
      {/* Main Content */}
      <div
        className={`main-container max-w-[92vw] shadow-lg shadow-zinc-300 lg:max-w-[90vw] mx-5 h-[73vh] rounded-2xl ${!showResult ? "bg-slate-100" : "bg-gray-100"
          } flex flex-col text-center`}
      >
        {showResult ? (
          <div className="result py-0 px-[10%] max-h-[70vh] overflow-y-scroll no-scrollbar">
            <span className="result-title flex flex-col items-end">
              <div className="w-auto px-4 py-2 rounded-lg capitalize text-white lg:font-bold font-[400] text-[14px] lg:text-lg my-10 flex items-center bg-blue-500 gap-5">
                <img
                  src={assets.user_icon}
                  alt="User Icon"
                  className="w-5 h-5 block border-[1.5px] lg:w-10 lg:h-10 rounded-full lg:border-2 border-cyan-300"
                />
                <p className="whitespace-nowrap">{recentPrompt}</p>
              </div>
              <FaEdit
                onClick={() => setHiddenDiv(!HiddenDiv)}
                className="cursor-pointer mb-10 -mt-4 text-gray-600 hover:text-gray-800"
              />
            </span>

            <div className="result-data relative flex items-start gap-5">
              {loading ? (
                <div className="loader w-full flex flex-col gap-3">
                  {Array(3)
                    .fill("")
                    .map((_, index) => (
                      <hr
                        key={index}
                        className="border-4 border-none bg-gradient-to-r from-blue-500 via-white to-blue-300 bg-custom-size h-5 animate-loader"
                      />
                    ))}
                </div>
              ) : (
                <div>
                  <div className="my-4 flex bg-[#83b9f03a] shadow-2xl shadow-zinc-300 text-black py-4 px-3 gap-4 rounded-xl pr-16">
                    <img
                      src={assets.user_icon}
                      alt="Gemini Icon"
                      className="w-7 h-7 border-[1.5px] lg:w-10 lg:h-10 rounded-full"
                    />
                    <Markdown className="text-[13px]  lg:text-[20px] w-[60vw] text-start leading-2 lg:pt-2 font-normal lg:leading-8" components={{
                      code(props) {
                        const { children, className, node, ...rest } = props
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                          <SyntaxHighlighter 
                            {...rest}
                            PreTag="div"
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            style={atelierCaveLight}
                            customStyle={{
                              margin: '20px 0px',
                              borderRadius: '0.5rem',
                              backgroundColor: '#f9fafb', // light background for code
                            }}
                          />
                        ) : (
                          <code {...rest} className={className}>
                            {children}
                          </code>
                        )
                      }
                    }}>{resultData}</Markdown>



                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-4 py-2">

                      <AiOutlineLike className="cursor-pointer text-sm" />
                      <HiOutlineSpeakerWave
                        className="cursor-pointer"

                      />
                      <img
                        src={assets.Rotate_arrow}
                        alt="Rotate Arrow"
                        className="w-4 h-3 lg:w-5 lg:h-4 cursor-pointer"
                      />
                    </div>
                    <p className="mt-auto text-sm align-text-bottom">
                      {showTime}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
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

        {/* Bottom Input Section */}
        <div className="main-bottom absolute bottom-0  lg:max-w-[90vw] pb-3 lg:py-5 m-auto">
          <div className="flex  items-center gap-2 w-full">
            {/* Search Box */}
            <div className="search-box flex  items-center gap-1 bg-white px-4 py-2 lg:py-3 border-2 border-gray-400 rounded-full">
              <input
                onChange={(e) => setinput(e.target.value)}
                value={input}
                className="bg-transparent text-[15px] flex-1 w-[60vw] border-none outline-none lg:p-2 lg:py-1 lg:text-lg lg:w-[83vw]"
                type="text"
                placeholder="Enter your prompt"
              />
              <img
                className="w-6 lg:w-8 cursor-pointer"
                src={assets.mic_icon}
                alt="Microphone Icon"
              />
            </div>
            {/* Send Icon */}
            <div
              onClick={onSent}
              className="w-10 h-10 lg:w-14 lg:h-14 cursor-pointer bg-gradient-to-t from-green-400 to-blue-300 rounded-full shadow-md flex items-center justify-center"
            >
              <img
                className="w-6 lg:w-8"
                src={assets.send_icon}
                alt="Send Icon"
              />
            </div>
          </div>
          <p className="bottom-info hidden lg-block pt-2 text-[10px] lg:text-base text-gray-400">
            Gemini may display inaccurate info, double-check your responses
            before using them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
