
import { Link } from "react-router-dom";

const ChangelogPage = () => {
  // Sample changelog data
  const releases = [
    {
      version: "3.2.0",
      date: "May 1, 2025",
      title: "Enhanced Analytics and Performance Improvements",
      description: "This release introduces enhanced analytics capabilities and significant performance improvements across the platform.",
      changes: [
        {
          type: "feature",
          title: "Advanced Analytics Dashboard",
          description: "New interactive analytics dashboard with customizable widgets and deeper insights."
        },
        {
          type: "feature",
          title: "Custom Report Builder",
          description: "Create and save custom reports with our new drag-and-drop report builder."
        },
        {
          type: "improvement",
          title: "Performance Optimization",
          description: "50% faster loading times for large datasets and complex visualizations."
        },
        {
          type: "improvement",
          title: "Expanded API Capabilities",
          description: "New endpoints for analytics data and improved documentation."
        },
        {
          type: "bugfix",
          title: "Data Export Issue",
          description: "Fixed an issue where CSV exports would truncate data for certain report types."
        }
      ]
    },
    {
      version: "3.1.0",
      date: "April 15, 2025",
      title: "Collaboration Features Update",
      description: "This release focuses on enhancing team collaboration and communication within the platform.",
      changes: [
        {
          type: "feature",
          title: "Real-time Collaboration",
          description: "Multiple users can now work on the same document simultaneously with real-time updates."
        },
        {
          type: "feature",
          title: "Team Workspaces",
          description: "Create dedicated workspaces for different teams and projects with customizable permissions."
        },
        {
          type: "improvement",
          title: "Enhanced Notification System",
          description: "More granular control over notifications and new notification types for team activities."
        },
        {
          type: "bugfix",
          title: "Permission Assignment Bug",
          description: "Fixed an issue where newly assigned permissions wouldn't take effect until user logout."
        }
      ]
    },
    {
      version: "3.0.0",
      date: "March 1, 2025",
      title: "Major Platform Upgrade",
      description: "A complete platform redesign with new AI capabilities and improved user experience.",
      changes: [
        {
          type: "feature",
          title: "New AI Engine",
          description: "Completely rebuilt AI engine offering 3x faster processing and more accurate results."
        },
        {
          type: "feature",
          title: "Redesigned User Interface",
          description: "Modern, intuitive interface with improved accessibility and customization options."
        },
        {
          type: "feature",
          title: "Advanced Natural Language Processing",
          description: "Better understanding of complex queries and support for 15 additional languages."
        },
        {
          type: "improvement",
          title: "Enhanced Data Security",
          description: "Upgraded encryption protocols and granular access controls."
        },
        {
          type: "improvement",
          title: "Scalability Improvements",
          description: "Platform now handles 10x more concurrent users without performance degradation."
        }
      ]
    }
  ];

  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Changelog</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Stay up to date with the latest improvements, features, and fixes to Lindy.ai
            </p>
          </div>
        </div>
      </section>

      {/* Latest Release */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-lindy-primary bg-opacity-10 p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-2xl font-bold">Version {releases[0].version}</h2>
                <span className="mt-2 sm:mt-0 inline-block bg-lindy-primary text-white text-sm px-3 py-1 rounded-full">
                  Latest Release
                </span>
              </div>
              <p className="text-lindy-gray">{releases[0].date}</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{releases[0].title}</h3>
              <p className="text-lindy-gray mb-8">{releases[0].description}</p>
              
              <div className="space-y-6">
                {releases[0].changes.map((change, idx) => (
                  <div key={idx} className="flex">
                    <div className="mr-4">
                      {change.type === "feature" && (
                        <span className="inline-block w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                      {change.type === "improvement" && (
                        <span className="inline-block w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                      {change.type === "bugfix" && (
                        <span className="inline-block w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{change.title}</h4>
                      <p className="text-lindy-gray">{change.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Releases */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-2 mb-12">Previous Releases</h2>
          
          <div className="space-y-12">
            {releases.slice(1).map((release, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h2 className="text-xl font-bold">Version {release.version}</h2>
                      <p className="text-lindy-gray text-sm">{release.date}</p>
                    </div>
                    <button className="mt-2 sm:mt-0 text-lindy-primary hover:text-lindy-secondary font-medium flex items-center">
                      <span>Release Notes</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{release.title}</h3>
                  <p className="text-lindy-gray mb-6">{release.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {release.changes.slice(0, 4).map((change, idx) => (
                      <div key={idx} className="flex items-start">
                        {change.type === "feature" && (
                          <span className="inline-block w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                        {change.type === "improvement" && (
                          <span className="inline-block w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                        {change.type === "bugfix" && (
                          <span className="inline-block w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                        <div>
                          <p className="font-medium text-sm">{change.title}</p>
                          <p className="text-lindy-gray text-sm">{change.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {release.changes.length > 4 && (
                    <div className="mt-4 text-center">
                      <button className="text-lindy-primary hover:text-lindy-secondary font-medium text-sm">
                        + {release.changes.length - 4} more changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-lindy-gray rounded-md hover:bg-gray-50 transition-colors">
              <span>Load More Releases</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <div className="bg-lindy-primary rounded-xl text-white p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-white text-opacity-90 max-w-2xl mx-auto">
                Subscribe to our release notes to be notified when we release new features and updates.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-md text-lindy-secondary flex-grow"
                />
                <button className="bg-white text-lindy-primary hover:bg-opacity-90 font-medium px-5 py-3 rounded-md whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-white text-opacity-70 mt-3 text-center">
                We'll only send you product updates. No spam.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangelogPage;
