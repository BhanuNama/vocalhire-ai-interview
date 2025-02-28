
import { useState, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface AIAvatarProps {
  speaking?: boolean;
  onStatusChange?: (status: "idle" | "speaking" | "listening") => void;
}

const AIAvatar = ({ speaking = false, onStatusChange }: AIAvatarProps) => {
  const [status, setStatus] = useState<"idle" | "speaking" | "listening">(
    speaking ? "speaking" : "idle"
  );

  useEffect(() => {
    setStatus(speaking ? "speaking" : "idle");
    onStatusChange?.(speaking ? "speaking" : "idle");
  }, [speaking, onStatusChange]);

  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-vocalhire-900/50 flex items-center justify-center p-2">
          <div className="w-full h-full rounded-full bg-vocalhire-700 flex items-center justify-center">
            <div 
              className={`${
                status === "speaking" 
                  ? "animate-pulse-slow" 
                  : ""
              }`}
            >
              {status === "speaking" ? (
                <Volume2 className="h-12 w-12 text-white" />
              ) : (
                <Play className="h-12 w-12 text-white" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Avatar status indicator */}
      <div className="absolute bottom-4 left-4 glass-card px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
        <div 
          className={`w-2 h-2 rounded-full ${
            status === "idle" 
              ? "bg-gray-400" 
              : status === "speaking" 
                ? "bg-green-500" 
                : "bg-red-500"
          }`}
        ></div>
        <span>
          {status === "idle" 
            ? "AI Ready" 
            : status === "speaking" 
              ? "AI Speaking" 
              : "Listening"}
        </span>
      </div>

      {/* Controls overlay */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
          {status === "speaking" ? (
            <Pause className="h-5 w-5 text-white" />
          ) : (
            <Play className="h-5 w-5 text-white" />
          )}
        </button>
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
          <Volume2 className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default AIAvatar;
