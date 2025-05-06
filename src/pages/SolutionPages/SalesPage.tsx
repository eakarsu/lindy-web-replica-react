
import React from "react";

const SalesPage = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Sales Solutions</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Boost your sales performance with AI-powered insights and automation
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <h2>Transform Your Sales Process</h2>
              <p>
                Our AI-powered sales solution helps your team close more deals by automating repetitive tasks, 
                providing real-time insights, and delivering personalized recommendations at every stage of the sales process.
              </p>
              
              <h3>Key Features</h3>
              <ul>
                <li>AI-powered lead scoring and prioritization</li>
                <li>Automated follow-up sequences</li>
                <li>Real-time call analytics and coaching</li>
                <li>Personalized email templates</li>
                <li>Sales forecasting and pipeline management</li>
              </ul>
              
              <h3>Benefits</h3>
              <ul>
                <li>Increase win rates by 27%</li>
                <li>Reduce sales cycle length by 35%</li>
                <li>Improve sales rep productivity by 40%</li>
                <li>Enhance customer engagement and satisfaction</li>
              </ul>
              
              <div className="my-8 p-6 bg-lindy-light rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Ready to boost your sales performance?</h3>
                <p className="mb-4">
                  Schedule a demo to see how our Sales Solution can transform your sales process.
                </p>
                <button className="bg-lindy-primary hover:bg-lindy-primary-dark text-white px-6 py-3 rounded-lg transition-colors">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesPage;
