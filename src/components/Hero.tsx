
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, PlayCircle, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-20 pb-16 sm:pb-24 lg:pb-32 hero-gradient">
      <div className="container mx-auto px-4 pt-16 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-left animate-fade-in">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-vocalhire-100 text-vocalhire-700 text-sm font-medium">
                AI-Powered Interviews
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Transform Hiring with{" "}
              <span className="text-gradient">
                AI-Driven Video Interviews
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              VocalHire automates candidate screening with AI avatars that conduct personalized interviews based on their resume, providing intelligent feedback and scoring.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/auth?mode=signup">
                <Button className="btn-primary flex items-center gap-2">
                  <span>Get Started Free</span>
                  <ChevronRight size={18} />
                </Button>
              </Link>
              <Button variant="outline" className="btn-secondary flex items-center gap-2">
                <PlayCircle size={18} />
                <span>Watch Demo</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "No credit card required",
                "14-day free trial",
                "Cancel anytime"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-vocalhire-500" size={16} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:pl-12 animate-fade-in-up animate-delay-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-vocalhire-300 to-blue-300 rounded-2xl blur-lg opacity-30 animate-pulse-slow"></div>
              <div className="glass-card rounded-2xl p-3 relative">
                <div className="bg-gray-900 rounded-xl overflow-hidden relative aspect-[4/3]">
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <div className="w-16 h-16 rounded-full bg-vocalhire-500/20 flex items-center justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-vocalhire-500/40 flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <p className="text-lg font-semibold">See how it works</p>
                    <p className="text-sm text-gray-300">2:45 mins</p>
                  </div>
                  <div className="absolute bottom-4 left-4 glass-card px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Live AI Interview</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 glass-card p-3 rounded-lg shadow-lg max-w-[200px] animate-float">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-vocalhire-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-vocalhire-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">Accurate Analysis</p>
                    <p className="text-xs text-gray-500">AI evaluates candidate responses</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -left-6 glass-card p-3 rounded-lg shadow-lg max-w-[200px] animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3Z" />
                      <path d="M14 12 8 9v6l6-3Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">AI Avatar</p>
                    <p className="text-xs text-gray-500">Conducts your interviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-24 animate-fade-in animate-delay-4">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Trusted by innovative teams</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 flex items-center justify-center">
              <div className="h-full w-24 bg-gray-200 dark:bg-gray-800 rounded-md opacity-40"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
