import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../Hooks/useAxiousPublic';
import useCart from '../../../../Hooks/useCart';
import useWishlist from '../../../../Hooks/useWishlist';
import { AuthContext } from '../../../../providers/AuthProvider';
import useUserBehaviour from '../../../../Hooks/UserBehaviour';

const CardDetails = () => {
  const product = useLoaderData();
  const { refetch: refetchCart } = useCart();
  const { refetch: refetchWishlist } = useWishlist();
  const { user } = useContext(AuthContext);
  const { logBehaviour } = useUserBehaviour(user?.email);
  const axiosPublic = useAxiosPublic();
  const hashLoggedView = useRef(false);
  const [recommended, setRecommended] = useState([]);

  // Log product view once
  useEffect(() => {
    if (product?._id && user?.email && !hashLoggedView.current) {
      logBehaviour(product._id, "view");
      hashLoggedView.current = true;
    }
  }, [product?._id, user?.email, logBehaviour]);

  // Fetch recommended products
  useEffect(() => {
    if (!user?.email || !axiosPublic) return;
    axiosPublic.get(`/recommendation?email=${encodeURIComponent(user.email)}`)
      .then(res => setRecommended(res.data || []))
      .catch(err => console.error("Recommendation fetch error:", err));
  }, [user?.email, axiosPublic]);

  if (!product) {
    return (
      <div>
        <NavBar />
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product not found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const getFirstImage = (imgField) => {
    if (Array.isArray(imgField) && imgField.length) return imgField[0];
    return imgField || "https://via.placeholder.com/400x300?text=No+Image";
  };

  const handleCart = async (item) => {
    if (!user) {
      const result = await Swal.fire({
        title: "Please login to add items to cart!",
        icon: "warning",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel"
      });
      if (result.isConfirmed) window.location.href = '/login';
      return;
    }

    logBehaviour(item._id, "add_to_cart");

    const cartItem = {
      email: user.email,
      productId: item._id,
      productName: item.productName || item.title,
      price: item.price,
      image: getFirstImage(item.images),
      quantity: 1,
      category: item.category,
      description: item.description
    };

    try {
      await axiosPublic.post('/cart', cartItem);
      await Swal.fire({ icon: 'success', title: 'Added to cart', text: `${cartItem.productName} has been added.` });
      await refetchCart();
    } catch (err) {
      console.error("Cart error:", err);
      await Swal.fire({ icon: 'error', title: 'Add failed', text: 'Could not add item to cart.' });
    }
  };

  const handleWishList = async (item) => {
    if (!user) {
      const result = await Swal.fire({
        title: "Please login to add items to wishlist!",
        icon: "warning",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel"
      });
      if (result.isConfirmed) window.location.href = '/login';
      return;
    }

    logBehaviour(item._1d, "wishlist");

    const wishlistItem = {
      email: user.email,
      productId: item._id,
      productName: item.productName || item.title,
      price: item.price,
      image: getFirstImage(item.images),
      quantity: 1,
      category: item.category,
      description: item.description
    };

    try {
      await axiosPublic.post('/wishlist', wishlistItem);
      await Swal.fire({ icon: 'success', title: 'Added to wishlist', text: `${wishlistItem.productName} saved.` });
      await refetchWishlist();
    } catch (err) {
      console.error("Wishlist error:", err);
      await Swal.fire({ icon: 'error', title: 'Save failed', text: 'Could not save to wishlist.' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <NavBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-7">
        <div>
          <img
            src={getFirstImage(product.images)}
            alt={product.title || product.productName}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
            Category: {product.category}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">{product.title || product.productName}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">★★★★☆</div>
            <span className="text-gray-600">({product.rating?.rate || 4.0})</span>
            <span className="text-gray-500">({product.rating?.count || 120} reviews)</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-green-600 mb-2">৳ {product.price}</p>
            <p className="text-sm text-gray-600">Free shipping on orders over ৳50</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          <div className="flex space-x-4">
            <button onClick={() => handleCart(product)} className="btn btn-primary flex-1 hover:btn-success">Add to Cart</button>
            <button onClick={() => handleWishList(product)} className="btn btn-outline hover:btn-primary">♡ Wishlist</button>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      {recommended.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommended.map(p => (
              <div key={p._id} className="bg-white rounded-lg shadow-sm p-3">
                <img src={getFirstImage(p.images)} alt={p.productName} className="w-full h-40 object-cover rounded-md mb-2" />
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{p.productName}</h3>
                <p className="text-sm text-gray-600 mt-1">Price: ৳{Number(p.price || 0).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetails;
