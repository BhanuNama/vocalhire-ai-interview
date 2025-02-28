
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResumeUpload from "@/components/ResumeUpload";
import InterviewPrep from "@/components/InterviewPrep";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";

const Dashboard = () => {
  const [uploadComplete, setUploadComplete] = useState(false);
  const [systemCheckComplete, setSystemCheckComplete] = useState(false);
  const navigate = useNavigate();

  const handleUploadComplete = (fileData: any) => {
    console.log("Resume uploaded:", fileData);
    setUploadComplete(true);
  };

  const handleSystemCheckComplete = () => {
    setSystemCheckComplete(true);
  };

  const startInterview = () => {
    navigate("/interview");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Interview Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Follow these steps to prepare for your AI-driven interview
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Interview Preparation</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      uploadComplete 
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                    }`}>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Resume Upload</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Upload your resume for AI analysis and personalized questions
                      </p>
                      {uploadComplete && (
                        <div className="flex items-center text-green-600 dark:text-green-400 text-sm mb-2">
                          <FileText className="h-4 w-4 mr-2" />
                          Resume uploaded and analyzed
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      systemCheckComplete 
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        : uploadComplete 
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-500" 
                          : "bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-700"
                    }`}>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium mb-1 ${!uploadComplete && "text-gray-400 dark:text-gray-600"}`}>
                        System Check
                      </h3>
                      <p className={`text-sm mb-4 ${
                        uploadComplete 
                          ? "text-gray-500 dark:text-gray-400" 
                          : "text-gray-400 dark:text-gray-600"
                      }`}>
                        Verify your camera, microphone and internet connection
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      systemCheckComplete 
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-500" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-700"
                    }`}>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium mb-1 ${
                        !systemCheckComplete && "text-gray-400 dark:text-gray-600"
                      }`}>
                        Start Interview
                      </h3>
                      <p className={`text-sm mb-4 ${
                        systemCheckComplete 
                          ? "text-gray-500 dark:text-gray-400" 
                          : "text-gray-400 dark:text-gray-600"
                      }`}>
                        Begin your AI-powered interview session
                      </p>
                      
                      {systemCheckComplete && (
                        <Button 
                          onClick={startInterview}
                          className="bg-vocalhire-500 hover:bg-vocalhire-600 flex items-center gap-2"
                        >
                          Start Interview
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {!uploadComplete ? (
                <ResumeUpload onUploadComplete={handleUploadComplete} />
              ) : !systemCheckComplete ? (
                <InterviewPrep onReady={handleSystemCheckComplete} />
              ) : (
                <div className="bg-vocalhire-50 dark:bg-vocalhire-900/20 border border-vocalhire-100 dark:border-vocalhire-800/30 rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-vocalhire-800 dark:text-vocalhire-300 mb-4">Ready for Interview!</h3>
                  <p className="text-sm text-vocalhire-700 dark:text-vocalhire-400 mb-4">
                    Your resume has been analyzed and your system is ready. Click the "Start Interview" button to begin.
                  </p>
                  <Button 
                    onClick={startInterview} 
                    className="w-full bg-vocalhire-500 hover:bg-vocalhire-600 flex items-center justify-center gap-2"
                  >
                    Start Interview
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Interview Tips</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-vocalhire-500 mr-2 flex-shrink-0">•</span>
                    Find a quiet, well-lit location with minimal background noise
                  </li>
                  <li className="flex items-start">
                    <span className="text-vocalhire-500 mr-2 flex-shrink-0">•</span>
                    Ensure your face is clearly visible and centered in the camera
                  </li>
                  <li className="flex items-start">
                    <span className="text-vocalhire-500 mr-2 flex-shrink-0">•</span>
                    Speak clearly and at a moderate pace
                  </li>
                  <li className="flex items-start">
                    <span className="text-vocalhire-500 mr-2 flex-shrink-0">•</span>
                    Answer questions thoroughly but try to stay concise
                  </li>
                  <li className="flex items-start">
                    <span className="text-vocalhire-500 mr-2 flex-shrink-0">•</span>
                    Give specific examples from your experience when relevant
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
