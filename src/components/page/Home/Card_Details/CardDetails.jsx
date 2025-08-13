import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import axios from 'axios';
import useCart from '../../../../Hooks/useCart';
import useWishlist from '../../../../Hooks/useWishlist';
import Swal from 'sweetalert2'
import { AuthContext } from '../../../../providers/AuthProvider';

const CardDetails = () => {
    const product = useLoaderData();
    const { refetch: refetchCart } = useCart();
    const { refetch: refetchWishlist } = useWishlist();
    const{ _id, productName, title, price, image, category, description, rating } = product || {};
    console.log("product id",product?._id);
    console.log("product full data", product);
    const {user}=useContext(AuthContext);

    // console.log(productName);
    
    if (!product) {
        return (
            <div>
                <NavBar></NavBar>
                <div className="text-center py-20">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Product not found</h1>
                    <p className="text-gray-600">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }
    
    const handleCart=(item)=>{
        if(!user){
            Swal.fire({
                title: "Please login to add items to cart!",
                icon: "warning",
                confirmButtonText: "Login",
                showCancelButton: true,
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login'; // Redirect to login page
                }
            });
            return;
        }
        const cartItem={
            email: user?.email, // Add user email if available
            productId: _id,
            productName: productName || title,
            price: price,
            image: image,
            quantity: 1,
            category: category,
            description: description
        }
        
        console.log('Sending to cart:', cartItem); // Debug log
        
        axios.post('http://localhost:3100/cart', cartItem)
        .then(response => {
            refetchCart(); // Use renamed function
            console.log(`${cartItem.productName} added to cart:`, response.data);
            Swal.fire({
                title: "Item added to cart!",
                icon: "success",
                draggable: true
            });

        })
        .catch(error => {
            console.error('Error adding item to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        });
    }
    const handleWishList = () => {
           if(!user){
            Swal.fire({
                title: "Please login to add items to cart!",
                icon: "warning",
                confirmButtonText: "Login",
                showCancelButton: true,
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login'; // Redirect to login page
                }
            });
            return;
        }
        console.log('Wishlist feature is not implemented yet.');
        axios.post('http://localhost:3100/wishlist', {
            email: user?.email,
            productId: _id,
           productName: productName || title,
            price: price,
            image: image,
            quantity: 1,
            category: category,
            description: description
         })
        .then(response => {
            refetchWishlist(); // Use renamed function
            console.log('Item added to wishlist:', response.data);
             Swal.fire({
                title: "Item added to wishlist!",
                icon: "success",
                draggable: true
            });
        })
        .catch(error => {
            console.error('Error adding item to wishlist:', error);
        });
        // alert('Wishlist feature is coming soon!');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <NavBar></NavBar>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-7">
                <div>
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                           Category: {product.category}
                        </p>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.productName}</h1>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                            ★★★★☆
                        </div>
                        <span className="text-gray-600">({product.rating?.rate || 4.0})</span>
                        <span className="text-gray-500">({product.rating?.count || 120} reviews)</span>
                    </div>
                    
                    {/* Price */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-3xl font-bold text-green-600 mb-2">
                            ${product.price}
                        </p>
                        <p className="text-sm text-gray-600">Free shipping on orders over $50</p>
                    </div>
                    
                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>
                    
                    {/* Product Features */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Features</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                High Quality Materials
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                1 Year Warranty
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Fast Delivery
                            </li>
                        </ul>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex space-x-4">
                        <button onClick={() => handleCart(product)} className="btn btn-primary flex-1 hover:btn-success transition-colors duration-200">
                            Add to Cart
                        </button>
                        <button onClick={handleWishList} className="btn btn-outline hover:btn-primary transition-colors duration-200">
                            ♡ Wishlist
                        </button>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="border-t pt-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-semibold">SKU:</span>
                                <span className="ml-2 text-gray-600">{product.id}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Availability:</span>
                                <span className="ml-2 text-green-600">In Stock</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;