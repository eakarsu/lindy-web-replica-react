
import React from "react";

const EmailPage = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Email Solutions</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Streamline your email communication with AI-powered tools
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <h2>Revolutionize Your Email Workflow</h2>
              <p>
                Our Email Solution leverages advanced AI to help you write better emails faster, 
                prioritize your inbox, and automate responses to common inquiries.
              </p>
              
              <h3>Key Features</h3>
              <ul>
                <li>AI-powered email composition and suggestions</li>
                <li>Smart inbox prioritization and filtering</li>
                <li>Automated responses to routine questions</li>
                <li>Email analytics and insights</li>
                <li>Integration with your existing email provider</li>
              </ul>
              
              <h3>Benefits</h3>
              <ul>
                <li>Save up to 5 hours per week on email management</li>
                <li>Improve response times by 60%</li>
                <li>Enhance email quality and effectiveness</li>
                <li>Reduce inbox overwhelm and stress</li>
              </ul>
              
              <div className="my-8 p-6 bg-lindy-light rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Ready to transform your email experience?</h3>
                <p className="mb-4">
                  Get started with our Email Solution today to reclaim your time and improve your communication.
                </p>
                <button className="bg-lindy-primary hover:bg-lindy-primary-dark text-white px-6 py-3 rounded-lg transition-colors">
                  Try Free for 14 Days
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailPage;
