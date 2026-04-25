import React, { useState, useEffect } from 'react';
import axios from 'axios';

const About = () => {
  const [content, setContent] = useState({
    title: "About Halesi Herbal",
    description: "Bringing the purest essence of nature to your doorstep. We are dedicated to providing high-quality herbal products for a healthier, more balanced life.",
    storyTitle: "Our Story",
    storyText: "Founded with a passion for traditional herbal wisdom and modern wellness, Halesi Herbal started as a small initiative to bring authentic natural remedies to those seeking a more holistic approach to health.",
    missionTitle: "Our Mission",
    missionText: "To empower individuals on their wellness journey by providing accessible, effective, and ethically sourced herbal solutions that honor the power of nature."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('/api/pages/about');
        if (response.data.success && response.data.content) {
          setContent(prevContent => ({
            ...prevContent,
            ...response.data.content
          }));
        }
      } catch (err) {
        console.error('Error fetching about content:', err);
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
    <div className="max-w-7xl mx-auto px-5 py-12 bg-[#E8EAF6] dark:bg-gray-950 transition-colors duration-300">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-6">{content.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {content.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{content.storyTitle}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {content.storyText}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-gray-900 p-8 rounded-2xl border border-green-100 dark:border-gray-800 shadow-inner">
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-500 mb-4">{content.missionTitle}</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {content.missionText}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-columns-3 gap-8 text-center">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
          <div className="text-4xl mb-4">🌿</div>
          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">100% Natural</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">No artificial additives, just pure herbal goodness.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
          <div className="text-4xl mb-4">🤝</div>
          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Ethically Sourced</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Working directly with local farmers and gatherers.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
          <div className="text-4xl mb-4">✨</div>
          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Quality Assured</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Rigorous testing to ensure potency and purity.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
