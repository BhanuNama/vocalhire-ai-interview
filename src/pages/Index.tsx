
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <section className="py-24 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join <span className="text-gradient">Thousands</span> of Companies
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Transform your hiring process with AI-powered interviews that save time and improve candidate selection.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-vocalhire-500 mb-2">85%</div>
                <p className="text-gray-600 dark:text-gray-300">Time saved in the screening process</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-vocalhire-500 mb-2">3.2x</div>
                <p className="text-gray-600 dark:text-gray-300">More candidates evaluated per day</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-vocalhire-500 mb-2">92%</div>
                <p className="text-gray-600 dark:text-gray-300">Hiring manager satisfaction rate</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
