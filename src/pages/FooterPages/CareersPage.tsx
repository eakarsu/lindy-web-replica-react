
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CareersPage = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Join Our Team</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Build the future of AI with a team of passionate innovators
            </p>
            <Button className="btn-primary text-lg px-8 py-6">
              View Open Positions
            </Button>
          </div>
        </div>
      </section>

      {/* About Working at Lindy.ai */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">Why Work at Lindy.ai?</h2>
              <p className="text-lindy-gray mb-4">
                At Lindy.ai, we're on a mission to democratize artificial intelligence and make it accessible to businesses of all sizes. We're looking for talented, passionate individuals who share our vision and want to make a meaningful impact.
              </p>
              <p className="text-lindy-gray mb-4">
                We believe in fostering a culture of innovation, collaboration, and continuous learning. Our team members are encouraged to think creatively, take ownership of their work, and contribute to the company's growth and success.
              </p>
              <p className="text-lindy-gray">
                Join us and be part of a team that's shaping the future of AI technology and transforming how businesses operate.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-lindy-primary bg-opacity-10 p-6 rounded-xl">
                <h3 className="font-semibold text-xl mb-3">Innovation</h3>
                <p className="text-lindy-gray">We push boundaries and challenge the status quo.</p>
              </div>
              <div className="bg-lindy-primary bg-opacity-10 p-6 rounded-xl">
                <h3 className="font-semibold text-xl mb-3">Collaboration</h3>
                <p className="text-lindy-gray">We work together to achieve our shared goals.</p>
              </div>
              <div className="bg-lindy-primary bg-opacity-10 p-6 rounded-xl">
                <h3 className="font-semibold text-xl mb-3">Growth</h3>
                <p className="text-lindy-gray">We invest in our people's development and success.</p>
              </div>
              <div className="bg-lindy-primary bg-opacity-10 p-6 rounded-xl">
                <h3 className="font-semibold text-xl mb-3">Impact</h3>
                <p className="text-lindy-gray">We create solutions that make a real difference.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Benefits & Perks</h2>
            <p className="text-lg text-lindy-gray max-w-2xl mx-auto">
              We take care of our team so they can focus on doing their best work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Competitive Compensation</h3>
              <p className="text-lindy-gray">
                We offer competitive salaries, equity options, and performance bonuses to reward your contributions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Health Benefits</h3>
              <p className="text-lindy-gray">
                We provide top-tier medical, dental, and vision coverage for you and your dependents.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Work</h3>
              <p className="text-lindy-gray">
                Enjoy flexible work hours and the ability to work remotely. We focus on results, not hours logged.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Learning & Development</h3>
              <p className="text-lindy-gray">
                Access to learning resources, conferences, and a personal development budget to grow your skills.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Unlimited PTO</h3>
              <p className="text-lindy-gray">
                Take the time you need to rest, recharge, and come back energized. We trust you to manage your time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Events</h3>
              <p className="text-lindy-gray">
                Regular team-building activities, retreats, and social events to foster a strong company culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Open Positions</h2>
            <p className="text-lg text-lindy-gray max-w-2xl mx-auto">
              Find your next opportunity at Lindy.ai. We're constantly growing our team.
            </p>
          </div>

          <div className="space-y-6">
            {/* Engineering */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Engineering</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-medium mb-1">Senior Machine Learning Engineer</h4>
                      <p className="text-lindy-gray">Remote • Full-time</p>
                    </div>
                    <Button className="whitespace-nowrap">Apply Now</Button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-medium mb-1">Frontend Developer</h4>
                      <p className="text-lindy-gray">San Francisco, CA • Full-time</p>
                    </div>
                    <Button className="whitespace-nowrap">Apply Now</Button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-medium mb-1">Backend Engineer</h4>
                      <p className="text-lindy-gray">Remote • Full-time</p>
                    </div>
                    <Button className="whitespace-nowrap">Apply Now</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product & Design */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Product & Design</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-medium mb-1">Product Manager</h4>
                      <p className="text-lindy-gray">San Francisco, CA • Full-time</p>
                    </div>
                    <Button className="whitespace-nowrap">Apply Now</Button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-medium mb-1">UX/UI Designer</h4>
                      <p className="text-lindy-gray">Remote • Full-time</p>
                    </div>
                    <Button className="whitespace-nowrap">Apply Now</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales & Marketing */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Sales & Marketing</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-medium mb-1">Sales Development Representative</h4>
                      <p className="text-lindy-gray">San Francisco, CA • Full-time</p>
                    </div>
                    <Button className="whitespace-nowrap">Apply Now</Button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-medium mb-1">Content Marketing Specialist</h4>
                      <p className="text-lindy-gray">Remote • Full-time</p>
                    </div>
                    <Button className="whitespace-nowrap">Apply Now</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lindy-gray mb-6">
              Don't see a role that fits your skills? We're always looking for talented individuals to join our team.
            </p>
            <Button className="btn-primary">
              Send Your Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
