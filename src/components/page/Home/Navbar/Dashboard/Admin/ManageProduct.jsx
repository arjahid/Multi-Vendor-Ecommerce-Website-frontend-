import React, { useState } from 'react';
import AllProducts from '../../../../../../Hooks/All_Products';
import useAxiosPublic from '../../../../../../Hooks/useAxiousPublic';

const ManageProduct = () => {
  const { products, loading } = AllProducts();
  const axiosPublic = useAxiosPublic();
  const [deletingId, setDeletingId] = useState(null);

  if (loading) return <div>Loading...</div>;

  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    try {
      setDeletingId(productId);
      await axiosPublic.delete(`/products/${productId}`);
      alert("Product deleted successfully!");
      window.location.reload();
    } catch (err) {
      console.error("delete error", err);
      alert("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Products ({products.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="border p-4 rounded shadow-md flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold">{p.productName}</h3>
            <p>Price: {p.price}</p>
            <p>Vendor: {p.vendor?.name || "N/A"}</p>
            <img
              src={p.images?.[0] || 'https://via.placeholder.com/150?text=No+Image'}
              alt={p.productName}
              className="w-24 h-24 object-cover"
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; }}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleDelete(p.productId)}
                disabled={deletingId === p.productId}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                {deletingId === p.productId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
