
import { Link } from "react-router-dom";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-display font-bold text-vocalhire-600">
                Vocal<span className="text-vocalhire-800">Hire</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              AI-powered video interviews that transform your hiring process.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-vocalhire-500 transition-colors">
                <GithubIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-vocalhire-500 transition-colors">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-vocalhire-500 transition-colors">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Product</h3>
                <ul className="space-y-3">
                  {["Features", "Pricing", "Case Studies", "Reviews", "Updates"].map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-vocalhire-500 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-3">
                  {["About", "Team", "Careers", "Press", "Contact"].map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-vocalhire-500 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Resources</h3>
                <ul className="space-y-3">
                  {["Blog", "Support", "Documentation", "Privacy", "Terms"].map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-vocalhire-500 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} VocalHire. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-vocalhire-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-vocalhire-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-vocalhire-500 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
