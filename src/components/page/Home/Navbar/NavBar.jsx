import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';
import useCart from '../../../../Hooks/useCart';
import { MdOutlineFavorite } from "react-icons/md";
import useWishlist from '../../../../Hooks/useWishlist';

const NavBar = () => {
  // Define the links for the navigation bar
   const [query,setQuery]=useState('');
   const [results,setResults]=useState([]);
   const {cartItems, refetch} = useCart();
   const {wishlistItems}=useWishlist();
   
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
        <li ><NavLink to="/login" >Login</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
    </>
    return (
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
    <div className="form-control ml-4 relative">
      <input 
        type="text" 
        placeholder="Search products..." 
        className="input input-bordered w-64 pr-10" 
        value={query} 
        onChange={handleInputChange}
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-green-600" onClick={handleSearch}>
        <IoIosSearch />
      </button>
      {results.length > 0 && (
        <ul className="absolute bg-white shadow-lg rounded mt-2 w-full max-h-60 overflow-y-auto z-50 border">
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
    <a className="btn">Logout</a>
  </div>
      
</div>
    );
};

export default NavBar;