
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Choose the plan that works best for your business needs. No hidden fees or surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <p className="text-lindy-gray mb-6">Perfect for small businesses and startups</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-lindy-gray">/month</span>
                </div>
                <Button className="w-full btn-primary mb-6">Get Started</Button>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Basic AI automation tools</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Up to 5 team members</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>5,000 API calls per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Standard support</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-lindy-primary rounded-xl overflow-hidden relative hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 bg-lindy-primary text-white px-4 py-1 text-sm font-medium">
                Most Popular
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-lindy-gray mb-6">Ideal for growing businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-lindy-gray">/month</span>
                </div>
                <Button className="w-full btn-primary mb-6">Get Started</Button>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Advanced AI automation tools</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Up to 20 team members</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>20,000 API calls per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-lindy-gray mb-6">For large organizations with complex needs</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <Button asChild className="w-full btn-primary mb-6">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Full suite of AI tools</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Unlimited team members</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Unlimited API calls</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Custom AI model training</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Enterprise-grade security</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-lindy-gray max-w-2xl mx-auto">
              Have more questions? <Link to="/contact" className="text-lindy-primary font-medium">Contact our team</Link>.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-lindy-gray">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of the next billing cycle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Do you offer a free trial?</h3>
              <p className="text-lindy-gray">
                We offer a 14-day free trial on our Starter and Pro plans. No credit card required until you decide to continue.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-lindy-gray">
                We accept all major credit cards, PayPal, and for Enterprise customers, we can arrange invoicing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">What happens if I exceed my API call limit?</h3>
              <p className="text-lindy-gray">
                If you exceed your monthly API call limit, additional calls are billed at a rate of $0.01 per call. You can also upgrade to a higher plan at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-lindy-primary p-12 rounded-2xl text-center">
            <h2 className="heading-2 text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white text-opacity-80 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using Lindy.ai to transform their operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-lindy-primary hover:bg-opacity-90 text-lg px-8 py-6">
                Start Your Free Trial
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-lindy-primary text-lg px-8 py-6">
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
