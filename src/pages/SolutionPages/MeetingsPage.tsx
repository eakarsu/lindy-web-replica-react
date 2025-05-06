
import React from "react";

const MeetingsPage = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Meeting Solutions</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Make every meeting more productive with AI assistance
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <h2>Transform Your Meeting Experience</h2>
              <p>
                Our Meeting Solution helps teams make the most of their time together with AI-powered 
                transcription, note-taking, action item tracking, and insights.
              </p>
              
              <h3>Key Features</h3>
              <ul>
                <li>Real-time transcription and meeting notes</li>
                <li>Automatic action item detection and assignment</li>
                <li>Meeting summaries and highlights</li>
                <li>Integration with your calendar and task management tools</li>
                <li>Meeting analytics and insights dashboard</li>
              </ul>
              
              <h3>Benefits</h3>
              <ul>
                <li>Reduce meeting time by 30%</li>
                <li>Improve follow-through on action items by 45%</li>
                <li>Eliminate manual note-taking and increase engagement</li>
                <li>Create an accessible meeting archive for future reference</li>
              </ul>
              
              <div className="my-8 p-6 bg-lindy-light rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Ready to transform your meetings?</h3>
                <p className="mb-4">
                  Try our Meeting Solution today and see the difference in your team's productivity.
                </p>
                <button className="bg-lindy-primary hover:bg-lindy-primary-dark text-white px-6 py-3 rounded-lg transition-colors">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetingsPage;
