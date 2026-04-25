require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const testProducts = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Test fetching products
    const products = await Product.find({});
    console.log(`Found ${products.length} products`);
    
    if (products.length > 0) {
      console.log('First product:', products[0]);
    }

  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

testProducts();
