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

      {/* allow grid children to stretch so cards can fill full height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 items-stretch">
        {recommended.map(p => {
          const img = firstImageFor(p) || 'https://via.placeholder.com/300x200?text=No+Image';
          return (
            <article
              key={p._id || p.productId}
              className="card bg-white shadow-md hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-green-300 relative overflow-hidden rounded-lg h-full flex flex-col"
            >
              {/* Discount Badge */}
              {p.discount ? (
                <div className="absolute top-3 right-2 z-20">
                  <div className="bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                    -{p.discount}% OFF
                  </div>
                </div>
              ) : null}

              <Link to={`/product/${p._id || p.productId}`} className="block flex-none">
                <figure className="overflow-hidden bg-gray-100 relative">
                  <img
                    src={img}
                    alt={p.productName || p.title || 'Product'}
                    className="w-full h-28 sm:h-32 md:h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                  />
                </figure>
              </Link>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 truncate font-bold">
                    {p.category || p.productName || 'Product'}
                  </p>
                  <h3
                    className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-300 mb-1 leading-tight"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '2.2rem',
                    }}
                  >
                    {p.productName || p.title || 'Untitled Product'}
                  </h3>

                  <div className="flex items-center mb-1">
                    <div className="text-yellow-400 text-xs">★★★★☆</div>
                    <span className="text-xs text-gray-400 ml-1 hidden xs:inline">{p.rating?.rate ?? '4.0'}</span>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-xs font-bold text-green-600 truncate">{formatCurrency(p.price) || 'Price not available'}</p>
                </div>
              </div>

              <div className="p-2 sm:p-3 flex-none">
                <div className="flex gap-2 flex-col sm:flex-row">
                  <Link
                    to={`/product/${p._id || p.productId}`}
                    className="inline-flex items-center justify-center flex-1 bg-gray-100 text-gray-800 py-2 rounded-md text-xs hover:bg-green-400"
                  >
                    View
                  </Link>
                  
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300" />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RecommendationSection;
