import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../Navbar/NavBar';
import useWishlist from '../../../../Hooks/useWishlist';

const Wishlist = () => {
   
   const{wishlistItems,refetch}=useWishlist();
    return (
        <div >
            <NavBar></NavBar>
           <div className="mt-4 max-w-4xl mx-auto p-6">
             <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p className="text-gray-600">Your wishlist is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {wishlistItems.map(item => (
                        <li key={item._id} className="border p-4 rounded-lg">
                            <h2 className="text-xl font-semibold">{item.productName}</h2>
                            <p className="text-gray-600">BDT {item.price}</p>
                        </li>
                    ))}
                </ul>
            )}
           </div>
        </div>
    );
};

export default Wishlist;