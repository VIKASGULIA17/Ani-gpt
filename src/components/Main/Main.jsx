import  { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { AiOutlineLike } from "react-icons/ai";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useSpeechSynthesis } from "react-speech-kit";
const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setinput, input } = useContext(Context);
  //this is for date
  const date = new Date();
      const showTime = date.getHours() 
          + ':' + date.getMinutes() 
          + ":" + date.getSeconds();

          //this si for speech
  const {speak}=useSpeechSynthesis();
  const Convert_to_speech = () => {
    if (resultData) {
      speak({ text: resultData });
      console.log(resultData)
    } else {
      alert("No result data to convert to speech!");
    }
  };
  
  
  return (
    <div className="main flex-1 min-h-screen pb-[15vh] relative">
      {/* Navbar */}
      <div className="nav flex items-center justify-between text-2xl p-5 text-gray-600">
        <p>Ani-gpt</p>
        <img className="w-12 h-12 border-2 border-black rounded-full" src={assets.user_icon} alt="User Icon" />
      </div>

      {/* Main Content */}
      <div className={`main-container max-w-[90vw] mx-5 h-[73vh] rounded-2xl ${!showResult ? 'bg-slate-100' : 'bg-gray-100'} flex flex-col text-center`}>

        {showResult ? (
          <div className="result py-0 px-[10%] max-h-[70vh] overflow-y-scroll no-scrollbar">
            <div className="result-title ml-[40vw] px-4 py-2 rounded-lg text-white font-bold text-lg my-10 flex items-center bg-blue-500 gap-5">
              <img
                src={assets.user_icon}
                alt="User Icon"
                className="w-10 h-10 rounded-full border-2 border-cyan-300"
              />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data relative flex items-start gap-5">
              {loading ? (
                <div className="loader  w-full flex flex-col gap-3">
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

                <div className="flex bg-purple-400 text-slate-100 py-4 px-3 gap-4 rounded-xl">
                  <img src={assets.user_icon} alt="Gemini Icon" className="w-10 h-10 rounded-full " />

                <p
                dangerouslySetInnerHTML={{ __html: resultData }}
                className="text-[17px] w-[60vw ] text-justify pt-2 font-normal leading-6"
                ></p>
                
                </div>
                <div className="bg-green-300 flex justify-between">
                  <div className="flex gap-4 py-2">
                    <img src={assets.Copy_text} alt="" className="w-5 h-5 cursor-pointer"/>
                    <AiOutlineLike className="cursor-pointer"/>
                    <HiOutlineSpeakerWave className="cursor-pointer" onClick={() => Convert_to_speech()} />

                    <img src={assets.Rotate_arrow} alt="" className="w-5 h-4 cursor-pointer"/>
                  </div>
                <p>
                <p className="mt-auto align-text-bottom"> {showTime}</p></p>
                </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="greet mx-32 text-6xl  font-medium p-5">
              
                <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
                  Welcome To Ani-gpt.
                </span>
              
              <p className="text-lg mx-96 pt-4 w-96 font-normal text-[#7a7373]">Completely transforming your relationship with AI, providing a richer, more customized, and fluid interaction that adapts to your needs and preferences.</p>
            </div>
            <div className="mb-10 flex flex-col items-center gap-1">
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
                  className="card hover:bg-slate-200 w-[30vw] p-4 rounded-xl relative cursor-pointer flex items-center gap-4"
                >
                  <img
                    className="w-9 p-1 bg-white rounded-3xl"
                    src={card.icon}
                    alt="Card Icon"
                  />
                  <p className="text-gray-600 text-lg font-medium">{card.text}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Bottom Input Section */}
        <div className="main-bottom absolute bottom-0 w-full max-w-[85vw] py-5 px-0 m-auto">
          <div className="flex items-center gap-4 w-full">
            {/* Search Box */}
            <div className="search-box flex items-center flex-1 gap-3 bg-white px-4 py-2 border-2 border-gray-400 rounded-full">
              <input
                onChange={(e) => setinput(e.target.value)}
                value={input}
                className="bg-transparent flex-1 border-none outline-none p-2 py-1 text-lg"
                type="text"
                placeholder="Enter your prompt"
              />
              <img
                className="w-8 cursor-pointer"
                src={assets.mic_icon}
                alt="Microphone Icon"
              />
            </div>
            {/* Send Icon */}
            <div
              onClick={onSent}
              className="w-14 h-14 cursor-pointer bg-gradient-to-t from-green-400 to-blue-300 rounded-full shadow-md flex items-center justify-center"
            >
              <img className="w-8" src={assets.send_icon} alt="Send Icon" />
            </div>
          </div>
          <p className="bottom-info text-center pt-2 text-sm text-gray-400">
            Gemini may display inaccurate info, double-check your responses before
            using them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
