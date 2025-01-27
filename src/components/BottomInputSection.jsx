import { assets } from "../assets/assets";



const BottomInputSection = ({ onSent, setinput, input }) => {
  return (
    <div className="main-bottom w-auto">
      <div className="flex  items-center gap-2 w-full">
        {/* Search Box */}
        <div className="search-box flex w-full justify-center items-center gap-1 bg-white px-4 py-2 lg:py-3 border-2 border-gray-400 rounded-full">
          <input
            onChange={(e) => setinput(e.target.value)}
            value={input}
            className="bg-transparent text-[15px] flex-1 w-[60vw] border-none outline-none lg:p-2 lg:py-1 lg:text-lg lg:w-[83vw] align-middle lg:mx-auto"
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
          className="lg:h-14 lg:w-14 flex items-center justify-center w-10 h-10 text-[28px] text-white rounded-full bg-blue-500 cursor-pointer"
        >
          <img
            src={assets.send_icon}
            alt="Send Icon"
            className="w-2 lg:w-10 lg:pl-1 h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default BottomInputSection;
