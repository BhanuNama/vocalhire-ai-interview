
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Check, AlertCircle, FileText, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface ResumeUploadProps {
  onUploadComplete?: (fileData: any) => void;
}

const ResumeUpload = ({ onUploadComplete }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    setFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setUploadState("uploading");
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setUploadState("success");
          
          // Simulate API response delay
          setTimeout(() => {
            const mockFileData = {
              filename: file.name,
              fileSize: file.size,
              uploadDate: new Date().toISOString(),
              extractedSkills: ["JavaScript", "React", "TypeScript"],
              jobMatches: ["Frontend Developer", "UI Engineer", "Web Developer"],
            };
            
            onUploadComplete?.(mockFileData);
            
            toast({
              title: "Resume uploaded successfully",
              description: "Your resume has been analyzed and processed.",
            });
          }, 500);
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadState("idle");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileSize = (size: number) => {
    if (size < 1024) {
      return size + ' bytes';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB';
    } else {
      return (size / (1024 * 1024)).toFixed(2) + ' MB';
    }
  };

  return (
    <Card className="bg-white dark:bg-slate-800 border shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Upload Resume</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">PDF or DOCX (Max 5MB)</div>
        </div>
        
        {!file ? (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? "border-vocalhire-500 bg-vocalhire-50 dark:bg-vocalhire-950/20" 
                : "border-gray-300 dark:border-gray-700"
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4 w-16 h-16 rounded-full bg-vocalhire-100 dark:bg-vocalhire-900/30 flex items-center justify-center">
                <Upload className="w-8 h-8 text-vocalhire-600 dark:text-vocalhire-400" />
              </div>
              <p className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
                Drag and drop your resume, or{" "}
                <label className="text-vocalhire-600 hover:text-vocalhire-700 cursor-pointer underline">
                  browse files
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleFileInputChange}
                  />
                </label>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We'll analyze your resume to create personalized interview questions
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="mr-4 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{file.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{getFileSize(file.size)}</p>
              </div>
              {uploadState !== "uploading" && (
                <button
                  onClick={handleRemoveFile}
                  className="ml-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {uploadState === "uploading" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Uploading...</span>
                  <span className="text-gray-700 dark:text-gray-300">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            
            {uploadState === "success" && (
              <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                <Check className="mr-1 h-4 w-4" />
                File uploaded successfully
              </div>
            )}
            
            {uploadState === "error" && (
              <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="mr-1 h-4 w-4" />
                Upload failed. Please try again.
              </div>
            )}
            
            {uploadState === "idle" && (
              <Button 
                onClick={handleUpload} 
                className="w-full bg-vocalhire-500 hover:bg-vocalhire-600"
              >
                Upload & Analyze Resume
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResumeUpload;
