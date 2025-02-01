import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Ghost } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={cn(
        "hidden sidebar transition-all duration-300 h-full lg:flex lg:flex-col bg-gray-100 shadow-lg",
        isExpanded ? "w-64" : "w-28"
      )}
    >
      <div className="flex justify-between items-center p-6">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="Ghost"
          className="rounded-md text-gray-600"
        >
          <img src={assets.menu_icon} alt="Menu Icon" className="w-5 h-5" />
        </Button>
      </div>
      <nav className="flex flex-col gap-5 p-6">
        <Button variant="ghost" className="justify-start text-gray-600">
          <img src={assets.plus_icon} alt="New Chat" className="w-5 h-5 mr-2" />
          {isExpanded && <span>New Chat</span>}
        </Button>
        <Button variant="ghost" className="justify-start text-gray-600">
          <img
            src={assets.history_icon}
            alt="History"
            className="w-5 h-5 mr-2"
          />
          {isExpanded && <span>History</span>}
        </Button>
        <Button variant="ghost" className="justify-start text-gray-600">
          <img src={assets.setting_icon} alt="Settings" className="w-5 h-5 mr-2" />
          {isExpanded && <span>Settings</span>}
        </Button>
      </nav>
    </aside>
  );
};

export default Sidebar;
