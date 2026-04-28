import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory) params.category = selectedCategory;

      const response = await axios.get('/api/products', { params });
      if (response.data.success) {
        setProducts(response.data.products || []);
      }
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['herbs', 'teas', 'oils', 'supplements', 'other'];

  return (
    <div className="max-w-7xl mx-auto px-5 bg-[#E8EAF6] dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center py-16 md:py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-600 mb-6 dark:text-green-400 tracking-tight">
          Nature's Best, <span className="text-gray-800 dark:text-white">Delivered to You</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto dark:text-gray-400 leading-relaxed">
          Explore our handpicked collection of premium herbal remedies and natural wellness products.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-12 border border-gray-100 dark:border-gray-700 -mt-10 relative z-10">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="What are you looking for today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control pl-12 py-4 bg-gray-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-green-500 rounded-xl"
            />
          </div>
          
          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-control py-4 bg-gray-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-green-500 rounded-xl cursor-pointer"
            >
              <option value="" className="dark:bg-gray-800">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category} className="dark:bg-gray-800 text-sm">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-800 h-80 rounded-2xl"></div>
          ))}
        </div>
      ) : error ? (
        <div className="error bg-red-50 dark:bg-red-900/20 p-10 rounded-2xl text-red-600 border border-red-100 dark:border-red-900/30">
          <p className="text-xl font-semibold mb-4">Oops! {error}</p>
          <button onClick={fetchProducts} className="btn btn-primary">Try Again</button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <div className="text-6xl mb-6">🌿</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No products found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {products.map(product => (
            <div key={product._id} className="product-card group dark:border-gray-800 hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden border border-gray-50 bg-white dark:bg-gray-800">
              <div className="relative overflow-hidden aspect-square">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {product.inStock ? (
                    <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg">In Stock</span>
                  ) : (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg">Out of Stock</span>
                  )}
                  <span className="bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="product-info p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t dark:border-gray-700">
                  <span className="text-2xl font-black text-green-600 dark:text-green-400">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <Link to={`/product/${product._id}`} className="btn btn-primary btn-sm rounded-xl px-6 py-3 font-bold hover:scale-105 transition-transform">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
