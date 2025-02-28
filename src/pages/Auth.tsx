
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modeParam = params.get("mode");
    if (modeParam === "login" || modeParam === "signup") {
      setMode(modeParam);
    }
  }, [location]);

  const handleAuthSuccess = () => {
    // In a real app, you'd likely want to redirect to a dashboard or profile page
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {mode === "login" ? "Welcome Back" : "Create Your Account"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {mode === "login"
                  ? "Sign in to access your account"
                  : "Join VocalHire to start interviewing candidates"}
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 p-6 md:p-8">
              <AuthForm mode={mode} onSuccess={handleAuthSuccess} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
