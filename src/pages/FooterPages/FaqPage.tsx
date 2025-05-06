
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqPage = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Everything you need to know about Lindy.ai and our services
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            {/* General Questions */}
            <div>
              <h2 className="heading-3 mb-6">General Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="what-is-lindy">
                  <AccordionTrigger className="text-lg font-medium">What is Lindy.ai?</AccordionTrigger>
                  <AccordionContent className="text-lindy-gray">
                    Lindy.ai is an AI-powered platform that helps businesses streamline their operations, automate routine tasks, and make data-driven decisions. Our cutting-edge technology is designed to be accessible and practical for businesses of all sizes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-does-it-work">
                  <AccordionTrigger className="text-lg font-medium">How does Lindy.ai work?</AccordionTrigger>
                  <AccordionContent className="text-lindy-gray">
                    Lindy.ai uses advanced machine learning algorithms and natural language processing to analyze your data, automate workflows, and provide actionable insights. Our platform integrates seamlessly with your existing tools and systems to enhance productivity and efficiency.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="who-can-use">
                  <AccordionTrigger className="text-lg font-medium">Who can use Lindy.ai?</AccordionTrigger>
                  <AccordionContent className="text-lindy-gray">
                    Lindy.ai is designed for businesses of all sizes across various industries. Whether you're a small startup or a large enterprise, our scalable solutions can be tailored to meet your specific needs and requirements.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Pricing & Plans */}
            <div>
              <h2 className="heading-3 mb-6">Pricing & Plans</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="how-much-cost">
                  <AccordionTrigger className="text-lg font-medium">How much does Lindy.ai cost?</AccordionTrigger>
                  <AccordionContent className="text-lindy-gray">
                    We offer flexible pricing plans starting at $49/month for our Starter plan. Our Pro plan is $99/month, and we also offer custom Enterprise solutions. You can view detailed pricing information on our <Link to="/pricing" className="text-lindy-primary">Pricing page</Link>.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="free-trial">
                  <AccordionTrigger className="text-lg font-medium">Do you offer a free trial?</AccordionTrigger>
                  <AccordionContent className="text-lindy-gray">
                    Yes, we offer a 14-day free trial on our Starter and Pro plans. No credit card is required to start your trial, and you can cancel at any time before the trial period ends.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="change-plans">
                  <AccordionTrigger className="text-lg font-medium">Can I change plans later?</AccordionTrigger>
                  <AccordionContent className="text-lindy-gray">
                    Absolutely! You can upgrade or downgrade your plan at any time. Changes to your subscription will take effect at the start of your next billing cycle.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Features & Functionality */}
            <div>
              <h2 className="heading-3 mb-6">Features & Functionality</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="key-features">
                  <AccordionTrigger className="text-lg font-medium">What are the key features of Lindy.ai?</AccordionTrigger>
                  <AccordionContent className="text-lindy-gray">
                    Lindy.ai offers a range of features including AI-powered automation, predictive analytics, intelligent data processing, custom integrations, and comprehensive reporting and analytics. The specific features available depend on your subscription plan.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-security">
                  <AccordionTrigger className="text-lg font-medium">How secure is my data with Lindy.ai?</AccordionTrigger>
                  <AccordionContent className="text-lindy-gray">
                    We take data security very seriously. Lindy.ai employs industry-standard encryption, regular security audits, and strict access controls to ensure your data remains secure. For Enterprise customers, we offer additional security features and compliance certifications.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="integrations">
                  <AccordionTrigger className="text-lg font-medium">Does Lindy.ai integrate with other tools?</AccordionTrigger>
                  <AccordionContent className="text-lindy-gray">
                    Yes, Lindy.ai offers integrations with popular business tools and platforms including Salesforce, HubSpot, Slack, Google Workspace, Microsoft 365, and many others. We also provide an API for custom integrations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Support & Training */}
            <div>
              <h2 className="heading-3 mb-6">Support & Training</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="customer-support">
                  <AccordionTrigger className="text-lg font-medium">What kind of customer support do you offer?</AccordionTrigger>
                  <AccordionContent className="text-lindy-gray">
                    All customers receive standard email support. Pro plan subscribers get priority support with faster response times. Enterprise customers receive 24/7 dedicated support and a dedicated account manager.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="training-resources">
                  <AccordionTrigger className="text-lg font-medium">Do you provide training resources?</AccordionTrigger>
                  <AccordionContent className="text-lindy-gray">
                    Yes, we offer comprehensive documentation, video tutorials, and regular webinars for all customers. Enterprise customers also receive personalized onboarding and training sessions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technical-issues">
                  <AccordionTrigger className="text-lg font-medium">How do I get help with technical issues?</AccordionTrigger>
                  <AccordionContent className="text-lindy-gray">
                    You can contact our support team through the in-app chat, email support@lindy.ai, or visit our <Link to="/contact" className="text-lindy-primary">Contact page</Link> for more options. We aim to respond to all support requests within 24 hours.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
            <p className="text-lg text-lindy-gray mb-6">
              Our team is ready to help you with any questions you might have.
            </p>
            <Link to="/contact" className="btn-primary inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
