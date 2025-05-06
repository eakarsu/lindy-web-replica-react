
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IntegrationsPage = () => {
  // Sample integrations data
  const integrationCategories = [
    {
      id: 1,
      name: "CRM & Sales",
      integrations: [
        { 
          id: 101, 
          name: "Salesforce", 
          description: "Connect your Salesforce CRM to automate data entry and analysis.",
          icon: "SF",
          color: "bg-blue-500"
        },
        { 
          id: 102, 
          name: "HubSpot", 
          description: "Integrate with HubSpot to enhance your marketing and sales workflows.",
          icon: "HS",
          color: "bg-orange-500"
        },
        { 
          id: 103, 
          name: "Pipedrive", 
          description: "Sync your Pipedrive CRM data with Lindy.ai for improved insights.",
          icon: "PD",
          color: "bg-green-500"
        },
        { 
          id: 104, 
          name: "Zoho CRM", 
          description: "Connect Zoho CRM for seamless data flow and automation.",
          icon: "ZH",
          color: "bg-red-500"
        }
      ]
    },
    {
      id: 2,
      name: "Communication",
      integrations: [
        { 
          id: 201, 
          name: "Slack", 
          description: "Get Lindy.ai insights and notifications directly in your Slack channels.",
          icon: "SL",
          color: "bg-purple-500"
        },
        { 
          id: 202, 
          name: "Microsoft Teams", 
          description: "Integrate with Teams for collaborative AI-powered workflows.",
          icon: "MT",
          color: "bg-blue-600"
        },
        { 
          id: 203, 
          name: "Gmail", 
          description: "Enhance your emails with AI-powered suggestions and automation.",
          icon: "GM",
          color: "bg-red-400"
        },
        { 
          id: 204, 
          name: "Outlook", 
          description: "Connect your Outlook email for improved email workflows.",
          icon: "OL",
          color: "bg-blue-400"
        }
      ]
    },
    {
      id: 3,
      name: "Productivity",
      integrations: [
        { 
          id: 301, 
          name: "Google Workspace", 
          description: "Integrate with Google Docs, Sheets, and more for enhanced productivity.",
          icon: "GW",
          color: "bg-yellow-500"
        },
        { 
          id: 302, 
          name: "Microsoft 365", 
          description: "Connect with Microsoft's productivity suite for seamless workflows.",
          icon: "MS",
          color: "bg-blue-700"
        },
        { 
          id: 303, 
          name: "Asana", 
          description: "Enhance your project management with AI-powered insights.",
          icon: "AS",
          color: "bg-orange-600"
        },
        { 
          id: 304, 
          name: "Trello", 
          description: "Automate your Trello boards with Lindy.ai's intelligent workflows.",
          icon: "TR",
          color: "bg-blue-400"
        }
      ]
    }
  ];

  const featuredIntegration = {
    name: "Salesforce",
    description: "Supercharge your Salesforce CRM with Lindy.ai's AI-powered automation and insights. Streamline your sales process, automate routine tasks, and gain valuable insights from your CRM data.",
    features: [
      "Automated data entry and enrichment",
      "AI-powered lead scoring and prioritization",
      "Intelligent sales forecasting",
      "Automated follow-up reminders",
      "Custom dashboards and reporting"
    ],
    icon: "SF",
    color: "bg-blue-500"
  };

  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Integrations</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Connect Lindy.ai with your favorite tools and platforms to streamline your workflows
            </p>
            <Button className="btn-primary text-lg px-8 py-6">
              Browse Integrations
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Integration */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="heading-2 mb-12 text-center">Featured Integration</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gradient-to-r from-lindy-primary to-lindy-secondary p-12 flex items-center">
                <div className="mx-auto text-center">
                  <div className="w-24 h-24 rounded-xl bg-white text-lindy-primary flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-bold">{featuredIntegration.icon}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">{featuredIntegration.name}</h3>
                </div>
              </div>
              <div className="p-12">
                <h3 className="text-2xl font-bold mb-4">Lindy.ai + {featuredIntegration.name}</h3>
                <p className="text-lindy-gray mb-6">{featuredIntegration.description}</p>
                
                <h4 className="font-semibold mb-3">Key Features:</h4>
                <ul className="space-y-2 mb-8">
                  {featuredIntegration.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-lindy-primary mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lindy-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button>Connect with {featuredIntegration.name}</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Integrations */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <h2 className="heading-2 mb-4 text-center">All Integrations</h2>
          <p className="text-center text-lindy-gray max-w-2xl mx-auto mb-12">
            Browse our growing collection of integrations to customize your Lindy.ai experience
          </p>
          
          <div className="space-y-16">
            {integrationCategories.map((category) => (
              <div key={category.id}>
                <h3 className="text-2xl font-bold mb-8">{category.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.integrations.map((integration) => (
                    <div key={integration.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`w-12 h-12 ${integration.color} rounded-lg text-white flex items-center justify-center mb-4`}>
                        <span className="font-bold">{integration.icon}</span>
                      </div>
                      <h4 className="text-xl font-semibold mb-2">{integration.name}</h4>
                      <p className="text-lindy-gray text-sm mb-6">{integration.description}</p>
                      <Button variant="outline" className="w-full">Connect</Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Directory */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Integration Directory</h2>
            <p className="text-lg text-lindy-gray max-w-2xl mx-auto">
              Find the perfect integration for your workflow
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search integrations..."
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lindy-primary focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="outline" size="sm">All</Button>
              <Button variant="outline" size="sm">CRM & Sales</Button>
              <Button variant="outline" size="sm">Communication</Button>
              <Button variant="outline" size="sm">Productivity</Button>
              <Button variant="outline" size="sm">Marketing</Button>
              <Button variant="outline" size="sm">Analytics</Button>
              <Button variant="outline" size="sm">Support</Button>
              <Button variant="outline" size="sm">Finance</Button>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left font-semibold">Integration</th>
                  <th className="py-3 px-4 text-left font-semibold hidden md:table-cell">Category</th>
                  <th className="py-3 px-4 text-right font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {integrationCategories.flatMap(category => 
                  category.integrations.slice(0, 2).map(integration => (
                    <tr key={integration.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 ${integration.color} rounded text-white flex items-center justify-center mr-3`}>
                            <span className="font-bold text-sm">{integration.icon}</span>
                          </div>
                          <span className="font-medium">{integration.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-lindy-gray hidden md:table-cell">{category.name}</td>
                      <td className="py-4 px-4 text-right">
                        <Button size="sm">Connect</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="mt-6 text-center">
              <Button variant="outline">View All Integrations</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Build Custom Integration */}
      <section className="py-20 bg-lindy-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need a Custom Integration?</h2>
            <p className="text-lg mb-8 text-white text-opacity-90">
              Don't see the integration you need? Our developer API allows you to build custom integrations for your specific workflows.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-lindy-primary hover:bg-opacity-90">
                Explore API Documentation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                Contact for Custom Integration
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntegrationsPage;
