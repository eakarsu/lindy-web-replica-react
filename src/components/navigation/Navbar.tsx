import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { to: "/", label: "Overview" },
  { to: "/contact", label: "Request a demo" },
  { to: "/security", label: "Security" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="border-b border-gray-100 py-4" aria-label="Primary navigation">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Workflow overview">
          <span className="text-2xl font-bold text-lindy-primary">Lindy</span><span className="text-2xl font-bold text-lindy-secondary"> workflow</span>
        </Link>
        <div className="hidden items-center space-x-6 md:flex">
          {navigation.map((item) => <Link key={item.to} to={item.to} className="font-medium text-lindy-secondary transition-colors hover:text-lindy-primary">{item.label}</Link>)}
          <Button asChild variant="outline"><Link to="/requests">Reviewer sign in</Link></Button>
        </div>
        <button type="button" className="text-lindy-secondary md:hidden" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div id="mobile-navigation" className="container-custom flex flex-col space-y-3 pb-4 pt-4 md:hidden">
          {navigation.map((item) => <Link key={item.to} to={item.to} className="py-2 font-medium text-lindy-secondary" onClick={() => setIsOpen(false)}>{item.label}</Link>)}
          <Link to="/requests" className="py-2 font-medium text-lindy-secondary" onClick={() => setIsOpen(false)}>Reviewer sign in</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
