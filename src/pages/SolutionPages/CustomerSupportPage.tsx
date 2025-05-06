
import React from "react";

const CustomerSupportPage = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Customer Support Solutions</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Elevate your customer service with AI-powered support tools
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <h2>Transform Your Customer Support Experience</h2>
              <p>
                Our Customer Support Solution helps you deliver exceptional service with AI-powered 
                tools that enhance agent productivity, reduce response times, and improve customer satisfaction.
              </p>
              
              <h3>Key Features</h3>
              <ul>
                <li>AI-powered ticket routing and prioritization</li>
                <li>Automated responses to common inquiries</li>
                <li>Real-time agent assistance with suggested responses</li>
                <li>Customer sentiment analysis</li>
                <li>Comprehensive support analytics dashboard</li>
              </ul>
              
              <h3>Benefits</h3>
              <ul>
                <li>Reduce first response time by 80%</li>
                <li>Increase agent productivity by 35%</li>
                <li>Improve customer satisfaction scores by 25%</li>
                <li>Enable 24/7 customer support without increasing headcount</li>
              </ul>
              
              <div className="my-8 p-6 bg-lindy-light rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Ready to elevate your customer support?</h3>
                <p className="mb-4">
                  Contact us to learn how our Customer Support Solution can transform your service operations.
                </p>
                <button className="bg-lindy-primary hover:bg-lindy-primary-dark text-white px-6 py-3 rounded-lg transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerSupportPage;
