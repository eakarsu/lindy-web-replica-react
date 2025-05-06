
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              <span className="gradient-text">AI-Powered</span> Solutions for Every Business
            </h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Streamline your operations, automate routine tasks, and make data-driven decisions with our cutting-edge AI platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="btn-primary text-lg px-8 py-6">
                Get Started
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our Key Features</h2>
            <p className="text-lg text-lindy-gray max-w-2xl mx-auto">
              Discover how Lindy.ai can transform your business with our powerful features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-lindy-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <span className="text-lindy-primary text-xl font-bold">1</span>
              </div>
              <h3 className="heading-3 mb-3">Smart Automation</h3>
              <p className="text-lindy-gray mb-4">
                Automate repetitive tasks and workflows to save time and reduce human error.
              </p>
              <Link to="/about" className="text-lindy-primary font-medium inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-lindy-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <span className="text-lindy-primary text-xl font-bold">2</span>
              </div>
              <h3 className="heading-3 mb-3">Predictive Analytics</h3>
              <p className="text-lindy-gray mb-4">
                Leverage the power of AI to predict trends and make informed business decisions.
              </p>
              <Link to="/about" className="text-lindy-primary font-medium inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-lindy-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <span className="text-lindy-primary text-xl font-bold">3</span>
              </div>
              <h3 className="heading-3 mb-3">Intelligent Integration</h3>
              <p className="text-lindy-gray mb-4">
                Seamlessly integrate with your existing tools and systems for a unified workflow.
              </p>
              <Link to="/about" className="text-lindy-primary font-medium inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-lindy-gray max-w-2xl mx-auto">
              Trusted by businesses across industries to deliver results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-lindy-gray mb-6">
                "Lindy.ai has revolutionized how we approach data analysis. The predictive insights have been invaluable for our strategic planning."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-lindy-primary rounded-full flex items-center justify-center text-white font-bold">S</div>
                <div className="ml-3">
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-lindy-gray">CTO, Tech Innovators</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-lindy-gray mb-6">
                "The automation features have saved our team countless hours on repetitive tasks. Our productivity has increased by over 40%."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-lindy-accent rounded-full flex items-center justify-center text-lindy-secondary font-bold">M</div>
                <div className="ml-3">
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-lindy-gray">Operations Manager, Global Solutions</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-lindy-gray mb-6">
                "Implementing Lindy.ai was the best decision our company made this year. The ROI has been remarkable and customer satisfaction is up."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-lindy-secondary rounded-full flex items-center justify-center text-white font-bold">A</div>
                <div className="ml-3">
                  <h4 className="font-semibold">Amanda Rodriguez</h4>
                  <p className="text-sm text-lindy-gray">CEO, Frontier Enterprise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-lindy-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 text-white mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl text-white text-opacity-80 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that are already leveraging the power of Lindy.ai.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-lindy-primary hover:bg-opacity-90 text-lg px-8 py-6">
                Get Started Free
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-lindy-primary text-lg px-8 py-6">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
