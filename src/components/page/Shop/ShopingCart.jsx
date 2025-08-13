import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavBar from '../Home/Navbar/NavBar';
import useCart from '../../../Hooks/useCart';

const ShopingCart = () => {
   const {cartItems, refetch,} = useCart();
   console.log('Cart Items:', cartItems);   
    

    const updateQuantity = async (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(id);
            return;
        }
        
        try {
            await axios.patch(`http://localhost:3100/cart/${id}`, { quantity: newQuantity });
            refetch(); // Refetch data after update
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (id) => {
        console.log('Removing item with ID:', id); // Debug log
        try {
            const response = await axios.delete(`http://localhost:3100/cart/${id}`);
            console.log('Delete response:', response.data); // Log response
            
            if(response.data.deletedCount > 0) {
                 await refetch();
                console.log('Item successfully removed');
                // Refetch data first
                alert('Item removed from cart');
            }
        } catch (error) {
            console.error('Error removing item:', error.response?.data || error.message);
            alert('Failed to remove item');
        }
    };



    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };
    
   
    
    return (
        <div>
            <NavBar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-green-600 hover:text-green-700">
                            <FaArrowLeft className="text-lg" />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    </div>
                    <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {getTotalItems()} items
                    </span>
                </div>

                {cartItems.length === 0 ? (
                    /* Empty Cart */
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                        <div className="text-8xl text-gray-300 mb-6">🛒</div>
                        <h2 className="text-3xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 text-lg">Looks like you haven't added anything to your cart yet</p>
                        <Link 
                            to="/category" 
                            className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-4">
                                        <img 
                                            src={item.image || 'https://via.placeholder.com/100'} 
                                            alt={item.productName}
                                            className="w-24 h-24 object-cover rounded-lg border"
                                        />
                                        
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                {item.productName}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                                            <p className="text-xl font-bold text-green-600">
                                                BDT {item.price?.toLocaleString()}
                                            </p>
                                        </div>
                                        
                                        {/* Quantity Controls */}
                                        <div className="flex items-center space-x-3">
                                            <button 
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                            >
                                                <FaMinus className="text-xs" />
                                            </button>
                                            <span className="w-12 text-center font-semibold text-lg">
                                                {item.quantity}
                                            </span>
                                            <button 
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                            >
                                                <FaPlus className="text-xs" />
                                            </button>
                                        </div>

                                        {/* Item Total */}
                                        <div className="text-right min-w-24">
                                            <p className="text-xl font-bold text-gray-900">
                                                BDT {(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Remove Button */}
                                        <button 
                                            onClick={() => removeItem(item._id)}
                                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
                                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-lg">
                                        <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                                        <span className="font-semibold">BDT {getTotalPrice().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-semibold text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax (5%)</span>
                                        <span className="font-semibold">BDT {Math.round(getTotalPrice() * 0.05).toLocaleString()}</span>
                                    </div>
                                    <hr className="border-gray-200" />
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-green-600">
                                            BDT {(getTotalPrice() + Math.round(getTotalPrice() * 0.05)).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors mb-4 font-semibold text-lg">
                                    Proceed to Checkout
                                </button>
                                
                                <Link 
                                    to="/" 
                                    className="w-full block text-center bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopingCart;