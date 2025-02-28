
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff, Mail, Lock, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  mode: "login" | "signup";
  onSuccess?: () => void;
}

const AuthForm = ({ mode, onSuccess }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: mode === "login" ? "Welcome back!" : "Account created successfully!",
        description: mode === "login" 
          ? "You've successfully logged in."
          : "Your account has been created. Welcome to VocalHire!",
      });
      
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={handleChange}
              className="h-12"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              className="h-12 pl-10"
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            {mode === "login" && (
              <a href="#" className="text-sm text-vocalhire-600 hover:text-vocalhire-800 transition-colors">
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={mode === "login" ? "Enter your password" : "Create a password"}
              required
              value={formData.password}
              onChange={handleChange}
              className="h-12 pl-10"
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full h-12 text-base bg-vocalhire-500 hover:bg-vocalhire-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === "login" ? "Signing in..." : "Creating account..."}
            </>
          ) : (
            <>{mode === "login" ? "Sign In" : "Create Account"}</>
          )}
        </Button>
      </form>
      
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-12">
          <Github className="mr-2 h-5 w-5" />
          Github
        </Button>
        <Button variant="outline" className="h-12">
          <Linkedin className="mr-2 h-5 w-5" />
          LinkedIn
        </Button>
      </div>
      
      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <a 
          href={mode === "login" ? "/auth?mode=signup" : "/auth?mode=login"} 
          className="font-medium text-vocalhire-600 hover:text-vocalhire-800 transition-colors"
        >
          {mode === "login" ? "Sign up" : "Sign in"}
        </a>
      </p>
    </div>
  );
};

export default AuthForm;
