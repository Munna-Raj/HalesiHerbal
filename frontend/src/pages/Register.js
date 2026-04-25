import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const { name, email, password, confirmPassword, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
        role
      });
      
      localStorage.setItem('token', response.data.token);
      
      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#E8EAF6] dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-5xl w-full flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        
        {/* Left Side: Image & Branding */}
        <div className="hidden md:flex md:w-2/5 bg-green-600 relative overflow-hidden p-12 text-white flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 mb-12 group w-fit">
              <div className="bg-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <span className="text-green-600 text-xl">🌿</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">Halesi<span className="text-green-100">Herbal</span></h2>
            </Link>
            
            <h1 className="text-4xl font-black mb-6 leading-tight">Start Your Wellness Journey.</h1>
            <p className="text-green-50 text-lg font-medium opacity-90">Join thousands of others who trust Halesi Herbal for their natural healthcare needs.</p>
          </div>
          
          <div className="relative z-10">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <p className="text-sm font-bold text-green-50 italic">"Halesi Herbal's products are pure and effective. Highly recommended!"</p>
              <p className="text-xs mt-3 text-green-200 font-bold">— Happy Customer</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-3/5 p-8 sm:p-12">
          <div className="max-w-md mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Create Account</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Fill in your details to get started</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-3">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">👤</span>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-green-500 transition-all font-medium text-gray-900 dark:text-white"
                    placeholder="Deepesh Rouniyar"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">📧</span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-green-500 transition-all font-medium text-gray-900 dark:text-white"
                    placeholder="deepesh@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={onChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-green-500 transition-all font-medium text-gray-900 dark:text-white"
                    placeholder="••••••••"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 hover:text-green-600 transition-colors uppercase tracking-widest"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Confirm</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🛡️</span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-green-500 transition-all font-medium text-gray-900 dark:text-white"
                    placeholder="••••••••"
                    required
                    minLength="6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" required className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    I agree to the <a href="#" className="text-green-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 font-bold hover:underline">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="sm:col-span-2 w-full py-4 bg-green-600 text-white rounded-xl font-black text-lg shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Creating Account...
                  </span>
                ) : "Create Account"}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Already have an account? <Link to="/login" className="text-green-600 font-black hover:text-green-700 transition-colors ml-1">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
