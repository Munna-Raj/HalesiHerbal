import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [content, setContent] = useState({
    title: "Get in Touch",
    subtitle: "Have questions about our products or need a consultation? We're here to help you.",
    location: "Inaruwa, Sunsari",
    email: "deepeshrouniyar@gmail.com",
    phone: "+977 9842822033",
    whatsapp: "+977 9804766631",
    facebook: "https://www.facebook.com/share/1B3xzduKh8/",
    instagram: "https://www.instagram.com/deepesh_rouniyar?igsh=ZHB3YmZnMWE1b3U4",
    mapUrl: "https://maps.app.goo.gl/e17o21Q5LtYJ2TQ39"
  });
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('/api/pages/contact');
        if (response.data.success && response.data.content) {
          setContent(prevContent => ({
            ...prevContent,
            ...response.data.content
          }));
        }
      } catch (err) {
        console.error('Error fetching contact content:', err);
        // If API fails, we'll use the default content from state
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const { name, email, subject, message } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${content.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    
    // Show a temporary success message
    alert("Opening your email client to send the message. Thank you for contacting Halesi Herbal!");
    
    window.location.href = mailtoLink;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
      <div className="animate-spin text-4xl text-green-600">🌿</div>
    </div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-12 bg-[#E8EAF6] dark:bg-gray-950 transition-colors duration-300">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">{content.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {content.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600">
                  📍
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">Our Location</h4>
                  <a 
                    href={content.mapUrl || "https://maps.app.goo.gl/e17o21Q5LtYJ2TQ39"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors"
                  >
                    {content.location}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600">
                  📧
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">Email Us</h4>
                  <p className="text-gray-600 dark:text-gray-400">{content.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600">
                  📱
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">Call</h4>
                  <p className="text-gray-600 dark:text-gray-400">{content.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600">
                  💬
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">WhatsApp</h4>
                  <p className="text-gray-600 dark:text-gray-400">{content.whatsapp}</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a 
                  href={content.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  f
                </a>
                <a 
                  href={content.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  ig
                </a>
                <a 
                  href={`https://wa.me/${content.whatsapp.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  wa
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Send us a Message</h2>
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                className="form-control"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                className="form-control"
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={onChange}
                className="form-control"
                placeholder="Product Inquiry"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={onChange}
                className="form-control"
                rows="4"
                placeholder="Your message here..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full py-3 text-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
