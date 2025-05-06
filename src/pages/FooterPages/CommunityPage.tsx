
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const CommunityPage = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Lindy.ai Community</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Connect, learn, and grow with thousands of Lindy.ai users worldwide
            </p>
            <Button className="btn-primary text-lg px-8 py-6">
              Join Our Community
            </Button>
          </div>
        </div>
      </section>

      {/* Community Benefits */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">Why Join Our Community?</h2>
              <p className="text-lindy-gray mb-6">
                The Lindy.ai community brings together users, developers, and AI enthusiasts from around the world. Whether you're just starting out or are an experienced pro, you'll find valuable connections and resources here.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-lindy-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-5 w-5 text-lindy-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Connect with Peers</h3>
                    <p className="text-lindy-gray">Network with like-minded professionals and learn from their experiences.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-lindy-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lindy-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Get Support</h3>
                    <p className="text-lindy-gray">Ask questions, share challenges, and find solutions together.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-lindy-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lindy-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Share Resources</h3>
                    <p className="text-lindy-gray">Exchange templates, workflows, and best practices with the community.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-lindy-light p-8 rounded-xl">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-lindy-primary rounded-full flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-sm text-lindy-gray">Product Manager</p>
                  </div>
                </div>
                <p className="text-lindy-gray italic">
                  "The Lindy.ai community has been an invaluable resource for me. I've learned so much from other users and have been able to implement solutions I never would have thought of on my own."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-lindy-secondary rounded-full flex items-center justify-center text-white font-bold">
                    MS
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Michael Smith</p>
                    <p className="text-sm text-lindy-gray">Software Developer</p>
                  </div>
                </div>
                <p className="text-lindy-gray italic">
                  "Being part of the Lindy.ai community has accelerated my learning curve significantly. The forums and meetups have helped me connect with experts who are always willing to share their knowledge."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Channels */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Join Us On These Channels</h2>
            <p className="text-lg text-lindy-gray max-w-2xl mx-auto">
              Connect with the Lindy.ai community across multiple platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.08,5.93c-.59.26-1.22.44-1.88.52A3.3,3.3,0,0,0,21.66,4.6a6.63,6.63,0,0,1-2.09.8,3.33,3.33,0,0,0-5.66,3A9.39,9.39,0,0,1,7.15,4.59,3.32,3.32,0,0,0,8.18,9a3.28,3.28,0,0,1-1.51-.42v0A3.33,3.33,0,0,0,9.34,12a3.35,3.35,0,0,1-1.5.06,3.33,3.33,0,0,0,3.11,2.31A6.69,6.69,0,0,1,6,16.19a9.41,9.41,0,0,0,5.1,1.48,9.32,9.32,0,0,0,9.44-9.62A6.6,6.6,0,0,0,22.08,5.93Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Twitter</h3>
              <p className="text-lindy-gray mb-6">
                Follow us for the latest updates, tips, and community highlights.
              </p>
              <Button variant="outline" className="w-full">
                Follow @Lindy_AI
              </Button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.32,4.37a19.84,19.84,0,0,0-4.93-1.51,13.56,13.56,0,0,0-.63,1.28,18.54,18.54,0,0,0-5.52,0A13.19,13.19,0,0,0,8.61,2.86a19.89,19.89,0,0,0-4.94,1.51c-3.13,4.67-4,9.23-3.56,13.73l0,0a20,20,0,0,0,6.06,3.06,14.94,14.94,0,0,0,1.35-2.19,13.13,13.13,0,0,1-2.12-1,9.93,9.93,0,0,0,.85-.63c3.31,1.55,6.92,1.55,10.19,0a9.06,9.06,0,0,0,.86.63,13,13,0,0,1-2.13,1,14.75,14.75,0,0,0,1.35,2.19,19.86,19.86,0,0,0,6.06-3.06l0,0C24.41,9.89,22.75,5.5,20.32,4.37ZM8.12,15.39c-1.18,0-2.16-1.09-2.16-2.42s.95-2.43,2.16-2.43,2.18,1.1,2.16,2.43S9.32,15.39,8.12,15.39Zm8,0c-1.18,0-2.16-1.09-2.16-2.42s.95-2.43,2.16-2.43,2.18,1.1,2.16,2.43S17.32,15.39,16.12,15.39Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Discord</h3>
              <p className="text-lindy-gray mb-6">
                Join our active community for real-time discussions and support.
              </p>
              <Button variant="outline" className="w-full">
                Join Discord Server
              </Button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24,11.38a12,12,0,0,1-.44,3.29,11.37,11.37,0,0,1-.84,2,12,12,0,0,1-6.85,5.87,11.93,11.93,0,0,1-2.8.58A12,12,0,0,1,0,11.88,11.77,11.77,0,0,1,.46,8.63,11.54,11.54,0,0,1,1.3,6.68,12,12,0,0,1,8.12.81a11.93,11.93,0,0,1,2.81-.59A12,12,0,0,1,24,11.38ZM9,8a1.84,1.84,0,0,0-1-1.32A2,2,0,0,0,6.26,7,1.81,1.81,0,0,0,6,9.23,14.07,14.07,0,0,0,7.5,11.74c.45.54.94,1.05,1.41,1.58l.53.59c.4.43.79.87,1.19,1.31a3.22,3.22,0,0,0,.68.58,1.81,1.81,0,0,0,1.06.23,1.83,1.83,0,0,0,1.53-1.95,2.08,2.08,0,0,0-1.56-1.74c-.49.26-1,.51-1.46.77l-.35.19c-.35.19-.7.38-1.05.55-.68-.77-1.39-1.51-2-2.29a15.88,15.88,0,0,1-1.5-2.09l1-.51.38-.2C9.13,8.47,9,8.22,9,8Zm7-1.32A1.86,1.86,0,0,0,14.93,8v.05c0,.23,0,.47,0,.71,0,.44,0,.89,0,1.33a4.39,4.39,0,0,0,.12,1.25A1.86,1.86,0,0,0,17.5,12.73a1.87,1.87,0,0,0,1-2.4c-.8.2-1.6.38-2.39.55l-.25.06c0-.66,0-1.32,0-2l2.63-.63A2,2,0,0,0,16,6.68Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Forum</h3>
              <p className="text-lindy-gray mb-6">
                Explore our community forum for in-depth discussions and knowledge sharing.
              </p>
              <Button variant="outline" className="w-full">
                Browse Forum
              </Button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.8,7.2a2.87,2.87,0,0,0-2-2c-1.78-.48-8.88-.48-8.88-.48s-7.1,0-8.88.48a2.87,2.87,0,0,0-2,2A30.14,30.14,0,0,0,1.5,12a30.14,30.14,0,0,0,.47,4.8,2.87,2.87,0,0,0,2,2c1.78.48,8.88.48,8.88.48s7.1,0,8.88-.48a2.87,2.87,0,0,0,2-2A30.14,30.14,0,0,0,24.5,12,30.14,30.14,0,0,0,24,7.2ZM10,15.27V8.73L16,12Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">YouTube</h3>
              <p className="text-lindy-gray mb-6">
                Watch tutorials, webinars, and community spotlights on our channel.
              </p>
              <Button variant="outline" className="w-full">
                Subscribe to Channel
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Upcoming Community Events</h2>
            <p className="text-lg text-lindy-gray max-w-2xl mx-auto">
              Connect with the Lindy.ai team and community members at these upcoming events
            </p>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-center md:text-left md:border-r md:pr-6 md:w-40">
                  <div className="text-3xl font-bold text-lindy-primary">15</div>
                  <div className="text-lg font-medium">June 2025</div>
                  <div className="text-sm text-lindy-gray">10:00 AM PST</div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Lindy.ai User Conference 2025</h3>
                  <p className="text-lindy-gray mb-4">
                    Join us for our annual user conference with keynotes, workshops, and networking opportunities.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-lindy-primary bg-opacity-10 text-lindy-primary px-3 py-1 rounded-full">
                      Virtual
                    </span>
                    <span className="text-xs bg-lindy-light text-lindy-gray px-3 py-1 rounded-full">
                      Free Registration
                    </span>
                  </div>
                  <Button>Register Now</Button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-center md:text-left md:border-r md:pr-6 md:w-40">
                  <div className="text-3xl font-bold text-lindy-primary">22</div>
                  <div className="text-lg font-medium">June 2025</div>
                  <div className="text-sm text-lindy-gray">1:00 PM PST</div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Webinar: Advanced Automation Techniques</h3>
                  <p className="text-lindy-gray mb-4">
                    Learn advanced techniques for automating workflows and processes with Lindy.ai.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-lindy-primary bg-opacity-10 text-lindy-primary px-3 py-1 rounded-full">
                      Webinar
                    </span>
                    <span className="text-xs bg-lindy-light text-lindy-gray px-3 py-1 rounded-full">
                      All Skill Levels
                    </span>
                  </div>
                  <Button>Register Now</Button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-center md:text-left md:border-r md:pr-6 md:w-40">
                  <div className="text-3xl font-bold text-lindy-primary">30</div>
                  <div className="text-lg font-medium">June 2025</div>
                  <div className="text-sm text-lindy-gray">11:00 AM PST</div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Community Meetup: San Francisco</h3>
                  <p className="text-lindy-gray mb-4">
                    Join fellow Lindy.ai users in San Francisco for networking, learning, and sharing.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-lindy-primary bg-opacity-10 text-lindy-primary px-3 py-1 rounded-full">
                      In-Person
                    </span>
                    <span className="text-xs bg-lindy-light text-lindy-gray px-3 py-1 rounded-full">
                      Limited Seats
                    </span>
                  </div>
                  <Button>Register Now</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">View All Events</Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-lindy-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Community Today</h2>
            <p className="text-lg mb-8 text-white text-opacity-90">
              Connect with thousands of Lindy.ai users, share knowledge, and grow together.
            </p>
            <Button className="bg-white text-lindy-primary hover:bg-opacity-90 text-lg px-8 py-6">
              Join Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
