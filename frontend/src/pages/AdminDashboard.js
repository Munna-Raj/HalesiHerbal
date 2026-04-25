import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'pages'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageInputType, setImageInputType] = useState('url'); // 'url' or 'file'
  
  // CMS States
  const [cmsPage, setCmsPage] = useState('home');
  const [cmsContent, setCmsContent] = useState({});
  const [cmsLoading, setCmsLoading] = useState(false);
  const [cmsSuccess, setCmsSuccess] = useState('');

  const defaultPageContent = {
    home: {
      heroTitle: "Unlock Your Natural Potential",
      heroSubtitle: "Discover the ancient wisdom of herbal medicine combined with modern wellness science. Halesi Herbal brings you the purest remedies directly from nature's heart.",
      heroBadge: "Purely Organic. Purely Natural."
    },
    about: {
      title: "About Halesi Herbal",
      description: "Bringing the purest essence of nature to your doorstep. We are dedicated to providing high-quality herbal products for a healthier, more balanced life.",
      storyTitle: "Our Story",
      storyText: "Founded with a passion for traditional herbal wisdom and modern wellness, Halesi Herbal started as a small initiative to bring authentic natural remedies to those seeking a more holistic approach to health.",
      missionTitle: "Our Mission",
      missionText: "To empower individuals on their wellness journey by providing accessible, effective, and ethically sourced herbal solutions that honor the power of nature."
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Have questions about our products or need a consultation? We're here to help you.",
      location: "Inaruwa, Sunsari",
      email: "deepeshrouniyar@gmail.com",
      phone: "+977 9842822033",
      whatsapp: "+977 9804766631",
      facebook: "https://www.facebook.com/share/1B3xzduKh8/",
      instagram: "https://www.instagram.com/deepesh_rouniyar?igsh=ZHB3YmZnMWE1b3U4",
      mapUrl: "https://maps.app.goo.gl/e17o21Q5LtYJ2TQ39"
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'herbs',
    inStock: true
  });

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else {
      fetchCMSContent(cmsPage);
    }
  }, [activeTab, cmsPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data.products);
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCMSContent = async (page) => {
    try {
      setCmsLoading(true);
      const response = await axios.get(`/api/pages/${page}`);
      if (response.data.success && response.data.content) {
        // Merge with defaults to ensure all fields exist
        setCmsContent({
          ...defaultPageContent[page],
          ...response.data.content
        });
      } else {
        setCmsContent(defaultPageContent[page] || {});
      }
      setCmsSuccess('');
    } catch (err) {
      console.error('Error fetching CMS content:', err);
      // If content not found or error, use defaults
      setCmsContent(defaultPageContent[page] || {});
    } finally {
      setCmsLoading(false);
    }
  };

  const onCMSChange = (e) => {
    setCmsContent({
      ...cmsContent,
      [e.target.name]: e.target.value
    });
  };

  const onCMSSubmit = async (e) => {
    e.preventDefault();
    try {
      setCmsLoading(true);
      const token = localStorage.getItem('token');
      await axios.put(`/api/pages/${cmsPage}`, { content: cmsContent }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCmsSuccess('Page content updated successfully!');
      setTimeout(() => setCmsSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update page content');
    } finally {
      setCmsLoading(false);
    }
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setUploadLoading(true);
    setError('');

    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/products/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setFormData({
        ...formData,
        image: response.data.imageUrl
      });
    } catch (err) {
      setError('Failed to upload image');
      console.error('Image upload error:', err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, formData, config);
      } else {
        await axios.post('/api/products', formData, config);
      }

      await fetchProducts();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      inStock: product.inStock
    });
    setShowAddForm(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.delete(`/api/products/${productId}`, config);
      
      // If we were editing this product, reset the form
      if (editingProduct && editingProduct._id === productId) {
        resetForm();
      }
      
      await fetchProducts();
      // Show success message temporarily using the cmsSuccess state for consistency
      setCmsSuccess('Product deleted successfully');
      setTimeout(() => setCmsSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      image: '',
      category: 'herbs',
      inStock: true
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const categories = ['herbs', 'teas', 'oils', 'supplements', 'other'];

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="admin-header dark:from-gray-800 dark:to-gray-900 border dark:border-gray-800 shadow-xl mb-8">
        <div>
          <h1 className="text-white">Admin Dashboard</h1>
          <p className="text-gray-100 opacity-90">Manage your herbal products and page content</p>
        </div>
        <div className="flex gap-4">
          <button 
            className={`btn px-6 ${activeTab === 'products' ? 'btn-primary' : 'bg-white/20 text-white'}`}
            onClick={() => setActiveTab('products')}
          >
            Manage Products
          </button>
          <button 
            className={`btn px-6 ${activeTab === 'pages' ? 'btn-primary' : 'bg-white/20 text-white'}`}
            onClick={() => setActiveTab('pages')}
          >
            Edit Pages
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error shadow-md">{error}</div>}
      {cmsSuccess && <div className="alert alert-success shadow-md">{cmsSuccess}</div>}

      {activeTab === 'products' ? (
        <>
          <div className="flex justify-end mb-8">
            <button 
              className="btn btn-success shadow-lg px-8 py-3 rounded-xl font-bold"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? '✕ Cancel' : '+ Add New Product'}
            </button>
          </div>

          {showAddForm && (
            <div className="card mb-10 dark:bg-gray-900 dark:border-gray-800 border shadow-2xl animate-slideDown">
              <div className="card-header dark:from-gray-800 dark:to-gray-900">
                <h2 className="text-white text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              </div>
              <div className="card-body p-8">
                {/* Product Form Content (Existing) */}
                <form onSubmit={onSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name" className="dark:text-gray-300">Product Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        className="form-control dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="price" className="dark:text-gray-300">Price</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={onChange}
                        className="form-control dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="category" className="dark:text-gray-300">Category</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={onChange}
                        className="form-control dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat} className="dark:bg-gray-800">
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group full-width">
                      <label className="dark:text-gray-300">Product Image</label>
                      
                      {/* Image Input Type Selector */}
                      <div className="image-input-type-selector mb-5 flex gap-3">
                        <button
                          type="button"
                          className={`btn flex-1 ${imageInputType === 'file' ? 'btn-primary' : 'btn-secondary opacity-60'}`}
                          onClick={() => setImageInputType('file')}
                        >
                          Upload Image
                        </button>
                        <button
                          type="button"
                          className={`btn flex-1 ${imageInputType === 'url' ? 'btn-primary' : 'btn-secondary opacity-60'}`}
                          onClick={() => setImageInputType('url')}
                        >
                          Image URL
                        </button>
                      </div>

                      {/* File Upload Section */}
                      {imageInputType === 'file' && (
                        <div className="image-upload-section">
                          <div
                            className={`drag-drop-area ${dragActive ? 'drag-active' : ''} ${uploadLoading ? 'uploading' : ''} dark:bg-gray-800 dark:border-gray-700`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                          >
                            <input
                              type="file"
                              id="image-file"
                              accept="image/*"
                              onChange={handleFileSelect}
                              className="hidden"
                            />
                            {uploadLoading ? (
                              <div className="upload-loading">
                                <p className="dark:text-gray-300">Uploading image...</p>
                              </div>
                            ) : (
                              <div className="upload-prompt">
                                <p className="dark:text-gray-400">Drag & drop an image here or click to select</p>
                                <button
                                  type="button"
                                  className="btn btn-secondary mt-3"
                                  onClick={() => document.getElementById('image-file').click()}
                                >
                                  Choose File
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {/* Image Preview */}
                          {formData.image && (
                            <div className="image-preview mt-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                              <img 
                                src={formData.image}
                                alt="Product preview"
                                className="preview-image rounded shadow-sm"
                              />
                              <button
                                type="button"
                                className="btn btn-danger btn-sm remove-image mt-3"
                                onClick={() => setFormData({...formData, image: ''})}
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* URL Input Section */}
                      {imageInputType === 'url' && (
                        <div className="image-url-section">
                          <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={onChange}
                            className="form-control dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="https://example.com/image.jpg"
                          />
                          
                          {/* Image Preview for URL */}
                          {formData.image && (
                            <div className="image-preview mt-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                              <img 
                                src={formData.image}
                                alt="Product preview"
                                className="preview-image rounded shadow-sm"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/300x300?text=Invalid+Image';
                                }}
                              />
                              <button
                                type="button"
                                className="btn btn-danger btn-sm remove-image mt-3"
                                onClick={() => setFormData({...formData, image: ''})}
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="description" className="dark:text-gray-300">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={onChange}
                        className="form-control dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        rows="4"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="checkbox-label dark:text-gray-300">
                        <input
                          type="checkbox"
                          name="inStock"
                          checked={formData.inStock}
                          onChange={onChange}
                          className="dark:bg-gray-800 dark:border-gray-700"
                        />
                        In Stock
                      </label>
                    </div>
                  </div>

                  <div className="form-actions mt-8 flex gap-4">
                    <button type="submit" className="btn btn-primary flex-1 py-4 shadow-lg" disabled={loading}>
                      {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                    <button type="button" onClick={resetForm} className="btn btn-secondary flex-1 py-4">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="card dark:bg-gray-900 dark:border-gray-800 border shadow-xl overflow-hidden animate-fadeIn">
            <div className="card-header flex justify-between items-center dark:from-gray-800 dark:to-gray-900">
              <h2 className="text-white text-xl font-bold">Products ({products.length})</h2>
              <button onClick={fetchProducts} className="text-white opacity-80 hover:opacity-100 transition-opacity">↻ Refresh</button>
            </div>
            <div className="card-body p-0 overflow-x-auto">
              {loading && products.length === 0 ? (
                <div className="loading py-20 dark:text-gray-400">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 dark:bg-gray-900">
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No products found</p>
                  <button onClick={() => setShowAddForm(true)} className="btn btn-primary btn-sm">Add your first product to get started</button>
                </div>
              ) : (
                <table className="w-full text-left border-collapse dark:bg-gray-900">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 uppercase text-xs font-bold border-b dark:border-gray-800">
                      <th className="p-5">Product</th>
                      <th className="p-5">Category</th>
                      <th className="p-5">Price</th>
                      <th className="p-5">Status</th>
                      <th className="p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-gray-800">
                    {products.map(product => (
                      <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="p-5">
                          <div className="flex items-center gap-4">
                            <img src={product.image} alt="" className="w-12 h-12 rounded-xl object-cover border dark:border-gray-700 shadow-sm" />
                            <span className="font-semibold text-gray-800 dark:text-gray-100">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className="category-badge dark:bg-gray-800 dark:text-gray-300 border dark:border-gray-700">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-5 font-bold text-green-600 dark:text-green-400">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="p-5">
                          {product.inStock ? (
                            <span className="stock-badge in-stock">In Stock</span>
                          ) : (
                            <span className="stock-badge out-of-stock">Out of Stock</span>
                          )}
                        </td>
                        <td className="p-5 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleEdit(product)}
                              className="btn btn-primary btn-sm p-2 rounded-lg"
                              title="Edit"
                            >
                              ✎
                            </button>
                            <button 
                              onClick={() => handleDelete(product._id)}
                              className="btn btn-danger btn-sm p-2 rounded-lg"
                              title="Delete"
                            >
                              🗑
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="animate-fadeIn">
          {/* CMS Section */}
          <div className="flex gap-4 mb-8">
            {['home', 'about', 'contact'].map(page => (
              <button
                key={page}
                className={`btn flex-1 py-3 font-bold rounded-xl border ${cmsPage === page ? 'btn-primary border-transparent' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 dark:border-gray-800'}`}
                onClick={() => setCmsPage(page)}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)} Page
              </button>
            ))}
          </div>

          <div className="card dark:bg-gray-900 dark:border-gray-800 border shadow-2xl overflow-hidden">
            <div className="card-header dark:from-gray-800 dark:to-gray-900">
              <h2 className="text-white text-xl font-bold uppercase tracking-wider">Editing: {cmsPage} Page</h2>
            </div>
            <div className="card-body p-8">
              {cmsLoading ? (
                <div className="loading py-20 dark:text-gray-400">Loading page content...</div>
              ) : (
                <form onSubmit={onCMSSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    {Object.keys(cmsContent).map(key => (
                      <div key={key} className="form-group">
                        <label className="dark:text-gray-300 font-bold uppercase text-xs tracking-widest mb-2 block">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        {key.toLowerCase().includes('subtitle') || key.toLowerCase().includes('text') || key.toLowerCase().includes('description') ? (
                          <textarea
                            name={key}
                            value={cmsContent[key] || ''}
                            onChange={onCMSChange}
                            className="form-control dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            rows="4"
                          />
                        ) : (
                          <input
                            type="text"
                            name={key}
                            value={cmsContent[key] || ''}
                            onChange={onCMSChange}
                            className="form-control dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="pt-6">
                    <button type="submit" className="btn btn-primary w-full py-4 rounded-xl font-bold shadow-xl" disabled={cmsLoading}>
                      {cmsLoading ? 'Saving...' : 'Update Page Content'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
