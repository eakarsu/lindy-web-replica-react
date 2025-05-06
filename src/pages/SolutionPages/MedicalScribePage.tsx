
import React from "react";

const MedicalScribePage = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Medical Scribe Solutions</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Let AI handle your medical documentation so you can focus on patient care
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <h2>Transform Patient Care with AI Documentation</h2>
              <p>
                Our Medical Scribe Solution uses advanced AI to automatically document patient encounters, 
                update medical records, and ensure accurate, compliant documentation.
              </p>
              
              <h3>Key Features</h3>
              <ul>
                <li>Real-time transcription of patient-provider conversations</li>
                <li>Automatic EHR/EMR updates and documentation</li>
                <li>HIPAA-compliant security and privacy</li>
                <li>Intelligent medical terminology recognition</li>
                <li>Integration with major electronic health record systems</li>
              </ul>
              
              <h3>Benefits</h3>
              <ul>
                <li>Save 2+ hours of documentation time per day</li>
                <li>Increase face-to-face time with patients by 40%</li>
                <li>Reduce physician burnout and improve work-life balance</li>
                <li>Improve documentation quality and compliance</li>
              </ul>
              
              <div className="my-8 p-6 bg-lindy-light rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Ready to transform your medical practice?</h3>
                <p className="mb-4">
                  Schedule a demo to see how our Medical Scribe Solution can help your healthcare organization.
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

export default MedicalScribePage;
