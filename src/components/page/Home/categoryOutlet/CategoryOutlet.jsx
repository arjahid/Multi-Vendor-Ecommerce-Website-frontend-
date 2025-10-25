import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaHeart } from 'react-icons/fa';
import useAxiosPublic from '../../../../Hooks/useAxiousPublic';
import NavBar from '../Navbar/NavBar';

const CategoryOutlet = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    
    const { category } = useParams();

    useEffect(() => {
        console.log('Category from params:', category);
        setLoading(true);
        setError(null);
        
        const fetchCategoryProducts = async () => {
            try {
                console.log('Fetching all products to filter by category:', category);
                // Get all products first
                const response = await axiosPublic.get('/products');
                console.log('All products response:', response.data);
                
                if (response.data && Array.isArray(response.data)) {
                    // Filter products that exactly match the category from URL
                    const filteredProducts = response.data.filter(product => 
                        product.category && 
                        product.category.toLowerCase() === decodeURIComponent(category).toLowerCase()
                    );
                    
                    console.log('Filtered products for category', category, ':', filteredProducts);
                    setProducts(filteredProducts);
                } else {
                    setProducts([]);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(`Failed to load ${category} products`);
                setLoading(false);
            }
        };
        
        if (category) {
            fetchCategoryProducts();
        }
    }, [category, axiosPublic]);

    if (loading) {
        return (
            <div>
                <NavBar />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg text-green-600"></div>
                        <p className="mt-4 text-gray-600">Loading {decodeURIComponent(category)} products...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <NavBar />
                <div className="text-center p-8 text-red-600">
                    <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Header with Back Button */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => navigate(-1)}
                                className="flex items-center space-x-2 text-green-600 hover:text-green-700 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <FaArrowLeft />
                                <span>Back</span>
                            </button>
                            <div>
                                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                    {decodeURIComponent(category)}
                                </h1>
                                <p className="text-gray-600">
                                    {products.length} {products.length === 1 ? 'product' : 'products'} found
                                </p>
                            </div>
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-xl">
                            <div className="text-8xl mb-6">🛍️</div>
                            <h2 className="text-3xl font-bold text-gray-700 mb-4">
                                No products found
                            </h2>
                            <p className="text-xl text-gray-500 mb-8">
                                We couldn't find any products in "{decodeURIComponent(category)}" category
                            </p>
                            <Link 
                                to="/category" 
                                className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Browse All Categories
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {products.map(product => (
                                <div key={product._id} className="bg-white rounded-2xl shadow-xl p-6 border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                                    <div className="relative mb-4">
                                        <img 
                                            src={product.images?.[0] || 'https://via.placeholder.com/300x200'} 
                                            alt={product.productName}
                                            className="w-full h-48 object-cover rounded-xl"
                                        />
                                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button className="bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors">
                                                <FaHeart className="text-red-500" />
                                            </button>
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                {product.category}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                                            {product.productName}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {product.description}
                                        </p>
                                        
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-green-600">
                                                    ৳{parseInt(product.price).toLocaleString()}
                                                </p>
                                                {product.discount > 0 && (
                                                    <p className="text-sm text-gray-500 line-through">
                                                        ৳{(parseInt(product.price) * 1.2).toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-yellow-500">⭐</span>
                                                <span className="text-sm text-gray-600">4.5</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex space-x-2 pt-4">
                                            {/* <button  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2">
                                                <FaShoppingCart />
                                                <span>Add to Cart</span>
                                            </button> */}
                                            <Link 
                                                to={`/product/${product._id}`}
                                                className=" btn btn-primary rounded-full w-full"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryOutlet;
