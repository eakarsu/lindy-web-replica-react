
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              About <span className="gradient-text">Lindy.ai</span>
            </h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Revolutionizing businesses with AI-powered solutions that drive growth and efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">Our Story</h2>
              <p className="text-lindy-gray mb-4">
                Founded in 2020, Lindy.ai was born from a simple idea: artificial intelligence should be accessible, practical, and transformative for businesses of all sizes.
              </p>
              <p className="text-lindy-gray mb-4">
                Our team of data scientists, engineers, and business strategists came together with a shared mission to democratize AI technology and empower organizations to unlock their full potential.
              </p>
              <p className="text-lindy-gray">
                Today, we're proud to serve thousands of clients worldwide, helping them streamline operations, make data-driven decisions, and achieve remarkable results.
              </p>
            </div>
            <div className="bg-lindy-primary bg-opacity-10 p-10 rounded-xl">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-xl mb-2">Humble Beginnings</h3>
                    <p className="text-lindy-gray">Started as a small team with a big vision to transform how businesses use AI.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-xl mb-2">Rapid Growth</h3>
                    <p className="text-lindy-gray">Expanded our team and product offerings to meet growing demand.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-xl mb-2">Global Impact</h3>
                    <p className="text-lindy-gray">Now serving clients across industries and continents with our AI solutions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Meet Our Leadership Team</h2>
            <p className="text-lg text-lindy-gray max-w-2xl mx-auto">
              The brilliant minds behind Lindy.ai's innovation and success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-24 h-24 bg-lindy-primary mx-auto rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                JD
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-1">Dr. Jane Doe</h3>
                <p className="text-lindy-primary mb-3">Co-Founder & CEO</p>
                <p className="text-lindy-gray text-sm">
                  Former AI research lead at MIT with over 15 years of experience in machine learning and business strategy.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-24 h-24 bg-lindy-secondary mx-auto rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                MS
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-1">Dr. Michael Smith</h3>
                <p className="text-lindy-primary mb-3">Co-Founder & CTO</p>
                <p className="text-lindy-gray text-sm">
                  Computer science visionary with expertise in developing scalable AI systems and data infrastructure.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-24 h-24 bg-lindy-accent mx-auto rounded-full flex items-center justify-center text-lindy-secondary text-3xl font-bold mb-4">
                EL
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-1">Elena Liu</h3>
                <p className="text-lindy-primary mb-3">Chief Product Officer</p>
                <p className="text-lindy-gray text-sm">
                  Product development expert with a passion for creating intuitive, user-friendly AI solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-lindy-primary p-12 rounded-2xl text-center">
            <h2 className="heading-2 text-white mb-6">Join Our Growing Team</h2>
            <p className="text-xl text-white text-opacity-80 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about AI and innovation.
            </p>
            <Button asChild className="bg-white text-lindy-primary hover:bg-opacity-90 text-lg px-8 py-6">
              <Link to="/careers">View Open Positions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
