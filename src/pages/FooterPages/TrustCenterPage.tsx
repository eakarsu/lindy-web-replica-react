
import { Link } from "react-router-dom";
import { Shield, FileText } from "lucide-react";

const TrustCenterPage = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Trust Center</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Our commitment to security, privacy, and compliance
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2>Our Security Promise</h2>
            <p>
              At Lindy.ai, we understand that trust is essential. We've built our platform with security and privacy as foundational principles, not afterthoughts. Our Trust Center provides transparency into our practices and demonstrates our commitment to protecting your data.
            </p>
            
            <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-lindy-light p-6 rounded-xl">
                <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Security</h3>
                <p className="text-lindy-gray">
                  Enterprise-grade security with end-to-end encryption and regular security assessments.
                </p>
              </div>
              
              <div className="bg-lindy-light p-6 rounded-xl">
                <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Privacy</h3>
                <p className="text-lindy-gray">
                  Strict privacy controls and transparent data practices that put you in control.
                </p>
              </div>
              
              <div className="bg-lindy-light p-6 rounded-xl">
                <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compliance</h3>
                <p className="text-lindy-gray">
                  Adherence to global regulations and industry standards for data protection.
                </p>
              </div>
            </div>
            
            <h2>Compliance Certifications</h2>
            <p>
              We maintain rigorous compliance with industry standards and regulations to ensure the highest level of data protection and security.
            </p>
            
            <div className="my-8 space-y-6">
              <div className="flex items-start">
                <Shield className="h-8 w-8 mr-4 text-lindy-secondary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">SOC 2 Compliance</h3>
                  <p>
                    Our SOC 2 certification verifies that we meet the highest standards for security, availability, processing integrity, confidentiality, and privacy.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-8 w-8 mr-4 text-lindy-secondary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">HIPAA Compliance</h3>
                  <p>
                    For healthcare customers, we ensure that our platform adheres to HIPAA requirements for protecting sensitive patient data.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-8 w-8 mr-4 text-lindy-secondary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">PIPEDA Compliance</h3>
                  <p>
                    We follow the Personal Information Protection and Electronic Documents Act guidelines for Canadian data privacy.
                  </p>
                </div>
              </div>
            </div>
            
            <h2>Security Infrastructure</h2>
            <p>
              Our multi-layered security approach ensures your data is protected at every level:
            </p>
            <ul>
              <li>End-to-end encryption for all data, both in transit and at rest</li>
              <li>Regular penetration testing and security assessments</li>
              <li>24/7 monitoring for suspicious activities</li>
              <li>Multi-factor authentication for all user accounts</li>
              <li>Role-based access controls to protect sensitive information</li>
              <li>Regular security training for all employees</li>
            </ul>
            
            <h2>Data Privacy</h2>
            <p>
              We believe in transparency and giving you control over your data:
            </p>
            <ul>
              <li>Clear privacy policies that explain how we handle your information</li>
              <li>Controls that allow you to manage your data preferences</li>
              <li>Data minimization practices to collect only what's necessary</li>
              <li>Regular data protection impact assessments</li>
            </ul>
            
            <div className="mt-12 text-center">
              <p>
                Have questions about our security practices or compliance certifications? <br />
                <Link to="/contact" className="text-lindy-primary">Contact our security team</Link> or view our detailed <Link to="/privacy" className="text-lindy-primary">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrustCenterPage;
