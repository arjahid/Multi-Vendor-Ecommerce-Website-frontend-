import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosPublic from '../Hooks/useAxiousPublic';
import { Link } from 'react-router-dom';

const RecommendationSection = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const firstImageFor = (p) => {
    const imgs = p.image ?? p.images ?? null;
    if (Array.isArray(imgs) && imgs.length) return imgs[0];
    if (typeof imgs === 'string' && imgs.trim()) {
      const parts = imgs.split(',').map(s => s.trim()).filter(Boolean);
      return parts[0] ?? null;
    }
    return null;
  };

  // add robust price parser and use it in formatCurrency
  const parsePrice = (v) => {
    // null/undefined -> 0
    if (v == null) return 0;

    // number -> return if finite
    if (typeof v === 'number' && isFinite(v)) return v;

    // string like "1,200", "৳1,200.00", "1200" -> clean and parse
    if (typeof v === 'string') {
      const cleaned = v.replace(/[^0-9.\-]/g, '').trim();
      const parsed = parseFloat(cleaned);
      return Number.isFinite(parsed) ? parsed : 0;
    }

    // object shaped price: try common keys recursively
    if (typeof v === 'object') {
      if ('amount' in v) return parsePrice(v.amount);
      if ('value' in v) return parsePrice(v.value);
      if ('price' in v) return parsePrice(v.price);
      if ('cost' in v) return parsePrice(v.cost);
    }

    // fallback
    return 0;
  };

  const formatCurrency = (v) => {
    const num = parsePrice(v);
    return `৳${num.toLocaleString()}`;
  };

  useEffect(() => {
    if (!axiosPublic) return;
    let mounted = true;

    const fetchRecs = async () => {
      setLoading(true);
      setError(null);
      setRecommended([]);

      try {
        // personalized recommendations if user email available (backend requires email)
        if (user?.email) {
          const url = `/recommendation?email=${encodeURIComponent(user.email)}`;
          const res = await axiosPublic.get(url);
          const recs = Array.isArray(res?.data) ? res.data : [];
          if (!mounted) return;

          if (recs.length > 0) {
            setRecommended(recs);
            return;
          }
          // if empty, fall through to fetch popular products
        }

        // fallback: fetch a few popular/new products
        const fallbackRes = await axiosPublic.get('/products');
        const prods = Array.isArray(fallbackRes?.data) ? fallbackRes.data.slice(0, 6) : [];
        if (!mounted) return;
        setRecommended(prods);
      } catch (err) {
        console.error('Recommendation fetch error:', err);
        if (mounted) setError('Failed to load recommendations');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRecs();
    return () => { mounted = false; };
  }, [user?.email, axiosPublic]);

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold pb-4 pl-10">Recommended For You...</h2>
        <p>{loading? <span className="loading loading-spinner text-accent"></span> : null}</p>
        <small className="text-sm text-gray-500">{loading ? <span className="loading loading-dots loading-lg"></span> : `${recommended.length} items`}</small>
      </div>

      {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

      {!loading && recommended.length === 0 && !error && (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-600">
          No recommendations available.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6  ">
        {recommended.map(p => {
          const img = firstImageFor(p) || 'https://via.placeholder.com/300x200?text=No+Image';
          return (
            <article key={p._id || p.productId} className= "flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl hover:translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-green-300 relative  h-full ">
              <Link to={`/product/${p._id || p.productId}`}>
                <div className="w-full h-44 bg-gray-100">
                  <img
                    src={img}
                    alt={p.productName || p.title }
                    className="w-full h-44 object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                  />
                </div>
              </Link>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{p.productName || p.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                <p className='font-bold pt-2'> Category: {p.category || 'General'}</p>
                
                <div className="mt-3 flex items-center justify-between">
                  {/* <div className="text-sm text-gray-600">{p.vendor?.name || p.seller || ''}</div> */}
                  <div className="font-semibold text-green-600">Price : {formatCurrency(p.price)}</div>
                </div>
              </div>
                  <span className=" btn bg-green-400  xs:hidden w-full">+</span>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RecommendationSection;
