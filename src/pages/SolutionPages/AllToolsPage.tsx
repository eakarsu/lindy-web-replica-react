
import React from "react";
import { Link } from "react-router-dom";

const AllToolsPage = () => {
  const solutions = [
    {
      title: "Sales",
      description: "AI-powered tools to boost your sales performance",
      link: "/solutions/sales",
      icon: "📈",
    },
    {
      title: "Email",
      description: "Streamline your email communication with AI assistance",
      link: "/solutions/email",
      icon: "📧",
    },
    {
      title: "Customer Support",
      description: "Elevate your customer service experience",
      link: "/solutions/customer-support",
      icon: "🤝",
    },
    {
      title: "Meetings",
      description: "Make every meeting more productive with AI",
      link: "/solutions/meetings",
      icon: "🗓️",
    },
    {
      title: "Medical Scribe",
      description: "AI documentation for healthcare professionals",
      link: "/solutions/medical-scribe",
      icon: "⚕️",
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">All Solutions</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Explore our complete suite of AI-powered tools to transform your business
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <Link 
                key={solution.title} 
                to={solution.link} 
                className="block p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{solution.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-lindy-gray mb-4">{solution.description}</p>
                <span className="text-lindy-primary font-medium">Learn more &rarr;</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
            <p className="text-lg text-lindy-gray mb-8">
              We can tailor our AI platform to meet your specific business needs.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-lindy-primary hover:bg-lindy-primary-dark text-white px-6 py-3 rounded-lg transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllToolsPage;
