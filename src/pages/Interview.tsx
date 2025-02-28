
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import AIAvatar from "@/components/AIAvatar";
import InterviewPrep from "@/components/InterviewPrep";
import ResumeUpload from "@/components/ResumeUpload";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, Camera, CameraOff, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

// Sample questions for demo - in a real implementation, these would come from AI based on resume analysis
const sampleQuestions = [
  "Tell me about your experience with React and TypeScript.",
  "Describe a challenging project you worked on and how you overcame obstacles.",
  "How do you stay updated with the latest developments in web technologies?",
  "Give an example of how you've collaborated with a cross-functional team.",
  "What's your approach to debugging and troubleshooting issues in your code?"
];

const Interview = () => {
  // Interview stage states
  const [interviewStage, setInterviewStage] = useState<"resume" | "prep" | "interview">("resume");
  const [resumeData, setResumeData] = useState<any>(null);
  
  // Interview process states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [interviewProgress, setInterviewProgress] = useState(0);
  const [responseText, setResponseText] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);
  
  // Media stream references
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  // Clean up media stream when component unmounts
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Only start the interview process if we're in the interview stage
    if (interviewStage === "interview") {
      // Simulate AI asking the first question after a delay
      const timer = setTimeout(() => {
        setAiSpeaking(true);
        
        // Simulate AI finishing speaking after 4 seconds
        setTimeout(() => {
          setAiSpeaking(false);
        }, 4000);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [interviewStage]);

  useEffect(() => {
    // Update progress based on current question
    const progress = ((currentQuestionIndex) / sampleQuestions.length) * 100;
    setInterviewProgress(progress);
  }, [currentQuestionIndex]);

  const handleMicToggle = () => {
    setMicEnabled(!micEnabled);
    
    // If we're turning off the mic during a response, end the recording
    if (userSpeaking && micEnabled) {
      stopRecording();
    }
  };

  const handleCameraToggle = () => {
    setCameraEnabled(!cameraEnabled);
    
    // Update video tracks if we have a media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !cameraEnabled;
      });
    }
  };

  const handleAudioToggle = () => {
    setAudioEnabled(!audioEnabled);
  };

  const startRecording = async () => {
    try {
      // Request media stream if we don't have one yet
      if (!mediaStreamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: true,
          video: cameraEnabled
        });
        mediaStreamRef.current = stream;
      }
      
      // Create media recorder
      const mediaRecorder = new MediaRecorder(mediaStreamRef.current);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      // Set up event handlers
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Start recording
      mediaRecorder.start(100); // Collect data every 100ms
      setUserSpeaking(true);
      
      // Start simulating transcript generation
      simulateTranscription();
      
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Failed to access microphone. Please check your settings and try again.");
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setUserSpeaking(false);
      
      // In a real implementation, we would send the audio to a speech-to-text service
      // For now, we'll just continue with our simulation
      setTimeout(() => {
        if (currentQuestionIndex < sampleQuestions.length - 1) {
          moveToNextQuestion();
        } else {
          finishInterview();
        }
      }, 1500);
    }
  };
  
  const simulateTranscription = () => {
    // Generate a random response simulation
    const mockResponses = [
      "I have 5 years of experience with React, including 3 years with TypeScript. I've built several enterprise applications using these technologies, focusing on performance optimization and component reusability. I've also implemented complex state management solutions using Redux and Context API.",
      "One challenging project I worked on was migrating a large e-commerce platform from a legacy codebase to React. The main obstacle was maintaining all existing functionality while improving performance. I approached this by creating a detailed migration plan and implementing changes incrementally, allowing for continuous testing and validation.",
      "I stay updated by following key developers on Twitter, subscribing to newsletters like JavaScript Weekly, and regularly attending meetups and conferences. I also dedicate a few hours each week to explore new libraries and techniques through hands-on experimentation.",
      "In my previous role, I collaborated with a team of designers, backend developers, and product managers to deliver a complex financial dashboard. I facilitated communication by organizing weekly sync meetings and creating shared documentation. This approach helped us identify and resolve cross-functional dependencies early.",
      "My debugging approach starts with reproducing the issue in a controlled environment. I use browser developer tools to inspect network activity, console logs, and component state. For more complex issues, I implement logging at critical points and use tools like React DevTools to understand component behavior."
    ];
    
    const currentResponse = mockResponses[currentQuestionIndex % mockResponses.length];
    let currentText = "";
    const words = currentResponse.split(" ");
    
    // Simulate incremental transcription
    const textInterval = setInterval(() => {
      if (words.length > 0 && userSpeaking) {
        currentText += words.shift() + " ";
        setResponseText(currentText);
      } else {
        clearInterval(textInterval);
      }
    }, 150);
  };
  
  const moveToNextQuestion = () => {
    // Clear previous response
    setResponseText("");
    
    // Move to next question
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    
    // AI asks the next question
    setAiSpeaking(true);
    setTimeout(() => {
      setAiSpeaking(false);
    }, 4000);
  };
  
  const finishInterview = () => {
    toast.success("Interview completed! Generating your results...");
    
    // In a real implementation, we would send all responses to the backend for analysis
    // For now, just simulate completion
    setTimeout(() => {
      // In a real app, we would redirect to a results page
      toast.success("Your interview has been analyzed. Check your dashboard for results!");
    }, 3000);
  };

  const handleUserResponse = () => {
    if (userSpeaking) {
      // Stop recording if already speaking
      stopRecording();
    } else {
      // Start recording
      startRecording();
    }
  };
  
  const handleResumeUpload = (data: any) => {
    setResumeData(data);
    toast.success("Resume analyzed successfully!");
    setInterviewStage("prep");
  };
  
  const handlePrepComplete = () => {
    setInterviewStage("interview");
  };

  // Render different content based on the current stage
  const renderContent = () => {
    switch (interviewStage) {
      case "resume":
        return (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Upload Your Resume</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Please upload your resume so we can generate personalized interview questions based on your experience and skills.
            </p>
            <ResumeUpload onUploadComplete={handleResumeUpload} />
          </div>
        );
        
      case "prep":
        return (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Prepare for Your Interview</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Let's make sure your camera, microphone, and speakers are working properly before we begin.
            </p>
            <InterviewPrep onReady={handlePrepComplete} />
          </div>
        );
        
      case "interview":
        return (
          <>
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
                  <AIAvatar 
                    speaking={aiSpeaking} 
                    onStatusChange={(status) => {
                      // In a real implementation, we might use this to coordinate UI state
                      console.log("AI status changed:", status);
                    }}
                  />
                  
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
                        title={audioEnabled ? "Mute AI" : "Unmute AI"}
                      >
                        {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`p-2 ${!cameraEnabled && "bg-gray-100 dark:bg-gray-700"}`}
                        onClick={handleCameraToggle}
                        title={cameraEnabled ? "Turn off camera" : "Turn on camera"}
                      >
                        {cameraEnabled ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`p-2 ${!micEnabled && "bg-gray-100 dark:bg-gray-700"}`}
                        onClick={handleMicToggle}
                        title={micEnabled ? "Mute microphone" : "Unmute microphone"}
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
                      disabled={aiSpeaking || !micEnabled}
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
                        <span>{micEnabled ? "Press to Answer" : "Enable microphone to answer"}</span>
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
          </>
        );
        
      default:
        return <div>Unknown stage</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Interview;
