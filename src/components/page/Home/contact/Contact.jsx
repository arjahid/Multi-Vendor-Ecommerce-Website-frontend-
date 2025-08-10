import React from 'react';
import NavBar from '../Navbar/NavBar';

const Contact = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Contact Info */}
                        <div className="bg-green-600 p-8 lg:p-12 text-white">
                            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 mr-4">📍</div>
                                    <p>123 Business Street, City, State 12345</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-6 h-6 mr-4">📞</div>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-6 h-6 mr-4">✉️</div>
                                    <p>contact@easyshop.com</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Contact Form */}
                        <div className="p-8 lg:p-12">
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        required 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        required 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        required 
                                        rows="6"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200 resize-vertical"
                                        placeholder="Tell us how we can help you..."
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Contact;