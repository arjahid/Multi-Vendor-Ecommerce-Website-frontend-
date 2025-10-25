import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../../../providers/AuthProvider';
import useAxiosPublic from '../../../../../../Hooks/useAxiousPublic';
import useAdmin from '../../../../../../Hooks/useAdmin';

const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const fmtDate = (d) => {
  try { return new Date(d).toLocaleString(); } catch { return '—'; }
};
const fmtCurrency = (v) => `৳${Number(v || 0).toLocaleString()}`;

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [expanded, setExpanded] = useState(new Set());

  const { user } = useContext(AuthContext);
  const { isAdmin } = useAdmin();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (!axiosPublic) return;
    let mounted = true;
    const fetchOrders = async () => {
      setLoading(true); setError(null);
      try {
        const url = isAdmin ? '/orders' : `/orders?email=${encodeURIComponent(user?.email ?? '')}`;
        const res = await axiosPublic.get(url);
        if (!mounted) return;
        setOrders(res.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        if (mounted) setError(err?.response?.data || err.message || 'Failed to load orders');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchOrders();
    return () => { mounted = false; };
  }, [user?.email, isAdmin, axiosPublic]);

  const toggleExpand = (id) => {
    setExpanded(prev => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (!orderId || !isAdmin) return;
    const { isConfirmed } = await Swal.fire({
      title: 'Change order status',
      text: `Set status to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update',
    });
    if (!isConfirmed) return;
    try {
      setUpdatingId(orderId);
      await axiosPublic.patch(`/orders/${orderId}`, { status: newStatus });
      setOrders(prev => prev.map(o => (o._id === orderId ? { ...o, status: newStatus } : o)));
      await Swal.fire('Updated', 'Order status updated successfully', 'success');
    } catch (err) {
      console.error('Failed to update status:', err);
      await Swal.fire('Error', 'Failed to update order status', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCopyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Order ID copied', showConfirmButton: false, timer: 1400 });
    } catch {
      Swal.fire('Oops', 'Could not copy Order ID', 'error');
    }
  };

  if (loading) return <div className="p-6">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {String(error)}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
        <div className="text-sm text-gray-600">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</div>
      </header>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-600">
          No orders found.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(o => {
            const placed = fmtDate(o.createdAt);
            const items = o.items || [];
            const itemsCount = items.length;
            const total = o.totalPrice ?? items.reduce((s, it) => s + ((parseFloat(it.price)||0) * (parseInt(it.quantity)||0)), 0);
            const status = o.status ?? 'Pending';
            const color = status.toLowerCase() === 'delivered' ? 'green' : status.toLowerCase() === 'cancelled' ? 'red' : 'yellow';
            const isExpanded = expanded.has(o._id);

            return (
              <article key={o._id} className="relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                {/* left status stripe */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${color}-500`} aria-hidden="true"></div>

                <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-8 gap-4">
                  <div className="md:col-span-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500">Order</div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 break-all truncate">{o._id}</span>
                          <button onClick={() => handleCopyId(o._id)} className="text-xs text-blue-600 hover:underline">Copy</button>
                        </div>

                        <div className="mt-2 text-sm text-gray-600">{o.customerName ?? o.email ?? '—'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-1 text-sm text-gray-600">
                    <div className="text-xs">Placed</div>
                    <div className="text-gray-800">{placed}</div>
                  </div>

                  <div className="md:col-span-1 text-center">
                    <div className="text-xs text-gray-500">Items</div>
                    <div className="font-medium text-gray-800">{itemsCount}</div>
                  </div>

                  <div className="md:col-span-1 text-right">
                    <div className="text-xs text-gray-500">Total</div>
                    <div className="font-semibold text-green-600">{fmtCurrency(total)}</div>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-end gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      color === 'green' ? 'bg-green-100 text-green-800' :
                      color === 'red' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {status}
                    </span>

                    {isAdmin ? (
                      <select
                        value={status}
                        onChange={(e) => handleStatusChange(o._id, e.target.value)}
                        disabled={updatingId === o._id}
                        className="border rounded px-2 py-1 text-sm bg-white"
                        aria-label={`Change status for order ${o._id}`}
                      >
                        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <Link  className="text-sm text-blue-600 hover:underline"></Link>
                    )}

                    <button
                      onClick={() => toggleExpand(o._id)}
                      className="ml-2 text-sm bg-gray-50 hover:bg-gray-100 px-3 py-1 rounded"
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? 'Hide items' : 'Show items'}
                    </button>
                    <p></p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t bg-gray-50 p-4 md:p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Items</h4>
                        <ul className="space-y-3">
                          {items.map((it, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <img src={it.image || 'https://via.placeholder.com/60'} alt={it.name || 'item'} className="w-12 h-12 object-cover rounded" />
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-800">{it.name || it.productName || 'Unnamed'}</div>
                                <div className="text-xs text-gray-500">{it.variant ?? ''} · qty: {it.quantity}</div>
                              </div>
                              <div className="text-sm font-medium text-gray-800">{fmtCurrency((parseFloat(it.price)||0) * (parseInt(it.quantity)||1))}</div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="md:col-span-1">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping</h4>
                        <div className="text-sm text-gray-600">
                          {o.shippingAddress ? (
                            <>
                              <div>{o.shippingAddress.name}</div>
                              <div className="truncate">{o.shippingAddress.addressLine}</div>
                              <div>{o.shippingAddress.city}, {o.shippingAddress.postcode}</div>
                              <div>{o.shippingAddress.country}</div>
                            </>
                          ) : (
                            <div>—</div>
                          )}
                        </div>

                      
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
