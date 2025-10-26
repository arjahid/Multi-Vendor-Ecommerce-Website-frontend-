import React from 'react';
import FaShippingFast from '@react-icons/all-files/fa/FaShippingFast';
import FaShoppingCart from '@react-icons/all-files/fa/FaShoppingCart';
import FaClock from '@react-icons/all-files/fa/FaClock';
import FaHeadset from '@react-icons/all-files/fa/FaHeadset';

const Card = () => {
    const features = [
        {
            id: 1,
            title: "Fast Delivery",
            description: "Lightning-fast delivery service to get your products delivered within 24 hours",
            icon: <FaShippingFast className="text-4xl text-green-600" />
        },
        {
            id: 2,
            title: "Easy Shopping",
            description: "Simple and intuitive shopping experience with user-friendly interface",
            icon: <FaShoppingCart className="text-4xl text-green-600" />
        },
        {
            id: 3,
            title: "24/7 Service",
            description: "Round-the-clock customer service support for all your queries and needs",
            icon: <FaClock className="text-4xl text-green-600" />
        },
        {
            id: 4,
            title: "Customer Support",
            description: "Dedicated customer support team ready to help you with any issues",
            icon: <FaHeadset className="text-4xl text-green-600" />
        }
    ];

    return (
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose EasyShop?</h2>
                    <p className="text-gray-600 text-lg">Experience the best online shopping with our premium services</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map(feature => (
                        <div key={feature.id} className="bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-6 text-center group cursor-pointer border border-gray-100 hover:border-green-200">
                            <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                <div className="p-3 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors duration-300">
                                    {React.cloneElement(feature.icon, { 
                                        className: "text-4xl text-green-600 group-hover:text-green-700 transition-colors duration-300" 
                                    })}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-1 bg-green-600 mx-auto rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;