// import React, { useContext } from 'react';
// import { AuthContext } from '../../../../../providers/AuthProvider';
// import useAdmin from '../../../../../Hooks/useAdmin';
// import NavBar from '../../Navbar/NavBar';
// import { Links, NavLink, Outlet } from 'react-router-dom';
// import useCart from '../../../../../Hooks/useCart';
// import useWishlist from '../../../../../Hooks/useWishlist';
// import useAllUsers from '../../../../../Hooks/allUser';
// import AllProducts from '../../../../../Hooks/All_Products';

// const Dashboard = () => {
//     const {user} = useContext(AuthContext);
//     const {isAdmin, isAdminLoading} = useAdmin();
//     const {cartItems}=useCart()
//     const {wishlistItems}=useWishlist();
//     const{users,loading}=useAllUsers()
//     const {products}=AllProducts();
    
//     if (isAdminLoading) {
//         return (
//             <div>
//                 <NavBar />
//                 <div className="flex items-center justify-center min-h-screen">
//                     <div className="text-center">
//                         <div className="loading loading-spinner loading-lg"></div>
//                         <p className="mt-4">Loading admin status...</p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
    
//     return (
//         <div>
//             <NavBar />
//             <div className="min-h-screen bg-gray-50 p-8">
//                 <div className="max-w-6xl mx-auto">
//                     <h1 className="text-4xl font-bold mb-8 text-center">
//                         {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
//                     </h1>
                     
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-xl font-semibold mb-4">Welcome Back!</h2>
//                             <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
//                             <p className="mb-2"><strong>Role:</strong> {isAdmin ? 'Administrator' : 'Customer'}</p>
//                             <div className={`p-3 rounded-lg ${isAdmin ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
//                                 <span className="font-semibold">
//                                     {isAdmin ? '🛠️ Admin Access' : '🛒 Customer Access'}
//                                 </span>
//                             </div>
//                         </div>
                        
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
//                             {isAdmin ? (
//                                 <div className="space-y-2">
//                                     <p><strong>Total Users:</strong> {users.length}</p>
//                                     <p><strong>Total Products:</strong> {products.length}</p>
//                                     <p><strong>Pending Orders:</strong> 23</p>
//                                 </div>
//                             ) : (
//                                 <div className="space-y-2">
//                                     <p><strong>Total Orders:</strong> comig this features </p>
//                                     <p><strong>Wishlist Items:</strong> {wishlistItems.length}</p>
//                                     <p><strong>Cart Items:</strong> {cartItems.length}</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
                    
//                     {/* Admin Options */}
//                     {isAdmin && (
//                         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//                             <h2 className="text-2xl font-semibold mb-6">Admin Management</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                                 <NavLink to='/dashboard/admin/users' className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors duration-200">
//                                     <div className="text-3xl mb-2">👥</div>
//                                     <h3 className="font-semibold text-blue-800">Manage Users ({users.length})</h3>
//                                     <p className="text-sm text-gray-600">View and manage user accounts</p>
//                                 </NavLink>
//                                 <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors duration-200">
//                                     <div className="text-3xl mb-2">📦</div>
//                                     <h3 className="font-semibold text-green-800">Manage Products</h3>
//                                     <p className="text-sm text-gray-600">Add, edit, and delete products</p>
//                                 </button>
//                                 <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors duration-200">
//                                     <div className="text-3xl mb-2">📋</div>
//                                     <h3 className="font-semibold text-purple-800">View Orders</h3>
//                                     <p className="text-sm text-gray-600">Monitor and manage orders</p>
//                                 </button>
//                                 <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors duration-200">
//                                     <div className="text-3xl mb-2">📊</div>
//                                     <h3 className="font-semibold text-orange-800">Analytics</h3>
//                                     <p className="text-sm text-gray-600">View sales and statistics</p>
//                                 </button>
//                             </div>
//                         </div>
//                     )}
                    
