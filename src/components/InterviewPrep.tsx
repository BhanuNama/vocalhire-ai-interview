
import { useState } from "react";
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
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

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

  const runSystemCheck = () => {
    setIsChecking(true);
    setCheckProgress(0);
    setSystemCheck({
      camera: "pending",
      microphone: "pending",
      speaker: "pending",
      connection: "pending",
    });

    // Simulate system check
    const interval = setInterval(() => {
      setCheckProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsChecking(false);
          return 100;
        }
        return newProgress;
      });
    }, 150);

    // Simulate camera check
    setTimeout(() => {
      setSystemCheck((prev) => ({ ...prev, camera: "success" }));
    }, 1000);

    // Simulate microphone check
    setTimeout(() => {
      setSystemCheck((prev) => ({ ...prev, microphone: "success" }));
    }, 2000);

    // Simulate speaker check
    setTimeout(() => {
      setSystemCheck((prev) => ({ ...prev, speaker: "success" }));
    }, 3000);

    // Simulate connection check
    setTimeout(() => {
      setSystemCheck((prev) => ({ ...prev, connection: "success" }));
    }, 4000);
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
