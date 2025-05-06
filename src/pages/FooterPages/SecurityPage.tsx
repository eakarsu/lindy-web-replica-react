
import { Link } from "react-router-dom";
import { Shield, Lock, Users } from "lucide-react";

const SecurityPage = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Security at Lindy.ai</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              How we protect your data and maintain the integrity of our platform
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2>Our Security Architecture</h2>
            <p>
              Lindy.ai employs a comprehensive security architecture designed to protect your data at every layer of our technology stack. Our approach combines industry best practices, advanced technologies, and ongoing vigilance to ensure the highest levels of security.
            </p>
            
            <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-lindy-light p-6 rounded-xl">
                <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-4">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Infrastructure Security</h3>
                <p className="text-lindy-gray">
                  Our systems are hosted in secure, SOC 2 compliant data centers with 24/7 monitoring, redundant power systems, and advanced physical security measures.
                </p>
              </div>
              
              <div className="bg-lindy-light p-6 rounded-xl">
                <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Application Security</h3>
                <p className="text-lindy-gray">
                  We employ strict secure coding practices, regular security testing, and automated vulnerability scanning to maintain the integrity of our platform.
                </p>
              </div>
            </div>
            
            <h2>Data Protection</h2>
            <p>
              Protecting your data is our highest priority. We implement comprehensive measures to ensure your information remains secure:
            </p>
            
            <ul>
              <li><strong>Encryption:</strong> All data is encrypted during transmission using TLS 1.3 and at rest using AES-256 encryption.</li>
              <li><strong>Access Controls:</strong> We enforce strict role-based access controls and follow the principle of least privilege.</li>
              <li><strong>Data Isolation:</strong> Your data is logically isolated from other customers' data in our multi-tenant architecture.</li>
              <li><strong>Backup and Recovery:</strong> Regular automated backups with tested recovery procedures to prevent data loss.</li>
              <li><strong>Data Retention:</strong> Clear policies governing how long we retain your data and secure deletion practices.</li>
            </ul>
            
            <h2>Authentication and Access</h2>
            <p>
              We implement robust authentication mechanisms to ensure only authorized users can access your account:
            </p>
            
            <ul>
              <li><strong>Multi-factor Authentication:</strong> Additional security layer beyond password protection.</li>
              <li><strong>Single Sign-On:</strong> Support for enterprise SSO solutions like Okta and Azure AD.</li>
              <li><strong>Password Policies:</strong> Enforcement of strong password requirements and secure password handling.</li>
              <li><strong>Session Management:</strong> Automatic timeout of inactive sessions and secure session handling.</li>
            </ul>
            
            <h2>Continuous Monitoring and Incident Response</h2>
            <p>
              Our security operations include:
            </p>
            
            <ul>
              <li><strong>24/7 Monitoring:</strong> Continuous monitoring of our systems for suspicious activities or unauthorized access attempts.</li>
              <li><strong>Intrusion Detection:</strong> Advanced systems to detect potential security breaches.</li>
              <li><strong>Incident Response:</strong> Documented procedures for responding to security incidents, including notification protocols.</li>
              <li><strong>Security Logging:</strong> Comprehensive logging of system activities for security analysis and forensic investigations.</li>
            </ul>
            
            <h2>Security Testing and Validation</h2>
            <p>
              We regularly test our security measures through:
            </p>
            
            <ul>
              <li><strong>Penetration Testing:</strong> Regular third-party penetration testing to identify and address potential vulnerabilities.</li>
              <li><strong>Vulnerability Scanning:</strong> Automated scanning of our infrastructure and applications.</li>
              <li><strong>Security Audits:</strong> Comprehensive review of our security controls and practices.</li>
              <li><strong>Bug Bounty Program:</strong> Collaboration with security researchers to identify and resolve security issues.</li>
            </ul>
            
            <h2>Employee Security</h2>
            <p>
              Our security extends to our team members:
            </p>
            
            <div className="flex items-start my-6">
              <Users className="h-8 w-8 mr-4 text-lindy-secondary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Security Training</h3>
                <p>
                  All employees undergo regular security awareness training to stay current on threats and best practices.
                </p>
              </div>
            </div>
            
            <div className="flex items-start my-6">
              <Shield className="h-8 w-8 mr-4 text-lindy-secondary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Background Checks</h3>
                <p>
                  We conduct thorough background checks on all employees before hiring.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p>
                For more detailed information about our security practices, please review our <Link to="/trust-center" className="text-lindy-primary">Trust Center</Link> or <Link to="/contact" className="text-lindy-primary">contact our security team</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityPage;
