import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const{onSent,recentPrompt,showResult,loading,resultData,setinput,input}=useContext(Context)

  return (
    <div className="main flex-1 min-h-[100vh] pb-[15vh] relative">
      <div className="nav flex items-center  justify-between text-2xl p-5 text-[#585858]">
        <p>Gemini</p>
        <img
          className="w-12 h-12 border-2 border-black rounded-full"
          src={assets.user_icon}
          alt=""
        />
      </div>

      <div className="main-container max-w-[900px] m-auto">
        {!showResult?<>
        
        <div className="greet mx-16 my-0 text-6xl text-gray-300 font-medium p-5">
          <p>
            <span className="bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
              Hello,Dev.
            </span>
          </p>
          <p>How can I help you?</p>
        </div>
        <div className="cards  grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-5 text-lg">
          <div className="card hover:bg-slate-200 h-52 p-4 bg-slate-100 rounded-xl relative cursor-pointer ">
            <p className="text-[#585858] text-xl">
              Show me how to build something by hand
            </p>
            <img
              className="w-9 p-1 absolute bg-white rounded-3xl bottom-3 right-3"
              src={assets.bulb_icon}
              alt=""
            />
          </div>
          <div className="card hover:bg-slate-200 h-52 p-4 bg-slate-100 rounded-xl relative cursor-pointer ">
            <p className="text-[#585858] text-xl">
              Show the most important emails in my inbox
            </p>
            <img
              className="w-9 p-1 absolute bg-white rounded-3xl bottom-3 right-3"
              src={assets.message_icon}
              alt=""
            />
          </div>
          <div className="card hover:bg-slate-200 h-52 p-4 bg-slate-100 rounded-xl relative cursor-pointer ">
            <p className="text-[#585858] text-xl">
              Summarize the major events of the Cold War.
            </p>
            <img
              className="w-9 p-1 absolute bg-white rounded-3xl bottom-3 right-3"
              src={assets.history_icon}
              alt=""
            />
          </div>
          <div className="card hover:bg-slate-200 h-52 p-4 bg-slate-100 rounded-xl relative cursor-pointer ">
            <p className="text-[#585858] text-xl">
              Brainstorm presentation ideas about a topic
            </p>
            <img
              className="w-9 p-1 absolute bg-white rounded-3xl bottom-3 right-3"
              src={assets.compass_icon}
              alt=""
            />
          </div>
        </div>
        </>
        :
        <div className="result py-0 px-[10%] max-h-[70vh] overflow-y-scroll no-scrollbar">
          <div className="result-title my-[40px] mx-0  flex items-center gap-5">
            <img src={assets.user_icon} alt="" className="w-10 h-10 rounded-full border-2 border-cyan-300" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data flex items-start gap-5">
            <img src={assets.gemini_icon} alt="" className="w-10 h-10" />
            {loading?<div className="loader w-full flex flex-col gap-3">
              <hr className="border-4 border-none bg-gradient-to-r from-custom-blue via-white to-light-blue bg-custom-size h-5 animate-loader"/>
              <hr className="border-4 border-none bg-gradient-to-r from-custom-blue via-white to-light-blue bg-custom-size h-5 animate-loader"/>
              <hr className="border-4 border-none bg-gradient-to-r from-custom-blue via-white to-light-blue bg-custom-size h-5 animate-loader"/>
            </div>:
            <p dangerouslySetInnerHTML={{__html:resultData}} className="text-[17px] font-[400] leading-[1.8]"></p>
            }
          </div>
          </div>}

        <div className="main-bottom absolute bottom-0 w-[100%] max-w-[900px] py-5 px-0 m-auto">
          <div className="search-box flex items-center justify-between gap-5 bg-slate-100 px-3 py-3 rounded-[50px]">
            <input onChange={(e)=>setinput(e.target.value)} value={input} className="bg-transparent flex-1 border-none outline-none p-2 text-lg" type="text" placeholder="Enter your prompt" />
            
            <div className="flex items-center gap-4">
              <img className="w-6  cursor-pointer" src={assets.gallery_icon} alt="" />
              <img className="w-8 cursor-pointer" src={assets.mic_icon} alt="" />
              <img onClick={()=>onSent()} className="w-8 cursor-pointer" src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info text-center pt-2 text-sm text-gray-400">
            Gemini may display inaccurate info,double check your responses
            before using the response
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
