import React, { useContext, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useCart from '../../../../Hooks/useCart';
import { MdOutlineFavorite } from "react-icons/md";
import useWishlist from '../../../../Hooks/useWishlist';
import { AuthContext } from '../../../../providers/AuthProvider';

const NavBar = () => {
  // Define the links for the navigation bar
   const [query,setQuery]=useState('');
   const [results,setResults]=useState([]);
   const {cartItems, refetch} = useCart();
   const {wishlistItems}=useWishlist();
   const {user,logout}=useContext(AuthContext);
   
   // Real-time search as user types
   const handleInputChange = async (e) => {
     const searchQuery = e.target.value;
     setQuery(searchQuery);
     
     if (!searchQuery.trim()) {
       setResults([]);
       return;
     }
     
     try {
       const res = await fetch(`http://localhost:3100/products/search/${encodeURIComponent(searchQuery)}`);
       if (!res.ok) {
         throw new Error("Failed to fetch search results");
       }
       const data = await res.json();
       setResults(data);
     } catch (error) {
       console.error("Error fetching search results:", error);
       setResults([]);
     }
   };

   const handleSearch = (e) => {
     e.preventDefault();
     // Search is already handled by handleInputChange
   }
   const Scroll=()=>{
      window.scrollTo(0, 0);
   }

    const links=<>
      <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20 ${
                isActive ? 'bg-white bg-opacity-25 text-white font-semibold' : 'text-white'
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/login" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20 ${
                isActive ? 'bg-white bg-opacity-25 text-white font-semibold' : 'text-white'
              }`
            }
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20 ${
                isActive ? 'bg-white bg-opacity-25 text-white font-semibold' : 'text-white'
              }`
            }
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/add-product" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20 ${
                isActive ? 'bg-white bg-opacity-25 text-white font-semibold' : 'text-white'
              }`
            }
          >
            Add-Product
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20 ${
                isActive ? 'bg-white bg-opacity-25 text-white font-semibold' : 'text-white'
              }`
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20 ${
                isActive ? 'bg-white bg-opacity-25 text-white font-semibold' : 'text-white'
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20 ${
                isActive ? 'bg-white bg-opacity-25 text-white font-semibold' : 'text-white'
              }`
            }
          >
            Contact
          </NavLink>
        </li>
    </>
    const navigate=useNavigate();
    const handleLogout=()=>{
      logout()
      .then(()=>{
        console.log('User logged out');
        navigate('/login');
      })
      .catch((error)=>{
        console.error('Error logging out:', error);
      });
    }
    return (
      <>
        <div className="navbar bg-green-600 shadow-sm sticky top-0 z-50">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                {links}
              </ul>
            </div>
            <Link to='/' className="btn btn-ghost text-xl text-white hover:bg-black"
             onClick={Scroll}>EasyShop</Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
             {links}
            </ul>
          </div>
          <div className="navbar-end">
            <div className='mr-4 text-xl font-bold'>
              <NavLink to="/cart" className="flex items-center">
                <button className="btn">
                    <FaShoppingCart></FaShoppingCart>
                      <div className="badge badge-sm badge-secondary">
                         +{cartItems.length}
                      </div>
                    </button>
                </NavLink>
              </div>
              <div className='mr-4 text-xl font-bold'> 
                <NavLink to="/wishlist" className="flex items-center">
                  <button className="btn">
                   <p className='text-xl'> <MdOutlineFavorite /></p>
                    <div className="badge badge-sm badge-secondary">
                      +{wishlistItems.length}
                    </div>
                  </button>
                </NavLink>
              </div>
              {
                user ? (
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost text-white hover:bg-black">
                      <div className="flex items-center gap-2">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-8">
                            <span className="text-xs">{user.email?.charAt(0).toUpperCase()}</span>
                          </div>
                        </div>
                        <span className="hidden md:inline text-sm">{user.email}</span>
                      </div>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                      <li className="menu-title">
                        <span className="text-xs text-gray-500">Signed in as</span>
                        <span className="text-sm font-medium text-gray-800 truncate">{user.email}</span>
                      </li>
                      <div className="divider my-1"></div>
                      <li>
                        <NavLink to="/profile" className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/settings" className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </NavLink>
                      </li>
                      <div className="divider my-1"></div>
                      <li>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 w-full">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className='mr-4'>
                    <NavLink to="/login" className="btn btn-ghost text-white hover:bg-black">
                      Login
                    </NavLink>
                  </div>
                )
              }
          </div>
        </div>

        {/* Search Bar in separate line */}
        <div className="bg-green-500 py-3 px-4 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto">
            <div className="form-control relative max-w-md mx-auto">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="input input-bordered w-full pr-10 focus:ring-2 focus:ring-green-300" 
                value={query} 
                onChange={handleInputChange}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-green-600" onClick={handleSearch}>
                <IoIosSearch />
              </button>
              {results.length > 0 && (
                <ul className="absolute bg-white shadow-lg rounded mt-2 w-full max-h-60 overflow-y-auto z-50 border top-full">
                  {results.map((result) => (
                    <li key={result._id} className="p-2 hover:bg-gray-100 border-b">
                      <NavLink to={`/product/${result._id}`} className="text-gray-800 block">
                        <div className="font-medium">{result.productName}</div>
                        <div className="text-sm text-gray-500">BDT {result.price}</div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </>
    );
};

export default NavBar;