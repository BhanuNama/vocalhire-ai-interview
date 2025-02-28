import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  AlertTriangle,
  Mic,
  Camera,
  Volume2,
  ScreenShare,
  RefreshCw,
  Play,
  Pause,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface SystemCheckResult {
  camera: "pending" | "success" | "error";
  microphone: "pending" | "success" | "error";
  speaker: "pending" | "success" | "error";
  connection: "pending" | "success" | "error";
}

const InterviewPrep = ({ onReady }: { onReady: () => void }) => {
  const [systemCheck, setSystemCheck] = useState<SystemCheckResult>({
    camera: "pending",
    microphone: "pending",
    speaker: "pending",
    connection: "pending",
  });
  const [isChecking, setIsChecking] = useState(false);
  const [checkProgress, setCheckProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const testAudioSrc = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const testCamera = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      streamRef.current = stream;
      return true;
    } catch (error) {
      console.error("Camera access error:", error);
      return false;
    }
  };

  const testMicrophone = async (): Promise<boolean> => {
    try {
      if (streamRef.current && streamRef.current.getAudioTracks().length > 0) {
        return true;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      if (streamRef.current) {
        stream.getAudioTracks().forEach(track => {
          streamRef.current?.addTrack(track);
        });
      } else {
        streamRef.current = stream;
      }
      
      return true;
    } catch (error) {
      console.error("Microphone access error:", error);
      return false;
    }
  };

  const testSpeaker = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.onended = () => resolve(true);
        audioRef.current.onerror = () => resolve(false);
        
        audioRef.current.play().catch((error) => {
          console.error("Speaker test error:", error);
          resolve(false);
        });
      } else {
        resolve(false);
      }
    });
  };

  const testConnection = async (): Promise<boolean> => {
    try {
      const response = await fetch('https://www.google.com', { 
        mode: 'no-cors',
        cache: 'no-cache'
      });
      return true;
    } catch (error) {
      console.error("Connection test error:", error);
      return false;
    }
  };

  const runSystemCheck = async () => {
    setIsChecking(true);
    setCheckProgress(0);
    setSystemCheck({
      camera: "pending",
      microphone: "pending",
      speaker: "pending",
      connection: "pending",
    });

    setCheckProgress(10);
    const connectionResult = await testConnection();
    setSystemCheck((prev) => ({ ...prev, connection: connectionResult ? "success" : "error" }));
    
    setCheckProgress(30);
    const cameraResult = await testCamera();
    setSystemCheck((prev) => ({ ...prev, camera: cameraResult ? "success" : "error" }));
    
    setCheckProgress(60);
    const microphoneResult = await testMicrophone();
    setSystemCheck((prev) => ({ ...prev, microphone: microphoneResult ? "success" : "error" }));
    
    setCheckProgress(80);
    const speakerResult = await testSpeaker();
    setSystemCheck((prev) => ({ ...prev, speaker: speakerResult ? "success" : "error" }));
    
    setCheckProgress(100);
    setIsChecking(false);
    
    const allSuccess = cameraResult && microphoneResult && speakerResult && connectionResult;
    
    if (allSuccess) {
      toast.success("All systems are ready for the interview!");
    } else {
      toast.error("Some device checks failed. Please ensure all devices are connected and permissions are granted.");
    }
  };

  const allChecksSuccessful = Object.values(systemCheck).every(
    (status) => status === "success"
  );

  const renderStatusIcon = (status: "pending" | "success" | "error") => {
    if (status === "pending") {
      return <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600"></div>;
    } else if (status === "success") {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else {
      return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <Card className="bg-white dark:bg-slate-800 border shadow-sm p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">System Check</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Let's make sure your device is ready for the interview
        </p>
      </div>

      <div className={`${isChecking ? "block" : "hidden"} relative mb-6 rounded-lg overflow-hidden bg-black`}>
        <video 
          ref={videoRef} 
          className="w-full h-48 object-cover"
          muted
          playsInline
        ></video>
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          Camera Preview
        </div>
      </div>

      <audio ref={audioRef} src={testAudioSrc} className="hidden"></audio>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium">Camera</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Required for video interview
                </p>
              </div>
            </div>
            {renderStatusIcon(systemCheck.camera)}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Mic className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-medium">Microphone</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Required for voice responses
                </p>
              </div>
            </div>
            {renderStatusIcon(systemCheck.microphone)}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium">Speakers</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Required to hear questions
                </p>
              </div>
            </div>
            {renderStatusIcon(systemCheck.speaker)}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <ScreenShare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="font-medium">Connection</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Stable internet connection
                </p>
              </div>
            </div>
            {renderStatusIcon(systemCheck.connection)}
          </div>
        </div>
      </div>

      {isChecking && (
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Checking system...
            </span>
            <span className="text-gray-700 dark:text-gray-300">{checkProgress}%</span>
          </div>
          <Progress value={checkProgress} className="h-2" />
        </div>
      )}

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        {!allChecksSuccessful ? (
          <Button
            onClick={runSystemCheck}
            className="w-full flex items-center justify-center gap-2"
            disabled={isChecking}
          >
            {isChecking ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>Start System Check</>
            )}
          </Button>
        ) : (
          <>
            <Button
              onClick={runSystemCheck}
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Run Check Again
            </Button>
            <Button
              onClick={onReady}
              className="flex-1 bg-vocalhire-500 hover:bg-vocalhire-600"
            >
              Continue to Interview
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default InterviewPrep;