//                     {/* User Options */}
//                     {!isAdmin && (
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl font-semibold mb-6">Your Account</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                                 <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors duration-200">
//                                     <div className="text-3xl mb-2">📋</div>
//                                     <h3 className="font-semibold text-blue-800">My Orders</h3>
//                                     <p className="text-sm text-gray-600">View your order history</p>
//                                 </button>
//                                 <NavLink to='/wishlist' className="p-4 bg-red-50 hover:bg-red-100 rounded-lg text-center transition-colors duration-200">
//                                     <div className="text-3xl mb-2">❤️</div>
//                                     <h3 className="font-semibold text-red-800">Wishlist</h3>
//                                     <p className="text-sm text-gray-600">View saved items</p>
//                                 </NavLink>
//                                 <NavLink to='/cart' className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors duration-200">
//                                     <div className="text-3xl mb-2">🛒</div>
//                                     <h3 className="font-semibold text-green-800">Shopping Cart</h3>
//                                     <p className="text-sm text-gray-600">View cart items</p>
//                                 </NavLink>
//                                 <NavLink to="/profile" className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors duration-200">
//                                     <div className="text-3xl mb-2">👤</div>
//                                     <h3 className="font-semibold text-purple-800">Profile</h3>
//                                     <p className="text-sm text-gray-600">Manage your profile</p>
//                                 </NavLink>
//                             </div>
//                         </div>
//                     )}
//                     <Outlet>

//                     </Outlet>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../../providers/AuthProvider';
import useAdmin from '../../../../../Hooks/useAdmin';
import NavBar from '../../Navbar/NavBar';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../../../../../Hooks/useCart';
import useWishlist from '../../../../../Hooks/useWishlist';
import useAllUsers from '../../../../../Hooks/allUser';
import AllProducts from '../../../../../Hooks/All_Products';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { isAdmin, isAdminLoading } = useAdmin();
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const { users } = useAllUsers();
    const { products } = AllProducts();
    const [collapsed, setCollapsed] = useState(false); // sidebar toggle

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
        <div className="flex flex-col min-h-screen">
            <NavBar />

            <div className="flex flex-1 bg-gray-50">
                {/* Sidebar */}
                <aside
                    className={`bg-white shadow-lg p-6 flex flex-col transition-all duration-300 ${
                        collapsed ? 'w-20' : 'w-64'
                    }`}
                >
                    {/* Collapse Button */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="mb-6 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition self-end"
                    >
                        {collapsed ? '➡️' : '⬅️'}
                    </button>

                    {/* Role Info */}
                    {!collapsed && (
                        <div className="bg-gray-100 p-4 rounded-lg text-center mb-6">
                            <p className="font-semibold">{user?.email}</p>
                            <p className="text-sm">{isAdmin ? 'Administrator' : 'Customer'}</p>
                        </div>
                    )}

                    {/* Nav Links */}
                    <div className="flex flex-col space-y-2">
                        {isAdmin ? (
                            <>
                                <NavLink
                                    to="admin/users"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition ${
                                            isActive ? 'bg-blue-200 font-semibold' : 'bg-blue-50'
                                        }`
                                    }
                                >
                                    <span className="text-xl">👥</span>
                                    {!collapsed && <span>Manage Users ({users.length})</span>}
                                </NavLink>

                                <button className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition">
                                    <span className="text-xl">📦</span>
                                    {!collapsed && <span>Manage Products</span>}
                                </button>

                                <button className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition">
                                    <span className="text-xl">📋</span>
                                    {!collapsed && <span>View Orders</span>}
                                </button>

                                <button className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition">
                                    <span className="text-xl">📊</span>
                                    {!collapsed && <span>Analytics</span>}
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="userHome"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition ${
                                            isActive ? 'bg-blue-200 font-semibold' : 'bg-blue-50'
                                        }`
                                    }
                                >
                                    <span className="text-xl">📋</span>
                                    {!collapsed && <span>My Orders</span>}
                                </NavLink>

                                <NavLink
                                    to="/wishlist"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 transition ${
                                            isActive ? 'bg-red-200 font-semibold' : 'bg-red-50'
                                        }`
                                    }
                                >
                                    <span className="text-xl">❤️</span>
                                    {!collapsed && <span>Wishlist ({wishlistItems.length})</span>}
                                </NavLink>

                                <NavLink
                                    to="/cart"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-lg hover:bg-green-100 transition ${
                                            isActive ? 'bg-green-200 font-semibold' : 'bg-green-50'
                                        }`
                                    }
                                >
                                    <span className="text-xl">🛒</span>
                                    {!collapsed && <span>Shopping Cart ({cartItems.length})</span>}
                                </NavLink>

                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 transition ${
                                            isActive ? 'bg-purple-200 font-semibold' : 'bg-purple-50'
                                        }`
                                    }
                                >
                                    <span className="text-xl">👤</span>
                                    {!collapsed && <span>Profile</span>}
                                </NavLink>
                            </>
                        )}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="bg-white rounded-lg shadow-lg p-6 min-h-[70vh]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
