import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-green-600 dark:text-green-400">
              <h2 className="text-2xl font-bold mb-4">Halesi Herbal</h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Your trusted partner for authentic herbal products and natural wellness solutions. Empowering healthy lifestyles since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-6 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-6 uppercase text-sm tracking-wider">Categories</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm">Pure Herbs</Link></li>
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm">Essential Oils</Link></li>
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm">Natural Teas</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-6 uppercase text-sm tracking-wider">Connect</h4>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1B3xzduKh8/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white dark:hover:bg-green-600 transition-all">f</a>
              <a href="https://www.instagram.com/deepesh_rouniyar?igsh=ZHB3YmZnMWE1b3U4" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white dark:hover:bg-green-600 transition-all">ig</a>
              <a href="https://wa.me/9804766631" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white dark:hover:bg-green-600 transition-all">wa</a>
            </div>
            <div className="mt-6 space-y-2">
              <a 
                href="https://maps.app.goo.gl/e17o21Q5LtYJ2TQ39" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 text-sm hover:text-green-600 transition-colors block"
              >
                📍 Inaruwa, Sunsari
              </a>
              <p className="text-gray-600 dark:text-gray-400 text-sm">📞 9842822033</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">📧 deepeshrouniyar@gmail.com</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm italic mt-4">"Nature is the best medicine."</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-500 text-xs">
            © {new Date().getFullYear()} Halesi Herbal. All rights reserved. Designed for natural wellness.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
