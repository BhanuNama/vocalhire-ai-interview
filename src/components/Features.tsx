
import { CheckCircle, Upload, Video, BarChart, LayoutDashboard, User } from "lucide-react";

const features = [
  {
    icon: <Upload className="h-6 w-6 text-vocalhire-500" />,
    title: "Resume Analysis",
    description: "AI extracts skills, experience, and keywords from your resume, creating personalized interview questions.",
    highlights: ["PDF/DOCX support", "Skill extraction", "Keyword matching"]
  },
  {
    icon: <Video className="h-6 w-6 text-vocalhire-500" />,
    title: "AI-Driven Interviews",
    description: "Our AI avatar conducts dynamic video interviews with real-time transcription and emotional analysis.",
    highlights: ["AI Avatar interaction", "Adaptive questioning", "Real-time feedback"]
  },
  {
    icon: <BarChart className="h-6 w-6 text-vocalhire-500" />,
    title: "Performance Scoring",
    description: "Get comprehensive assessment of technical knowledge, communication skills, and job relevance.",
    highlights: ["Multi-factor evaluation", "Detailed feedback", "Improvement suggestions"]
  },
  {
    icon: <LayoutDashboard className="h-6 w-6 text-vocalhire-500" />,
    title: "Recruiter Dashboard",
    description: "Easily view candidate performance metrics and manage applications with our intuitive dashboard.",
    highlights: ["Performance metrics", "Candidate comparison", "Exportable reports"]
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900/60">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Revolutionize Your Hiring Process
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            VocalHire combines advanced AI technology with intuitive design to transform 
            how you interview and evaluate candidates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-vocalhire-50 dark:bg-vocalhire-900/20 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-vocalhire-500 to-vocalhire-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your hiring process?</h3>
                  <p className="opacity-90 mb-6 text-white/80">
                    Join thousands of companies already using VocalHire to save time and find better candidates.
                  </p>
                  <button className="bg-white text-vocalhire-700 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors">
                    Start Free Trial
                  </button>
                </div>
                <div className="md:col-span-2 hidden md:block">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <User className="w-20 h-20 text-white/20" />
                    </div>
                    <div className="aspect-square border-4 border-white/20 rounded-full animate-spin-slow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
