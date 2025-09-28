import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import useAxiosPublic from "../../../../../Hooks/useAxiousPublic";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const axiosPublic = useAxiosPublic();
  const [topView, setTopView] = useState([]);
  const [topCart, setTopCart] = useState([]);
  const [topWishlist, setTopWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiRaw, setApiRaw] = useState(null);

  useEffect(() => {
    axiosPublic.get("/analytics")
      .then(res => {
        setApiRaw(res.data);
        console.log(res.data);
        
        setTopView(Array.isArray(res.data.topView) ? res.data.topView : []);
        setTopCart(Array.isArray(res.data.topCart) ? res.data.topCart : []);
        setTopWishlist(Array.isArray(res.data.wishlist) ? res.data.wishlist : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setTopView([]);
        setTopCart([]);
        setTopWishlist([]);
        setLoading(false);
      });
  }, [axiosPublic]);

 
  const [productMap, setProductMap] = useState({});
  useEffect(() => {
    axiosPublic.get("/products")
      .then(res => {
        
        const map = {};
        (res.data || []).forEach(p => {
          map[p._id] = p.productName;
        });
        setProductMap(map);
      })
      .catch(() => setProductMap({}));
  }, [axiosPublic]);
  
  if (loading) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-green-600"></div>
        <p className="mt-4 text-gray-600">Loading Analytics...</p>
      </div>
    </div>
  );

  // Defensive: filter out invalid data
  const safe = arr => Array.isArray(arr) ? arr.filter(p => p && (p.productName || p._id) && typeof p.count === "number") : [];

  // Use productName if present, otherwise lookup by _id
  const getLabel = p => p.productName || productMap[p._id] || p._id;

  const viewData = {
    labels: safe(topView).map(getLabel),
    datasets: [
      {
        label: 'Views',
        data: safe(topView).map(p => p.count),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const cartData = {
    labels: safe(topCart).map(getLabel),
    datasets: [
      {
        label: 'Added to Cart',
        data: safe(topCart).map(p => p.count),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const wishlistData = {
    labels: safe(topWishlist).map(getLabel),
    datasets: [
      {
        label: 'Wishlisted',
        data: safe(topWishlist).map(p => p.count),
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 14 } } },
      title: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: { ticks: { font: { size: 12 }, color: "#374151" } },
      y: { beginAtZero: true, ticks: { font: { size: 12 }, color: "#374151" } }
    }
  };

  // Totals for summary
  const totalViews = safe(topView).reduce((sum, p) => sum + p.count, 0);
  const totalCart = safe(topCart).reduce((sum, p) => sum + p.count, 0);
  const totalWishlist = safe(topWishlist).reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">📊 Analytics Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 rounded-xl p-6 flex flex-col items-center shadow">
          <span className="text-4xl mb-2">👁️</span>
          <span className="text-2xl font-bold text-blue-800">{totalViews}</span>
          <span className="text-gray-700 mt-1">Total Views</span>
        </div>
        <div className="bg-pink-100 rounded-xl p-6 flex flex-col items-center shadow">
          <span className="text-4xl mb-2">🛒</span>
          <span className="text-2xl font-bold text-pink-800">{totalCart}</span>
          <span className="text-gray-700 mt-1">Total Added to Cart</span>
        </div>
        <div className="bg-yellow-100 rounded-xl p-6 flex flex-col items-center shadow">
          <span className="text-4xl mb-2">💛</span>
          <span className="text-2xl font-bold text-yellow-700">{totalWishlist}</span>
          <span className="text-gray-700 mt-1">Total Wishlisted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col">
          <h3 className="font-semibold mb-4 text-blue-700 text-lg text-center">Top Viewed Products</h3>
          <div className="flex-1 min-h-[300px]">
            {safe(topView).length > 0 ? (
              <Bar data={viewData} options={options} />
            ) : (
              <div className="text-center text-gray-400 pt-16">No view data</div>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col">
          <h3 className="font-semibold mb-4 text-pink-700 text-lg text-center">Top Added to Cart</h3>
          <div className="flex-1 min-h-[300px]">
            {safe(topCart).length > 0 ? (
              <Bar data={cartData} options={options} />
            ) : (
              <div className="text-center text-gray-400 pt-16">No cart data</div>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col">
          <h3 className="font-semibold mb-4 text-yellow-700 text-lg text-center">Top Wishlisted</h3>
          <div className="flex-1 min-h-[300px]">
            {safe(topWishlist).length > 0 ? (
              <Bar data={wishlistData} options={options} />
            ) : (
              <div className="text-center text-gray-400 pt-16">No wishlist data</div>
            )}
          </div>
        </div>
      </div>
      {/* Debug: Show raw API response */}
      <details className="mt-8">
        <summary className="cursor-pointer font-semibold text-gray-500">Show Raw Analytics API Response</summary>
        <pre className="bg-gray-800 text-green-400 p-4 rounded mt-2 overflow-auto text-xs">
          {JSON.stringify(apiRaw, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default Analytics;
