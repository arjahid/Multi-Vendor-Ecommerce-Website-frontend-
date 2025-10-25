import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Verified Buyer",
    message:
      "Amazing shopping experience! The products arrived on time and the quality is top-notch. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Michael Smith",
    role: "Verified Buyer",
    message:
      "Customer support was very helpful and responsive. I love the variety of products available.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Verified Buyer",
    message:
      "Great website! Easy to navigate, fast checkout, and the recommendations are really useful.",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-8 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          What Our Customers Say
        </h2>
        <p className="mt-2 text-gray-600">
          Real feedback from our happy customers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <div className="flex items-center mb-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-700 flex-grow">"{t.message}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
