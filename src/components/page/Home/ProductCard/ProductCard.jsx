import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AllProducts from '../../../../Hooks/All_Products';

const ProductCard = () => {
    const {products, loading, error} = AllProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    if (loading) return <div className="text-center py-20">Loading products...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

    // Calculate pagination
    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">Our Products</h2>
                    <p className="text-sm sm:text-lg text-gray-600 mb-2">Discover {products.length} amazing products</p>
                    <div className="w-16 sm:w-24 h-1 bg-green-600 mx-auto rounded"></div>
                </div>
                
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
                    {currentProducts.map((product, index) => {
                        // Add null check and fallback ID
                        if (!product) return null;
                        
                        const productId = product._id || product.id || product.productId || index;
                        
                        return (
                            <NavLink key={productId} to={`/product/${productId}`} className="block">
                                <div className="card bg-white shadow-md hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-green-300 relative overflow-hidden rounded-lg h-full">
                                    {/* Discount Badge */}
                                    {product.discount && (
                                        <div className="absolute top-3 right-2 z-20">
                                            <div className="bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                                                -{product.discount}% OFF
                                            </div>
                                        </div>
                                    )}

                                    <figure className="overflow-hidden bg-gray-100 relative">
                                        <img 
                                            src={product.image || '/placeholder-image.jpg'} 
                                            alt={product.title || 'Product'} 
                                            className="w-full h-20 xs:h-24 sm:h-28 md:h-32 lg:h-36 object-cover group-hover:scale-105 transition-transform duration-300" 
                                        />
                                    </figure>
                                    
                                    <div className="p-1.5 xs:p-2 sm:p-3">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 truncate">
                                            {product.name || product.productName || product.category || 'Product'}
                                        </p>
                                        <h3 className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-300 line-clamp-2 h-6 sm:h-8 mb-1">
                                            {product.title || 'Untitled Product'}
                                        </h3>
                                        
                                        {/* Rating - Compact */}
                                        <div className="flex items-center mb-1">
                                            <div className="text-yellow-400 text-xs">★★★★☆</div>
                                            <span className="text-xs text-gray-400 ml-1 hidden xs:inline">4.0</span>
                                        </div>
                                        
                                        {/* Price */}
                                        <div className="mb-2">
                                            <p className="text-xs sm:text-sm font-bold text-green-600 truncate">
                                                {product.price || 'Price not available'}
                                            </p>
                                        </div>
                                        
                                        {/* Compact Actions */}
                                        <div className="flex gap-1 flex-col xs:flex-row">
                                            <button className="btn btn-primary btn-xs flex-1 hover:btn-success transition-colors duration-200 text-xs">
                                                <span className="hidden xs:inline">Add</span>
                                                <span className="xs:hidden">+</span>
                                            </button>
                                            <button className="btn btn-outline btn-xs hover:btn-primary transition-colors duration-200 hidden xs:block">
                                                ♡
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Hover indicator */}
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></div>
                                </div>
                            </NavLink>
                        );
                    })}
                </div>
                
                {/* Pagination - Responsive */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 sm:mt-12 space-x-1 sm:space-x-2 flex-wrap">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn btn-outline btn-xs sm:btn-sm disabled:opacity-50 mb-2"
                        >
                            <span className="hidden sm:inline">Previous</span>
                            <span className="sm:hidden">Prev</span>
                        </button>
                        
                        <div className="flex space-x-1 mb-2">
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1;
                                if (
                                    pageNumber === 1 ||
                                    pageNumber === totalPages ||
                                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={`btn btn-xs sm:btn-sm ${
                                                currentPage === pageNumber
                                                    ? 'btn-primary'
                                                    : 'btn-outline'
                                            }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                } else if (
                                    pageNumber === currentPage - 2 ||
                                    pageNumber === currentPage + 2
                                ) {
                                    return <span key={pageNumber} className="px-1 text-xs">...</span>;
                                }
                                return null;
                            })}
                        </div>
                        
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="btn btn-outline btn-xs sm:btn-sm disabled:opacity-50 mb-2"
                        >
                            <span className="hidden sm:inline">Next</span>
                            <span className="sm:hidden">Next</span>
                        </button>
                    </div>
                )}
                
                {/* Page Info - Responsive */}
                <div className="text-center mt-4 text-gray-600 text-xs sm:text-sm">
                    <span className="hidden sm:inline">Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products</span>
                    <span className="sm:hidden">{startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;