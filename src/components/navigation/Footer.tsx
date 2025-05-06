
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-lindy-light pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-lindy-primary">Lindy</span>
              <span className="text-2xl font-bold text-lindy-secondary">.ai</span>
            </Link>
            <p className="mt-4 text-lindy-gray max-w-md">
              Lindy.ai is an AI-powered platform that helps businesses streamline their operations, 
              automate routine tasks, and make data-driven decisions.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-lindy-secondary mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-lindy-secondary mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-lindy-secondary mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-lindy-gray text-sm">
            &copy; {new Date().getFullYear()} Lindy.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
