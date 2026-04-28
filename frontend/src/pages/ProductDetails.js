import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data.product);
      setError('');
    } catch (err) {
      setError('Failed to fetch product details');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="error">{error || 'Product not found'}</div>
        <Link to="/" className="btn btn-primary mt-20">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 bg-[#E8EAF6] dark:bg-gray-950 transition-colors duration-300">
      <div className="product-detail-container">
        <Link to="/" className="btn btn-secondary mb-10 dark:bg-gray-800 dark:hover:bg-gray-700">← Back to Products</Link>
        
        <div className="product-detail-card dark:bg-gray-900 dark:border-gray-800 shadow-xl">
          <div className="product-detail-image dark:bg-gray-800 flex items-center justify-center p-8 bg-gray-50">
            <img 
              src={product.image} 
              alt={product.name}
              className="product-detail-img shadow-md"
            />
          </div>
          
          <div className="product-detail-info p-8 md:p-12">
            <h1 className="product-detail-name text-3xl md:text-4xl font-bold mb-4 dark:text-gray-100">{product.name}</h1>
            
            <div className="product-detail-price text-3xl font-bold text-green-600 mb-6 dark:text-green-400">
              Rs. {product.price.toLocaleString()}
            </div>
            
            <div className="product-detail-category flex flex-wrap gap-3 mb-8">
              <span className="category-badge dark:bg-gray-700 dark:text-gray-300">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
              {product.inStock ? (
                <span className="stock-badge in-stock dark:bg-green-900/40 dark:text-green-300">In Stock</span>
              ) : (
                <span className="stock-badge out-of-stock dark:bg-red-900/40 dark:text-red-300">Out of Stock</span>
              )}
            </div>
            
            <div className="product-detail-description mb-10">
              <h3 className="text-xl font-bold mb-4 dark:text-gray-200 border-b dark:border-gray-800 pb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            <div className="product-detail-actions mb-10 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border dark:border-gray-800">
              <h3 className="text-lg font-bold mb-2 dark:text-gray-200">Interested in this product?</h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">Contact us to place an order or for more information:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href={`https://wa.me/9804766631?text=Hi, I am interested in ${product.name}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp flex items-center justify-center gap-2 py-3"
                >
                  <span className="icon">📱</span> WhatsApp
                </a>
                
                <a 
                  href={`mailto:deepeshrouniyar@gmail.com?subject=Inquiry about ${product.name}&body=Hi, I am interested in ${product.name}. Please provide more details.`}
                  className="btn btn-gmail flex items-center justify-center gap-2 py-3"
                >
                  <span className="icon">📧</span> Email
                </a>
              </div>

              <div className="flex gap-4 mt-4">
                <a 
                  href="https://www.facebook.com/share/1B3xzduKh8/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-facebook flex-1 text-center py-2"
                >
                  Facebook
                </a>
                <a 
                  href="https://www.instagram.com/deepesh_rouniyar?igsh=ZHB3YmZnMWE1b3U4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-instagram flex-1 text-center py-2"
                >
                  Instagram
                </a>
              </div>
            </div>
            
            <div className="product-detail-meta pt-6 border-t dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-1"><strong>Product ID:</strong> {product._id}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500"><strong>Added on:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
