import React from "react";

const blogs = [
  {
    id: 1,
    title: "5 Tips to Enhance Your Online Shopping Experience",
    description:
      "Discover effective tips to make your online shopping faster, safer, and more enjoyable. Learn how to find the best deals and avoid common pitfalls.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    date: "Oct 20, 2025",
    author: "Admin",
    link: "/blog/5-tips-online-shopping",
  },
  {
    id: 2,
    title: "Top 10 E-Commerce Trends in 2025",
    description:
      "Stay ahead of the curve by exploring the latest e-commerce trends. From AI-powered recommendations to mobile-first experiences, learn what's shaping online retail.",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
    date: "Oct 18, 2025",
    author: "Admin",
    link: "/blog/ecommerce-trends-2025",
  },
  {
    id: 3,
    title: "How to Choose the Right Product Online",
    description:
      "Buying online can be tricky. Learn how to evaluate product quality, check reviews, and make informed decisions to ensure satisfaction.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    date: "Oct 15, 2025",
    author: "Admin",
    link: "/blog/choose-right-product",
  },
];

const BlogSection = () => {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Latest From Our Blog</h2>
        <p className="mt-2 text-gray-600">
          Stay updated with tips, trends, and guides from our experts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-700 flex-grow mb-4 line-clamp-3">
                {blog.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>{blog.author}</span>
                <span>{blog.date}</span>
              </div>
              <a
                href={blog.link}
                className="mt-auto text-blue-600 hover:underline font-medium"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
