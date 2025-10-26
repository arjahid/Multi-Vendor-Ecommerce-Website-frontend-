import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import FaTrash from '@react-icons/all-files/fa/FaTrash';
import FaMinus from '@react-icons/all-files/fa/FaMinus';
import FaPlus from '@react-icons/all-files/fa/FaPlus';
import FaArrowLeft from '@react-icons/all-files/fa/FaArrowLeft';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../Home/Navbar/NavBar';
import useCart from '../../../Hooks/useCart';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';

const ShopingCart = () => {
   const {cartItems, refetch,} = useCart();
   const {user}=useContext(AuthContext);
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
        return cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price) || 0;
            const itemQuantity = parseInt(item.quantity) || 0;
            return total + (itemPrice * itemQuantity);
        }, 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => {
            const itemQuantity = parseInt(item.quantity) || 0;
            return total + itemQuantity;
        }, 0);
    };
    const navigate=useNavigate();
   
    const handleOrder=(cart)=>{
        // console.log("Order placed",cart);
        if(!user?.email){
            alert('Please log in to place an order.');
            navigate('/login');
            return;
            
        }
        const orderData={
            userEmail: user.email,
            items: cart,
            orderDate: new Date(),
            status: 'pending'
        }
          console.log('Order placed',orderData);
        axios.post('http://localhost:3100/orders', orderData)
    
      
        .then(response => {
            console.log('Order response:', response.data);
            Swal.fire('Success', 'Order placed successfully!', 'success');
            // Optionally, you can clear the cart here
        })
        .catch(error => {
            console.error('Error placing order:', error);
            Swal.fire('Error', 'Failed to place order. Please try again.', 'error');
        });
    }
   
    
    return (
        <div>
            <NavBar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center space-x-3">
                        <Link to="/" className="text-green-600 hover:text-green-700">
                            <FaArrowLeft className="text-lg" />
                        </Link>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h1>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Cart Items: span 2 cols on md+ */}
                        <div className="md:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-white rounded-lg shadow-sm border p-4 md:p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                        <img 
                                            src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                                            alt={item.productName}
                                            className="w-full md:w-24 h-40 md:h-24 object-cover rounded-lg border flex-none"
                                        />
                                        
                                        <div className="flex-1 w-full">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                {item.productName}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                                            <p className="text-xl font-bold text-green-600 mb-3">
                                                BDT {parseFloat(item.price || 0).toLocaleString()}
                                            </p>

                                            {/* Controls: stack on small, inline on md */}
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                                <div className="flex items-center space-x-2">
                                                    <button 
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                                    >
                                                        <FaMinus className="text-xs" />
                                                    </button>
                                                    <span className="w-12 text-center font-semibold text-lg">
                                                        {item.quantity}
                                                    </span>
                                                    <button 
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                        className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                                    >
                                                        <FaPlus className="text-xs" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                                                    <div className="text-right">
                                                        <p className="text-xl font-bold text-gray-900">
                                                            ৳{((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <button 
                                                        onClick={() => removeItem(item._id)}
                                                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary: sticky on md+ only */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border p-6 md:sticky md:top-8">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                                        <span className="font-semibold text-gray-800">৳{getTotalPrice().toLocaleString()}</span>
                                    </div>
                                    
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">Delivery Fee</span>
                                        <span className="font-semibold text-green-600">Free</span>
                                    </div>
                                    
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">Discount</span>
                                        <span className="font-semibold text-red-600">-৳0</span>
                                    </div>
                                    
                                    <hr className="border-gray-300" />
                                    
                                    <div className="flex justify-between py-3 text-xl font-bold">
                                        <span className="text-gray-800">Total</span>
                                        <span className="text-green-600">৳{getTotalPrice().toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button onClick={()=>handleOrder(cartItems)} className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold text-lg shadow-lg">
                                        Proceed to Order
                                    </button>
                                    
                                    <Link 
                                        to="/" 
                                        className="w-full block text-center bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                 )}
             </div>
         </div>
     );
};

export default ShopingCart;