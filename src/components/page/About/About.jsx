import React from 'react';
import NavBar from '../Home/Navbar/NavBar';

const About = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className='max-w-6xl mx-auto px-4 py-12'>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About EasyShop</h1>
                    <p className="text-lg text-gray-600">Your trusted partner for online shopping</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Story</h2>
                        <p className=" mb-4 text-black">
                            Founded with a vision to make online shopping accessible and enjoyable for everyone, 
                            EasyShop has been serving customers with quality products and exceptional service.
                        </p>
                        <p className="text-black">
                            We believe in connecting people with the products they love while providing 
                            a seamless shopping experience from browse to delivery.
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-8 text-white text-center">
                        <h3 className="text-2xl font-bold mb-4">10,000+</h3>
                        <p className="text-lg">Happy Customers</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <div className="text-4xl mb-4">🛍️</div>
                        <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
                        <p className="text-gray-600">Thousands of products across multiple categories</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <div className="text-4xl mb-4">🚚</div>
                        <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                        <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <div className="text-4xl mb-4">💯</div>
                        <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                        <p className="text-gray-600">100% authentic products with warranty</p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        To revolutionize the way people shop online by providing an intuitive, 
                        secure, and delightful e-commerce experience that brings quality products 
                        and exceptional customer service together.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;