// Mock data store for development without MongoDB
let products = [
  {
    _id: '1',
    name: "Ashwagandha Powder",
    description: "Premium quality Ashwagandha root powder, known for its adaptogenic properties. Helps reduce stress and anxiety while improving overall wellness.",
    price: 25.99,
    category: "powders",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    inStock: true,
    createdAt: new Date('2024-01-01')
  },
  {
    _id: '2',
    name: "Turmeric Capsules",
    description: "High-potency turmeric capsules with black pepper extract for enhanced absorption. Natural anti-inflammatory and antioxidant support.",
    price: 19.99,
    category: "capsules",
    image: "https://images.unsplash.com/photo-1583947215254-15bbdf3a0b9c?w=400",
    inStock: true,
    createdAt: new Date('2024-01-02')
  },
  {
    _id: '3',
    name: "Triphala Tablets",
    description: "Traditional Ayurvedic formula combining three fruits. Supports digestive health and gentle detoxification.",
    price: 15.99,
    category: "tablets",
    image: "https://images.unsplash.com/photo-1583321633273-9c4a0b2b5b3d?w=400",
    inStock: true,
    createdAt: new Date('2024-01-03')
  },
  {
    _id: '4',
    name: "Neem Oil",
    description: "Pure, cold-pressed neem oil for skin care and hair health. Natural antibacterial and antifungal properties.",
    price: 12.99,
    category: "oils",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    inStock: false,
    createdAt: new Date('2024-01-04')
  },
  {
    _id: '5',
    name: "Brahmi Tea",
    description: "Organic Brahmi leaves for mental clarity and cognitive support. Helps improve memory and concentration.",
    price: 18.99,
    category: "teas",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400",
    inStock: true,
    createdAt: new Date('2024-01-05')
  }
];

let pageContents = {
  home: {
    title: "Welcome to Halesi Herbal",
    subtitle: "Discover the Power of Nature's Healing",
    description: "Premium quality herbal products for your wellness journey"
  },
  about: {
    title: "About Halesi Herbal",
    subtitle: "Traditional Wisdom, Modern Science",
    description: "We bring you the finest herbal products sourced directly from the Himalayan region"
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Have questions about our products or need a consultation? We're here to help you.",
    location: "Kathmandu, Nepal",
    email: "deepeshrouniyar@gmail.com",
    phone: "9842822033",
    whatsapp: "9804766631",
    facebook: "https://www.facebook.com/share/1B3xzduKh8/",
    instagram: "https://www.instagram.com/deepesh_rouniyar?igsh=ZHB3YmZnMWE1b3U4"
  }
};

let users = [
  {
    _id: '1',
    name: "Admin User",
    email: "admin@halesi.com",
    password: "$2a$10$placeholder_hash", // In production, this would be properly hashed
    role: "admin"
  }
];

module.exports = {
  products,
  pageContents,
  users
};
