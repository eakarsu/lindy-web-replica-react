
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const AcademyPage = () => {
  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Getting Started with Lindy.ai",
      description: "Learn the fundamentals of Lindy.ai and how to set up your first project.",
      level: "Beginner",
      duration: "2 hours",
      modules: 5,
      image: "course-1.jpg"
    },
    {
      id: 2,
      title: "Advanced AI Automation Techniques",
      description: "Master advanced techniques for automating complex workflows with Lindy.ai.",
      level: "Advanced",
      duration: "4 hours",
      modules: 8,
      image: "course-2.jpg"
    },
    {
      id: 3,
      title: "Data Analysis with Lindy.ai",
      description: "Learn how to leverage Lindy.ai's powerful data analysis capabilities.",
      level: "Intermediate",
      duration: "3 hours",
      modules: 6,
      image: "course-3.jpg"
    },
    {
      id: 4,
      title: "AI Integration Strategies",
      description: "Discover effective strategies for integrating Lindy.ai with your existing systems.",
      level: "Intermediate",
      duration: "3.5 hours",
      modules: 7,
      image: "course-4.jpg"
    },
    {
      id: 5,
      title: "Building Custom AI Solutions",
      description: "Learn how to create tailored AI solutions for your specific business needs.",
      level: "Advanced",
      duration: "5 hours",
      modules: 10,
      image: "course-5.jpg"
    },
    {
      id: 6,
      title: "AI Ethics and Responsible Use",
      description: "Understand the ethical considerations and best practices for responsible AI use.",
      level: "All Levels",
      duration: "2 hours",
      modules: 4,
      image: "course-6.jpg"
    }
  ];

  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Lindy Academy</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Master Lindy.ai with our comprehensive learning resources
            </p>
            <Button className="btn-primary text-lg px-8 py-6">
              Start Learning
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="heading-2 mb-12 text-center">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-lindy-primary bg-opacity-10 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-lindy-primary opacity-40" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-medium bg-lindy-primary bg-opacity-10 text-lindy-primary px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                    <div className="text-xs text-lindy-gray">
                      {course.duration} • {course.modules} modules
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                  <p className="text-lindy-gray text-sm mb-6">{course.description}</p>
                  <Button variant="outline" className="w-full">View Course</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Learning Paths</h2>
            <p className="text-lg text-lindy-gray max-w-2xl mx-auto">
              Structured curriculum designed to help you achieve your specific goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Lindy.ai Fundamentals</h3>
              <p className="text-lindy-gray mb-6">
                Perfect for beginners who want to learn the basics of using Lindy.ai in their workflows.
              </p>
              <ul className="space-y-2 mb-6 text-lindy-gray">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-lindy-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Platform Orientation
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-lindy-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Basic Automation
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-lindy-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Initial Setup Guide
                </li>
              </ul>
              <Button className="w-full">Start Path</Button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Business Optimization</h3>
              <p className="text-lindy-gray mb-6">
                For professionals looking to transform their business operations with AI-powered solutions.
              </p>
              <ul className="space-y-2 mb-6 text-lindy-gray">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-lindy-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Workflow Automation
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-lindy-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Integration Strategies
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-lindy-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ROI Measurement
                </li>
              </ul>
              <Button className="w-full">Start Path</Button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-lindy-primary rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Developer Track</h3>
              <p className="text-lindy-gray mb-6">
                Advanced curriculum for developers who want to build on top of the Lindy.ai platform.
              </p>
              <ul className="space-y-2 mb-6 text-lindy-gray">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-lindy-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  API Integration
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-lindy-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Custom Models
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-lindy-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Advanced Customization
                </li>
              </ul>
              <Button className="w-full">Start Path</Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <h2 className="heading-2">Explore All Courses</h2>
            <div className="mt-4 md:mt-0">
              <Button variant="outline">Filter Courses</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-lindy-primary bg-opacity-10 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-lindy-primary opacity-40" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-medium bg-lindy-primary bg-opacity-10 text-lindy-primary px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                    <div className="text-xs text-lindy-gray">
                      {course.duration} • {course.modules} modules
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                  <p className="text-lindy-gray text-sm mb-6">{course.description}</p>
                  <Button variant="outline" className="w-full">View Course</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">Load More Courses</Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-lindy-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to become a Lindy.ai expert?</h2>
            <p className="text-lg mb-8 text-white text-opacity-90">
              Create your free account today and start learning with our comprehensive courses.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-lindy-primary hover:bg-opacity-90">
                Sign Up Free
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                Contact Sales for Team Training
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademyPage;
