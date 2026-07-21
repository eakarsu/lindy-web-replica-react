import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-lindy-light py-10">
    <div className="container-custom flex flex-col items-center justify-between gap-5 text-center text-sm text-lindy-gray md:flex-row md:text-left">
      <p>Independent interface workflow evaluation. No affiliation, product breadth, or certification is asserted.</p>
      <nav className="flex flex-wrap justify-center gap-5" aria-label="Footer navigation">
        <Link to="/contact" className="hover:text-lindy-primary">Request a demo</Link>
        <Link to="/requests" className="hover:text-lindy-primary">Reviewer sign in</Link>
        <Link to="/privacy" className="hover:text-lindy-primary">Privacy notice</Link>
        <Link to="/security" className="hover:text-lindy-primary">Security</Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
