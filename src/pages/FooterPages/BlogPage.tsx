
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BlogPage = () => {
  // Sample blog data
  const featuredPost = {
    id: 1,
    title: "The Future of AI in Business Operations",
    excerpt: "Exploring how artificial intelligence is transforming how businesses operate and make decisions.",
    author: "Dr. Jane Doe",
    role: "Co-Founder & CEO",
    date: "May 1, 2025",
    category: "AI Trends",
    image: "featured-post-image.jpg"
  };

  const recentPosts = [
    {
      id: 2,
      title: "5 Ways AI Can Streamline Your Customer Service",
      excerpt: "Learn how artificial intelligence can help your team provide better, faster customer support.",
      author: "Michael Smith",
      date: "April 28, 2025",
      category: "Customer Success",
      image: "post-2-image.jpg"
    },
    {
      id: 3,
      title: "Implementing Machine Learning: A Step-by-Step Guide",
      excerpt: "A practical guide to successfully implementing machine learning solutions in your organization.",
      author: "Elena Liu",
      date: "April 22, 2025",
      category: "Implementation",
      image: "post-3-image.jpg"
    },
    {
      id: 4,
      title: "The ROI of AI: Measuring Success in Your AI Initiatives",
      excerpt: "How to measure and maximize the return on investment from your artificial intelligence projects.",
      author: "David Johnson",
      date: "April 15, 2025",
      category: "Business Strategy",
      image: "post-4-image.jpg"
    }
  ];

  const categories = [
    "AI Trends", "Business Strategy", "Customer Success", "Implementation", 
    "Case Studies", "Product Updates", "Data Science", "Industry News"
  ];

  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Our Blog</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Insights, news, and resources on AI, machine learning, and business innovation
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="heading-2 mb-8">Featured Article</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-lindy-primary bg-opacity-10 p-12 flex items-center">
                <div className="text-center w-full">
                  <span className="text-8xl font-bold text-lindy-primary opacity-20">AI</span>
                  <p className="text-lindy-gray mt-4">Featured article image placeholder</p>
                </div>
              </div>
              <div className="p-12">
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium bg-lindy-primary bg-opacity-10 text-lindy-primary px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-lindy-gray text-sm ml-4">{featuredPost.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-lindy-gray mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-lindy-primary rounded-full flex items-center justify-center text-white font-bold">
                      JD
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{featuredPost.author}</p>
                      <p className="text-sm text-lindy-gray">{featuredPost.role}</p>
                    </div>
                  </div>
                  <Button variant="outline">Read More</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="heading-2">Recent Articles</h2>
            <div className="mt-4 md:mt-0">
              <Button variant="outline">View All Articles</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-lindy-primary bg-opacity-10 flex items-center justify-center">
                  <span className="text-4xl font-bold text-lindy-primary opacity-20">LINDY</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-xs font-medium bg-lindy-primary bg-opacity-10 text-lindy-primary px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-lindy-gray text-xs ml-3">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-lindy-gray text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">By {post.author}</p>
                    <Button variant="ghost" size="sm" className="text-lindy-primary">
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories & Newsletter */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Categories */}
            <div>
              <h2 className="heading-3 mb-6">Browse by Category</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <Button key={index} variant="outline" className="mb-2">
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-lindy-primary p-8 rounded-xl text-white">
              <h2 className="heading-3 mb-4 text-white">Subscribe to Our Newsletter</h2>
              <p className="mb-6 text-white text-opacity-80">
                Stay up to date with the latest insights, news, and resources on AI and machine learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md text-lindy-secondary flex-grow"
                />
                <Button className="bg-white text-lindy-primary hover:bg-opacity-90 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <p className="mt-4 text-sm text-white text-opacity-70">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
