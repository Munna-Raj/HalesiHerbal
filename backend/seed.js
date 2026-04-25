require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const PageContent = require('./models/PageContent');
const User = require('./models/User');

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/halesi-herbal-local');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await PageContent.deleteMany({});
    await User.deleteMany({});

    // Create sample products
    const products = [
      {
        name: "Ashwagandha Powder",
        description: "Premium quality Ashwagandha root powder, known for its adaptogenic properties. Helps reduce stress and anxiety while improving overall wellness.",
        price: 25.99,
        category: "powders",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
        inStock: true
      },
      {
        name: "Turmeric Capsules",
        description: "High-potency turmeric capsules with black pepper extract for enhanced absorption. Natural anti-inflammatory and antioxidant support.",
        price: 19.99,
        category: "capsules",
        image: "https://images.unsplash.com/photo-1583947215254-15bbdf3a0b9c?w=400",
        inStock: true
      },
      {
        name: "Triphala Tablets",
        description: "Traditional Ayurvedic formula combining three fruits. Supports digestive health and gentle detoxification.",
        price: 15.99,
        category: "tablets",
        image: "https://images.unsplash.com/photo-1583321633273-9c4a0b2b5b3d?w=400",
        inStock: true
      },
      {
        name: "Neem Oil",
        description: "Pure, cold-pressed neem oil for skin care and hair health. Natural antibacterial and antifungal properties.",
        price: 12.99,
        category: "oils",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
        inStock: false
      },
      {
        name: "Brahmi Tea",
        description: "Organic Brahmi leaves for mental clarity and cognitive support. Helps improve memory and concentration.",
        price: 18.99,
        category: "teas",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400",
        inStock: true
      }
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products`);

    // Create page content
    const pageContents = [
      {
        page: 'home',
        content: {
          title: "Welcome to Halesi Herbal",
          subtitle: "Discover the Power of Nature's Healing",
          description: "Premium quality herbal products for your wellness journey"
        }
      },
      {
        page: 'about',
        content: {
          title: "About Halesi Herbal",
          subtitle: "Traditional Wisdom, Modern Science",
          description: "We bring you the finest herbal products sourced directly from the Himalayan region"
        }
      },
      {
        page: 'contact',
        content: {
          title: "Get in Touch",
          subtitle: "Have questions about our products or need a consultation? We're here to help you.",
          location: "Kathmandu, Nepal",
          email: "deepeshrouniyar@gmail.com",
          phone: "9842822033",
          whatsapp: "9804766631",
          facebook: "https://www.facebook.com/share/1B3xzduKh8/",
          instagram: "https://www.instagram.com/deepesh_rouniyar?igsh=ZHB3YmZnMWE1b3U4"
        }
      }
    ];

    const createdPages = await PageContent.insertMany(pageContents);
    console.log(`Created ${createdPages.length} page contents`);

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@halesi.com",
      password: "admin123", // This will be hashed by the pre-save hook
      role: "admin"
    });

    await adminUser.save();
    console.log('Admin user created');

    console.log('Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
