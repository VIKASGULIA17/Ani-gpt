import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { MdContentCopy } from "react-icons/md"; // Import copy icon
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Markdown from "react-markdown";
import { assets } from "../assets/assets";

const ResultSection = ({ loading, resultData, showTime, recentPrompt, setHiddenDiv, HiddenDiv }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };

  return (
    <div className="result py-0 px-[10%] min-w-full max-h-[75vh] overflow-y-scroll no-scrollbar">
      <span className="result-title flex flex-col items-end">
        <div className="w-auto px-4 py-2 rounded-lg capitalize text-white lg:font-bold font-[400] text-[14px] lg:text-lg my-10 flex items-center bg-blue-500 gap-5">
          <img
            src={assets.user_icon}
            alt="User Icon"
            className="w-15 h-5 block border-[1.5px] lg:w-10 lg:h-10 rounded-full lg:border-2 border-cyan-300"
          />
          <p className="max-w-[45vw] max-h-[120px] text-start whitespace-normal break-words  overflow-y-auto overflow-x-hidden">
            {recentPrompt}
          </p>

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
            <div className="my-4 flex flex-col bg-[#83b9f03a] shadow-2xl shadow-zinc-300 text-black py-4 px-3 gap-4 rounded-xl">
              <Markdown
                className="text-[13px] px-4 lg:text-[20px] max-w-[80vw] whitespace-normal break-words overflow-y-auto overflow-x-hidden text-start leading-2 lg:pt-2 font-normal lg:leading-8"
                components={{
                  code({ children, className }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <div className="relative group max-w-[45vw] overflow-x-auto">
                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopy(children)}
                          className="absolute top-2 right-2 bg-gray-200 text-gray-700 p-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition"
                        >
                          {copied ? "Copied!" : <MdContentCopy />}
                        </button>

                        <SyntaxHighlighter
                          PreTag="div"
                          language={match[1]}
                          style={atelierCaveLight}
                          customStyle={{
                            borderRadius: "0.5rem",
                            margin: "20px 10px",
                            backgroundColor: "#f9fafb",
                            maxWidth: "45vw",
                            overflowX: "auto", // Ensure code blocks are scrollable if needed
                          }}
                        >
                          {String(children).trim()}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className}>{children}</code>
                    );
                  },
                }}
              >
                {resultData}
              </Markdown>

            </div>

            <div className="flex justify-between">
              <div className="flex gap-4 py-2">
                <AiOutlineLike className="cursor-pointer text-sm" />
                <HiOutlineSpeakerWave className="cursor-pointer" />
                <img
                  src={assets.Rotate_arrow}
                  alt="Rotate Arrow"
                  className="w-4 h-3 lg:w-5 lg:h-4 cursor-pointer"
                />
              </div>
              <p className="mt-auto text-sm align-text-bottom">{showTime}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultSection;
