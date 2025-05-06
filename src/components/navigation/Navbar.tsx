
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="border-b border-gray-100 py-4">
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-lindy-primary">Lindy</span>
          <span className="text-2xl font-bold text-lindy-secondary">.ai</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="space-x-6">
            <Link to="/" className="text-lindy-secondary hover:text-lindy-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-lindy-secondary hover:text-lindy-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/pricing" className="text-lindy-secondary hover:text-lindy-primary transition-colors font-medium">
              Pricing
            </Link>
            <Link to="/contact" className="text-lindy-secondary hover:text-lindy-primary transition-colors font-medium">
              Contact
            </Link>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" className="font-medium">
              Log in
            </Button>
            <Button className="bg-lindy-primary hover:bg-opacity-90 font-medium">
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-lindy-secondary"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden pt-2 pb-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-lindy-secondary hover:text-lindy-primary py-2 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-lindy-secondary hover:text-lindy-primary py-2 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/pricing" 
              className="text-lindy-secondary hover:text-lindy-primary py-2 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className="text-lindy-secondary hover:text-lindy-primary py-2 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="w-full justify-center font-medium">
                Log in
              </Button>
              <Button className="w-full justify-center bg-lindy-primary hover:bg-opacity-90 font-medium">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
