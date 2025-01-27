import { FaEdit } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Markdown from 'react-markdown';
import { assets } from "../assets/assets";




const ResultSection = ({ loading, resultData, showTime, recentPrompt, setHiddenDiv, HiddenDiv }) => {
  return (
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
  );
};

export default ResultSection;
