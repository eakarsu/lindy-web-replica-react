
import { Link } from "react-router-dom";
import { Shield, FileText, Mail, Users, BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-lindy-light pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-lindy-primary">Lindy</span>
              <span className="text-2xl font-bold text-lindy-secondary">.ai</span>
            </Link>
            <p className="mt-4 text-lindy-gray max-w-md">
              Lindy.ai is an AI-powered platform that helps businesses streamline their operations, 
              automate routine tasks, and make data-driven decisions.
            </p>
            
            {/* Compliance badges */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-lindy-secondary" />
                <span className="text-sm text-lindy-gray">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-lindy-secondary" />
                <span className="text-sm text-lindy-gray">HIPAA Compliant</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-lindy-secondary" />
                <span className="text-sm text-lindy-gray">PIPEDA Compliant</span>
              </div>
            </div>
          </div>

          {/* Solutions links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-lindy-secondary mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/solutions/sales" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Sales
                </Link>
              </li>
              <li>
                <Link to="/solutions/email" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Email
                </Link>
              </li>
              <li>
                <Link to="/solutions/customer-support" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link to="/solutions/meetings" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Meetings
                </Link>
              </li>
              <li>
                <Link to="/solutions/medical-scribe" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Medical Scribe
                </Link>
              </li>
              <li>
                <Link to="/solutions/all-tools" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  All Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-lindy-secondary mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/academy" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Academy
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/help-center" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Partners
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
                <Link to="/careers" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/changelog" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Security
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
                <Link to="/privacy" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/trust-center" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Trust Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-lindy-gray hover:text-lindy-primary transition-colors">
                  Terms of Service
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
