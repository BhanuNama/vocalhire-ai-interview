
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AIAvatar from "@/components/AIAvatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, Camera, CameraOff, Volume2, VolumeX } from "lucide-react";

const sampleQuestions = [
  "Tell me about your experience with React and TypeScript.",
  "Describe a challenging project you worked on and how you overcame obstacles.",
  "How do you stay updated with the latest developments in web technologies?",
  "Give an example of how you've collaborated with a cross-functional team.",
  "What's your approach to debugging and troubleshooting issues in your code?"
];

const Interview = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [interviewProgress, setInterviewProgress] = useState(0);
  const [responseText, setResponseText] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    // Simulate AI asking the first question after a delay
    const timer = setTimeout(() => {
      setAiSpeaking(true);
      
      // Simulate AI finishing speaking after 4 seconds
      setTimeout(() => {
        setAiSpeaking(false);
      }, 4000);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update progress based on current question
    const progress = ((currentQuestionIndex) / sampleQuestions.length) * 100;
    setInterviewProgress(progress);
  }, [currentQuestionIndex]);

  const handleMicToggle = () => {
    setMicEnabled(!micEnabled);
  };

  const handleCameraToggle = () => {
    setCameraEnabled(!cameraEnabled);
  };

  const handleAudioToggle = () => {
    setAudioEnabled(!audioEnabled);
  };

  const handleUserResponse = () => {
    // Simulate user speaking
    setUserSpeaking(true);
    
    // Generate a random response simulation
    const mockResponse = "I have 5 years of experience with React, including 3 years with TypeScript. I've built several enterprise applications using these technologies, focusing on performance optimization and component reusability. I've also implemented complex state management solutions using Redux and Context API.";
    
    let currentText = "";
    const words = mockResponse.split(" ");
    
    // Simulate incremental transcription
    const textInterval = setInterval(() => {
      if (words.length > 0) {
        currentText += words.shift() + " ";
        setResponseText(currentText);
      } else {
        clearInterval(textInterval);
        
        // After response is complete
        setTimeout(() => {
          setUserSpeaking(false);
          
          // Move to next question after a delay
          if (currentQuestionIndex < sampleQuestions.length - 1) {
            setTimeout(() => {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              setResponseText("");
              
              // AI asks the next question
              setAiSpeaking(true);
              setTimeout(() => {
                setAiSpeaking(false);
              }, 4000);
            }, 1500);
          }
        }, 1000);
      }
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">AI Interview Session</h1>
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                Question {currentQuestionIndex + 1} of {sampleQuestions.length}
              </div>
            </div>
            <Progress value={interviewProgress} className="h-2 mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-md p-4">
                <AIAvatar speaking={aiSpeaking} />
                
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {aiSpeaking ? "AI is speaking..." : "AI is listening..."}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`p-2 ${!audioEnabled && "bg-gray-100 dark:bg-gray-700"}`}
                      onClick={handleAudioToggle}
                    >
                      {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`p-2 ${!cameraEnabled && "bg-gray-100 dark:bg-gray-700"}`}
                      onClick={handleCameraToggle}
                    >
                      {cameraEnabled ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`p-2 ${!micEnabled && "bg-gray-100 dark:bg-gray-700"}`}
                      onClick={handleMicToggle}
                    >
                      {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 shadow-md">
                <h2 className="text-lg font-semibold mb-3">Current Question</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {sampleQuestions[currentQuestionIndex]}
                </p>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-md font-medium">Your Response</h3>
                    <button
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="text-sm text-vocalhire-600 hover:text-vocalhire-700"
                    >
                      {showTranscript ? "Hide Transcript" : "Show Transcript"}
                    </button>
                  </div>
                  
                  {showTranscript && (
                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4 text-sm min-h-24">
                      {responseText || <span className="text-gray-400 italic">Your response will appear here...</span>}
                      {userSpeaking && (
                        <span className="inline-block w-2 h-4 bg-vocalhire-500 ml-1 animate-pulse"></span>
                      )}
                    </div>
                  )}
                  
                  <Button
                    onClick={handleUserResponse}
                    className={`w-full h-12 ${
                      userSpeaking 
                        ? "bg-red-500 hover:bg-red-600" 
                        : "bg-vocalhire-500 hover:bg-vocalhire-600"
                    }`}
                    disabled={aiSpeaking}
                  >
                    {userSpeaking ? (
                      <div className="flex items-center">
                        <span className="mr-2">Recording</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    ) : (
                      <span>Press to Answer</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 shadow-md">
                <h2 className="text-lg font-semibold mb-4">Interview Progress</h2>
                <div className="space-y-3">
                  {sampleQuestions.map((question, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                        index < currentQuestionIndex 
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600" 
                          : index === currentQuestionIndex 
                            ? "bg-vocalhire-100 dark:bg-vocalhire-900/30 text-vocalhire-600 border border-vocalhire-300" 
                            : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                      }`}>
                        <span className="text-xs font-medium">{index + 1}</span>
                      </div>
                      <p className={`text-sm ${
                        index < currentQuestionIndex 
                          ? "text-gray-500 line-through" 
                          : index === currentQuestionIndex 
                            ? "font-medium" 
                            : "text-gray-500"
                      }`}>
                        {question.length > 60 ? question.substring(0, 60) + "..." : question}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 shadow-md">
                <h2 className="text-lg font-semibold mb-4">Tips for This Question</h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-vocalhire-500 mr-2 flex-shrink-0">•</span>
                    Be specific about your experience with technologies mentioned
                  </li>
                  <li className="flex items-start">
                    <span className="text-vocalhire-500 mr-2 flex-shrink-0">•</span>
                    Include relevant projects you've worked on
                  </li>
                  <li className="flex items-start">
                    <span className="text-vocalhire-500 mr-2 flex-shrink-0">•</span>
                    Highlight your problem-solving approach
                  </li>
                  <li className="flex items-start">
                    <span className="text-vocalhire-500 mr-2 flex-shrink-0">•</span>
                    Mention your learning methodology
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Interview;
