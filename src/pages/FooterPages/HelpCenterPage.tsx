
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HelpCenterPage = () => {
  // Sample help categories
  const helpCategories = [
    {
      id: 1,
      title: "Getting Started",
      description: "New to Lindy.ai? Start here to learn the basics.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      articles: 12
    },
    {
      id: 2,
      title: "Account Management",
      description: "Learn how to manage your account, billing, and subscription.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      articles: 9
    },
    {
      id: 3,
      title: "Features & Usage",
      description: "Detailed guides on how to use Lindy.ai's features.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      articles: 24
    },
    {
      id: 4,
      title: "Integrations",
      description: "How to connect Lindy.ai with your existing tools and systems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      articles: 15
    },
    {
      id: 5,
      title: "Troubleshooting",
      description: "Solutions to common issues and error messages.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      articles: 18
    },
    {
      id: 6,
      title: "Security & Privacy",
      description: "Information about data security, privacy, and compliance.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      articles: 10
    }
  ];

  // Sample popular articles
  const popularArticles = [
    "How to set up your first Lindy.ai project",
    "Understanding the Lindy.ai dashboard",
    "Integrating Lindy.ai with Salesforce",
    "Troubleshooting API connection issues",
    "Setting up multi-factor authentication",
    "Managing team access and permissions"
  ];

  return (
    <div>
      {/* Header Section with Search */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">How can we help you?</h1>
            <p className="text-xl text-lindy-gray mb-8">
              Search our knowledge base for answers or browse categories below
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full py-4 px-6 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lindy-primary focus:border-transparent"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lindy-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="heading-2 mb-12 text-center">Browse Help Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category) => (
              <div key={category.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-lindy-primary bg-opacity-10 rounded-full flex items-center justify-center text-lindy-primary mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-lindy-gray mb-6">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-lindy-gray">{category.articles} articles</span>
                  <Button variant="ghost" className="text-lindy-primary">
                    View Articles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Popular Articles</h2>
            <p className="text-lg text-lindy-gray">
              Frequently accessed help resources
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {popularArticles.map((article, index) => (
                  <li key={index}>
                    <Link to="#" className="block p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lindy-primary mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-lg font-medium">{article}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Video Tutorials</h2>
            <p className="text-lg text-lindy-gray max-w-2xl mx-auto">
              Learn through our step-by-step video guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-lindy-primary bg-opacity-10 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lindy-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Getting Started Tutorial {index}</h3>
                  <p className="text-lindy-gray text-sm mb-4">
                    Learn how to set up your Lindy.ai account and navigate the platform.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-lindy-gray">5:32 min</span>
                    <Button variant="ghost" className="text-lindy-primary">
                      Watch Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">View All Videos</Button>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-lindy-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Can't find what you're looking for?</h2>
            <p className="text-lg mb-8 text-white text-opacity-90">
              Our support team is here to help with any questions or issues you might have.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-lindy-primary hover:bg-opacity-90">
                Contact Support
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenterPage;
