import { useState } from "react";
import NavBar from "../Navbar/NavBar";
import useAxiosPublic from "../../../../Hooks/useAxiousPublic";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    discount: 0,
    stock: "",
    targetGender: "unisex",
    images: ["", ""],
    vendor: {
      vendorId: "",
      name: "",
      contact: "",
      address: "",
      vendorEmail: ""
    },
    shipping: {
      weight: "",
      dimensions: "",
      deliveryTime: ""
    }
  });

  const axiosPublic = useAxiosPublic();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("vendor.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        vendor: { ...prev.vendor, [key]: value }
      }));
    } else if (name.startsWith("shipping.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        shipping: { ...prev.shipping, [key]: value }
      }));
    } else if (name.startsWith("images.")) {
      const index = Number(name.split(".")[1]);
      const newImages = [...formData.images];
      newImages[index] = value;
      setFormData((prev) => ({ ...prev, images: newImages }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPublic.post("/products", formData);
      alert("✅ Product Added Successfully!");
      console.log(res.data);
      // Reset form after successful submission
      setFormData({
        productId: "",
        productName: "",
        description: "",
        category: "",
        brand: "",
        price: "",
        discount: 0,
        stock: "",
        targetGender: "unisex",
        images: ["", ""],
        vendor: {
          vendorId: "",
          name: "",
          contact: "",
          address: "",
          vendorEmail: ""
        },
        shipping: {
          weight: "",
          dimensions: "",
          deliveryTime: ""
        }
      });
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("❌ Failed to add product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <NavBar></NavBar>
      <div className="max-w-4xl mx-auto mt-2">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">➕ Add New Product</h2>
            <p className="text-blue-100">Fill in the details to add a new product to your inventory</p>
          </div>

          {/* Form */}
          <div className="px-6 py-8 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Basic Information Section */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                  📦 Basic Information
                </h3>
                
                {/* Product ID */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product ID</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
                    name="productId" 
                    placeholder="e.g. P1010" 
                    onChange={handleChange} 
                  />
                  <small className="text-gray-500 mt-1 block">Unique product code (system can auto-generate)</small>
                </div>

                {/* Product Name */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
                    name="productName" 
                    placeholder="Enter product name" 
                    onChange={handleChange} 
                  />
                  <small className="text-gray-500 mt-1 block">Clear and descriptive product name</small>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 h-24 resize-none" 
                    name="description" 
                    placeholder="Product description, features, and benefits" 
                    onChange={handleChange} 
                  />
                  <small className="text-gray-500 mt-1 block">Brief but informative description</small>
                </div>

                {/* Category + Brand */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
                      name="category" 
                      placeholder="e.g. Footwear, Electronics" 
                      onChange={handleChange} 
                    />
                    <small className="text-gray-500 mt-1 block">Product category</small>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
                      name="brand" 
                      placeholder="e.g. Nike, Samsung" 
                      onChange={handleChange} 
                    />
                    <small className="text-gray-500 mt-1 block">Brand name</small>
                  </div>
                </div>
              </div>

              {/* Pricing & Stock Section */}
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                  💰 Pricing & Stock
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (BDT)</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200" 
                      type="number" 
                      name="price" 
                      placeholder="7200" 
                      onChange={handleChange} 
                    />
                    <small className="text-gray-500 mt-1 block">Price in numbers only</small>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200" 
                      type="number" 
                      name="discount" 
                      placeholder="0" 
                      onChange={handleChange} 
                    />
                    <small className="text-gray-500 mt-1 block">Discount percentage</small>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200" 
                      type="number" 
                      name="stock" 
                      placeholder="35" 
                      onChange={handleChange} 
                    />
                    <small className="text-gray-500 mt-1 block">Available quantity</small>
                  </div>
                </div>

                {/* Gender */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Gender</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200" 
                    name="targetGender" 
                    onChange={handleChange}
                  >
                    <option value="unisex">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <small className="text-gray-500 mt-1 block">Target audience gender</small>
                </div>
              </div>

              {/* Images Section */}
              <div className="bg-purple-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                  🖼️ Product Images
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Image URL</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200" 
                      name="images.0" 
                      placeholder="https://example.com/image1.jpg" 
                      onChange={handleChange} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Image URL</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200" 
                      name="images.1" 
                      placeholder="https://example.com/image2.jpg" 
                      onChange={handleChange} 
                    />
                  </div>
                  <small className="text-gray-500 block">High-quality product image URLs</small>
                </div>
              </div>

              {/* Vendor Section */}
              <div className="bg-orange-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                  🏬 Vendor Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vendor ID</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200" 
                      name="vendor.vendorId" 
                      placeholder="V2001" 
                      onChange={handleChange} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Name</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200" 
                      name="vendor.name" 
                      placeholder="Vendor name" 
                      onChange={handleChange} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Email</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200" 
                      name="vendor.vendorEmail" 
                      type="email"
                      placeholder="vendor@example.com" 
                      onChange={handleChange} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200" 
                      name="vendor.contact" 
                      placeholder="01712345678" 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Address</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200" 
                      name="vendor.address" 
                      placeholder="Dhaka, Bangladesh" 
                      onChange={handleChange} 
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Section */}
              <div className="bg-cyan-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                  🚚 Shipping Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200" 
                      name="shipping.weight" 
                      placeholder="1.2kg" 
                      onChange={handleChange} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200" 
                      name="shipping.dimensions" 
                      placeholder="30x20x10 cm" 
                      onChange={handleChange} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                    <input 
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200" 
                      name="shipping.deliveryTime" 
                      placeholder="3-5 days" 
                      onChange={handleChange} 
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl"
                >
                  ✨ Add Product to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
