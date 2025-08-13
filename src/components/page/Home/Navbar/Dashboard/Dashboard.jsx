import React, { useContext } from 'react';
import { AuthContext } from '../../../../../providers/AuthProvider';
import useAdmin from '../../../../../Hooks/useAdmin';
import NavBar from '../../Navbar/NavBar';
import { Links, NavLink } from 'react-router-dom';
import useCart from '../../../../../Hooks/useCart';
import useWishlist from '../../../../../Hooks/useWishlist';

const Dashboard = () => {
    const {user} = useContext(AuthContext);
    const {isAdmin, isAdminLoading} = useAdmin();
    const {cartItems}=useCart()
    const {wishlistItems}=useWishlist();
    console.log('user in Dashboard:', isAdmin);
    console.log('isAdminLoading:', isAdminLoading);
    console.log('user email:', user?.email);
    
    if (isAdminLoading) {
        return (
            <div>
                <NavBar />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg"></div>
                        <p className="mt-4">Loading admin status...</p>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 text-center">
                        {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
                    </h1>
                     
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Welcome Back!</h2>
                            <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
                            <p className="mb-2"><strong>Role:</strong> {isAdmin ? 'Administrator' : 'Customer'}</p>
                            <div className={`p-3 rounded-lg ${isAdmin ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                <span className="font-semibold">
                                    {isAdmin ? '🛠️ Admin Access' : '🛒 Customer Access'}
                                </span>
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                            {isAdmin ? (
                                <div className="space-y-2">
                                    <p><strong>Total Users:</strong> 156</p>
                                    <p><strong>Total Products:</strong> 89</p>
                                    <p><strong>Pending Orders:</strong> 23</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p><strong>Total Orders:</strong> comig this features </p>
                                    <p><strong>Wishlist Items:</strong> {wishlistItems.length}</p>
                                    <p><strong>Cart Items:</strong> {cartItems.length}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Admin Options */}
                    {isAdmin && (
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-6">Admin Management</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors duration-200">
                                    <div className="text-3xl mb-2">👥</div>
                                    <h3 className="font-semibold text-blue-800">Manage Users</h3>
                                    <p className="text-sm text-gray-600">View and manage user accounts</p>
                                </button>
                                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors duration-200">
                                    <div className="text-3xl mb-2">📦</div>
                                    <h3 className="font-semibold text-green-800">Manage Products</h3>
                                    <p className="text-sm text-gray-600">Add, edit, and delete products</p>
                                </button>
                                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors duration-200">
                                    <div className="text-3xl mb-2">📋</div>
                                    <h3 className="font-semibold text-purple-800">View Orders</h3>
                                    <p className="text-sm text-gray-600">Monitor and manage orders</p>
                                </button>
                                <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors duration-200">
                                    <div className="text-3xl mb-2">📊</div>
                                    <h3 className="font-semibold text-orange-800">Analytics</h3>
                                    <p className="text-sm text-gray-600">View sales and statistics</p>
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* User Options */}
                    {!isAdmin && (
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-6">Your Account</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors duration-200">
                                    <div className="text-3xl mb-2">📋</div>
                                    <h3 className="font-semibold text-blue-800">My Orders</h3>
                                    <p className="text-sm text-gray-600">View your order history</p>
                                </button>
                                <NavLink to='/wishlist' className="p-4 bg-red-50 hover:bg-red-100 rounded-lg text-center transition-colors duration-200">
                                    <div className="text-3xl mb-2">❤️</div>
                                    <h3 className="font-semibold text-red-800">Wishlist</h3>
                                    <p className="text-sm text-gray-600">View saved items</p>
                                </NavLink>
                                <NavLink to='/cart' className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors duration-200">
                                    <div className="text-3xl mb-2">🛒</div>
                                    <h3 className="font-semibold text-green-800">Shopping Cart</h3>
                                    <p className="text-sm text-gray-600">View cart items</p>
                                </NavLink>
                                <NavLink to="/profile" className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors duration-200">
                                    <div className="text-3xl mb-2">👤</div>
                                    <h3 className="font-semibold text-purple-800">Profile</h3>
                                    <p className="text-sm text-gray-600">Manage your profile</p>
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;