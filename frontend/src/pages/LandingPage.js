import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const [content, setContent] = useState({
    heroTitle: "Unlock Your Natural Potential",
    heroSubtitle: "Discover the ancient wisdom of herbal medicine combined with modern wellness science. Halesi Herbal brings you the purest remedies directly from nature's heart.",
    heroBadge: "Purely Organic. Purely Natural."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('/api/pages/home');
        if (response.data.success && response.data.content) {
          setContent(prevContent => ({
            ...prevContent,
            ...response.data.content
          }));
        }
      } catch (err) {
        console.error('Error fetching home content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
      <div className="animate-spin text-4xl text-green-600">🌿</div>
    </div>;
  }

  return (
    <div className="bg-[#E8EAF6] dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#E8EAF6] to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-5 text-center relative z-10">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold text-sm mb-6 tracking-widest uppercase">
            {content.heroBadge}
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-none">
            {content.heroTitle.split(' ').map((word, i) => 
              word.toLowerCase() === 'natural' ? <span key={i} className="text-green-600"> {word} </span> : word + ' '
            )}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            {content.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/products" className="btn btn-primary px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-green-600/40 hover:scale-105 transition-all">
              Explore Products
            </Link>
            <Link to="/about" className="btn bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-10 py-5 rounded-2xl text-xl font-bold border border-gray-200 dark:border-gray-700 shadow-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">Why Choose Halesi Herbal?</h2>
            <div className="h-2 w-24 bg-green-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-10 rounded-3xl bg-green-50 dark:bg-gray-900/50 border border-green-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500 group">
              <div className="text-5xl mb-8 group-hover:scale-110 transition-transform inline-block">🌿</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">100% Organic</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Our herbs are grown without pesticides or chemicals, ensuring you get the full healing power of nature in every dose.
              </p>
            </div>
            
            <div className="p-10 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 group scale-105 z-10">
              <div className="text-5xl mb-8 group-hover:scale-110 transition-transform inline-block">🔬</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Scientifically Tested</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Traditional wisdom meets modern science. Every product undergoes rigorous lab testing for purity and potency.
              </p>
            </div>
            
            <div className="p-10 rounded-3xl bg-green-50 dark:bg-gray-900/50 border border-green-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500 group">
              <div className="text-5xl mb-8 group-hover:scale-110 transition-transform inline-block">🌍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ethical Sourcing</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                We support local farmers and sustainable harvesting methods, protecting the planet while healing people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="bg-green-600 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                Ready to Start Your <br/>Wellness Journey?
              </h2>
              <p className="text-green-50 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium opacity-90">
                Join thousands of others who have transformed their lives with our natural herbal solutions.
              </p>
              <Link to="/products" className="bg-white text-green-600 px-12 py-5 rounded-2xl text-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all inline-block">
                Browse Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
