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
        {/* <li>
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
        </li> */}
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
    // Mobile variant of the same links — dark text for light dropdown background
    const mobileLinks=<>
      <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 ${
                isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-800'
              }`
            }
          >
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink 
            to="/login" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 ${
                isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-800'
              }`
            }
          >
            Login
          </NavLink>
        </li> */}
        <li>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 ${
                isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-800'
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
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 ${
                isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-800'
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
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 ${
                isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-800'
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
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 ${
                isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-800'
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
              `px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 ${
                isActive ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-800'
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
        <header className="sticky top-0 z-50 bg-green-600 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* left: mobile menu + brand */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger (visible on small screens) */}
            <div className="md:hidden">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-56">
                  {mobileLinks}
                </ul>
              </div>
            </div>

            {/* Brand */}
            <Link to='/' className="text-white text-xl font-bold btn btn-ghost hover:bg-black/10" onClick={Scroll}>
              EasyShop
            </Link>
          </div>

          {/* center: nav links (hidden on small screens) */}
          <nav className="hidden md:flex md:flex-1 md:justify-center">
            <ul className="menu menu-horizontal px-1">
              {links}
            </ul>
          </nav>

          {/* right: actions (cart, wishlist, user/login) */}
          <div className="flex items-center gap-2">
            <NavLink to="/cart" className="relative">
              <button className="btn btn-ghost text-white">
                <FaShoppingCart className="w-5 h-5" />
              </button>
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                {cartItems.length}
              </span>
            </NavLink>

            <NavLink to="/wishlist" className="relative">
              <button className="btn btn-ghost text-white">
                <MdOutlineFavorite className="w-5 h-5" />
              </button>
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                {wishlistItems.length}
              </span>
            </NavLink>

            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost text-white gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="text-xs">{user.email?.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <span className="hidden md:inline text-sm truncate max-w-[10rem]">{user.email}</span>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56">
                  <li className="menu-title">
                    <span className="text-xs text-gray-500">Signed in as</span>
                    <span className="text-sm font-medium text-gray-800 truncate">{user.email}</span>
                  </li>
                  <div className="divider my-1"></div>
                  <li><NavLink to="/profile">Profile</NavLink></li>
                  <li><NavLink to="/settings">Settings</NavLink></li>
                  <div className="divider my-1"></div>
                  <li>
                    <button onClick={handleLogout} className="text-red-600 w-full text-left">Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink to="/login" className="btn btn-ghost text-white">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Search row: full width on small, centered on larger screens */}
      <div className="bg-green-500 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full pr-10"
              value={query}
              onChange={handleInputChange}
              aria-label="Search products"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-green-700"
              aria-label="Search"
            >
              <IoIosSearch />
            </button>

            {results.length > 0 && (
              <ul className="absolute left-0 right-0 mt-2 bg-white rounded shadow-lg max-h-60 overflow-auto z-50 border">
                {results.map(result => (
                  <li key={result._id} className="p-2 hover:bg-gray-100 border-b">
                    <NavLink to={`/product/${result._id}`} onClick={() => setResults([])} className="flex justify-between">
                      <div className="font-medium text-gray-800">{result.productName}</div>
                      <div className="text-sm text-gray-500">BDT {result.price}</div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
      </>
    );
};

export default NavBar;