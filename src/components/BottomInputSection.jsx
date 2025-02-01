
import { Send, Mic } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



const BottomInputSection = ({ onSent, setinput, input }) => {
  return (
    
      <div className="w-full  mx-auto px-5 py-6">
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
                {/* // Add microphone functionality here */}
            <Input
              type="text"
              placeholder="Enter your prompt"
              value={input}
              onChange={(e) => setinput(e.target.value)}
              className="px-6 h-16 pr-10 py-6 text-base lg:text-xl sm:text-lg rounded-3xl shadow-xl "
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => {
                // Add microphone functionality here
                console.log("Microphone clicked")
              }}
            >
              <Mic className="h-5 w-5 scale-150" />
              <span className="sr-only">Use microphone</span>
            </Button>
          </div>
          <Button size="icon" variant="outline" onClick={onSent} className="h-16 w-16 rounded-full border-4 ">
            <Send className="h-6 scale-150 w-6 " />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
  );
};

export default BottomInputSection;





