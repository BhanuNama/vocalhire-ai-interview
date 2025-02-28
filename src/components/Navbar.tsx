
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-2 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 shadow-sm" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-display font-bold text-vocalhire-600">
            Vocal<span className="text-vocalhire-800">Hire</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" currentPath={location.pathname} />
          <NavLink to="/features" label="Features" currentPath={location.pathname} />
          <NavLink to="/pricing" label="Pricing" currentPath={location.pathname} />
          <NavLink to="/about" label="About" currentPath={location.pathname} />
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth?mode=login">
            <Button variant="outline" className="font-medium">
              Log In
            </Button>
          </Link>
          <Link to="/auth?mode=signup">
            <Button className="bg-vocalhire-500 hover:bg-vocalhire-600 font-medium">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-vocalhire-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-lg p-4 border-t border-gray-100 dark:border-slate-800 animate-fade-in">
          <nav className="flex flex-col space-y-4 mb-6">
            <MobileNavLink to="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/features" label="Features" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/pricing" label="Pricing" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/about" label="About" onClick={() => setMobileMenuOpen(false)} />
          </nav>
          <div className="flex flex-col space-y-3">
            <Link to="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center font-medium">
                Log In
              </Button>
            </Link>
            <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center bg-vocalhire-500 hover:bg-vocalhire-600 font-medium">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, label, currentPath }: { to: string; label: string; currentPath: string }) => {
  const isActive = currentPath === to || (to !== "/" && currentPath.startsWith(to));
  
  return (
    <Link
      to={to}
      className={`font-medium text-sm transition-colors hover:text-vocalhire-600 ${
        isActive ? "text-vocalhire-600" : "text-gray-700 dark:text-gray-300"
      }`}
    >
      {label}
    </Link>
  );
};

const MobileNavLink = ({ to, label, onClick }: { to: string; label: string; onClick: () => void }) => (
  <Link
    to={to}
    className="block py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-vocalhire-600 dark:hover:text-vocalhire-400 transition-colors"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;
