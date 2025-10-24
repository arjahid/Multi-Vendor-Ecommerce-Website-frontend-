import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../../../providers/AuthProvider';
import useAxiosPublic from '../../../../../../Hooks/useAxiousPublic';

const MyOrder = () => {
    const [order,setOrder]=useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {user}=useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    
    useEffect(()=>{
        if (!user?.email) return;

        let mounted = true;
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axiosPublic.get(`/orders?email=${encodeURIComponent(user.email)}`);
                if (mounted) setOrder(res.data || []);
            } catch (err) {
                console.error('Error fetching orders:', err);
                if (mounted) setError(err?.response?.data || err.message);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchOrders();
        return () => { mounted = false; };
    },[])
    
    if (loading) return <div className="p-6">Loading orders...</div>;
    if (error) return <div className="p-6 text-red-600">Error: {String(error)}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <header className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">My Orders</h1>
                <span className="text-sm text-gray-600">{order.length} {order.length === 1 ? 'order' : 'orders'}</span>
            </header>

            {order.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-600">
                    You have no orders yet. Start shopping to place your first order.
                </div>
            ) : (
                <ul className="space-y-4">
                    {order.map(o => {
                        const placed = o.createdAt ? new Date(o.createdAt).toLocaleString() : '—';
                        const total = o.totalPrice ?? (o.items ? o.items.reduce((s, it) => s + ((parseFloat(it.price)||0) * (parseInt(it.quantity)||0)), 0) : 0);
                        const status = o.status ?? 'Pending';
                        return (
                            <li key={o._id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="mb-3 md:mb-0">
                                    <div className="text-sm text-gray-500">Order ID</div>
                                    <div className="font-medium text-gray-800">{o._id}</div>
                                </div>

                                <div className="mb-3 md:mb-0">
                                    <div className="text-sm text-gray-500">Placed</div>
                                    <div className="text-gray-700">{placed}</div>
                                </div>

                                <div className="mb-3 md:mb-0 text-center">
                                    <div className="text-sm text-gray-500">Items</div>
                                    <div className="font-medium text-gray-800">{(o.items || []).length}</div>
                                </div>

                                <div className="mb-3 md:mb-0 text-right">
                                    <div className="text-sm text-gray-500">Total</div>
                                    <div className="font-semibold text-green-600">৳{Number(total).toLocaleString()}</div>
                                </div>

                                <div className="flex items-center gap-3 mt-3 md:mt-0">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        status.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-800' :
                                        status.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {status}
                                    </span>
                                    <a href="#" className="text-sm text-blue-600 hover:underline">View details</a>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default MyOrder;