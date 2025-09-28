import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get("/analytics")
      .then(res => {
        setTopView(res.data.topView);
        setTopCart(res.data.topCart);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Analytics...</p>;

  // Chart Data
  const viewData = {
    labels: topView.map(p => p.productName),
    datasets: [
      {
        label: 'Views',
        data: topView.map(p => p.count),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
    ],
  };

  const cartData = {
    labels: topCart.map(p => p.productName),
    datasets: [
      {
        label: 'Added to Cart',
        data: topCart.map(p => p.count),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Product Analytics' },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Top Viewed Products</h3>
          <Bar data={viewData} options={options} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Top Added to Cart</h3>
          <Bar data={cartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
