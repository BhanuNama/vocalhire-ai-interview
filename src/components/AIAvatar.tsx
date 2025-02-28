
import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AIAvatarProps {
  speaking?: boolean;
  onStatusChange?: (status: "idle" | "speaking" | "listening") => void;
}

const AIAvatar = ({ speaking = false, onStatusChange }: AIAvatarProps) => {
  const [status, setStatus] = useState<"idle" | "speaking" | "listening">(
    speaking ? "speaking" : "idle"
  );
  const [audioEnabled, setAudioEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  
  // Initialize audio context for testing
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      // Clean up audio context
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    setStatus(speaking ? "speaking" : "idle");
    onStatusChange?.(speaking ? "speaking" : "idle");
    
    // Simulate audio output when speaking
    if (speaking && audioEnabled && audioContextRef.current) {
      // Create an oscillator for a simple audio test
      try {
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime); // A4 note
        
        gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime); // Set volume to 10%
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        
        oscillator.start();
        oscillatorRef.current = oscillator;
        
        // Stop after a short duration
        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current = null;
          }
        }, 500); // 500ms of sound
      } catch (error) {
        console.error("Audio playback error:", error);
      }
    }
  }, [speaking, audioEnabled, onStatusChange]);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const togglePlayback = () => {
    // In a real implementation, this would control the AI avatar's speech
    onStatusChange?.(status === "speaking" ? "idle" : "speaking");
    setStatus(status === "speaking" ? "idle" : "speaking");
  };

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
      <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2 text-white">
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
        <button 
          onClick={togglePlayback}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          {status === "speaking" ? (
            <Pause className="h-5 w-5 text-white" />
          ) : (
            <Play className="h-5 w-5 text-white" />
          )}
        </button>
        <button 
          onClick={toggleAudio}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          {audioEnabled ? (
            <Volume2 className="h-5 w-5 text-white" />
          ) : (
            <VolumeX className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
      
      {/* Audio disabled indicator */}
      {!audioEnabled && (
        <div className="absolute top-4 right-4 bg-red-500/80 px-2 py-1 rounded text-white text-xs font-medium">
          Audio Disabled
        </div>
      )}
    </div>
  );
};

export default AIAvatar;
