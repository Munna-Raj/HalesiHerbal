require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const PageContent = require('../models/PageContent');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'rajyadavproject@gmail.com' });
    if (existingAdmin) {
      console.log('Admin account already exists. Updating password to ensure correct hashing...');
      existingAdmin.password = 'Admin955@';
      await existingAdmin.save();
      console.log('Admin password updated successfully!');
    } else {
      // Create admin user
      await User.create({
        name: 'Raj Kumar',
        email: 'rajyadavproject@gmail.com',
        password: 'Admin955@',
        role: 'admin'
      });
      console.log('Admin account created successfully!');
    }

    // Seed Page Content
    const pages = [
      {
        page: 'home',
        content: {
          heroTitle: "Unlock Your Natural Potential",
          heroSubtitle: "Discover the ancient wisdom of herbal medicine combined with modern wellness science. Halesi Herbal brings you the purest remedies directly from nature's heart.",
          heroBadge: "Purely Organic. Purely Natural."
        }
      },
      {
        page: 'about',
        content: {
          title: "About Halesi Herbal",
          description: "Bringing the purest essence of nature to your doorstep. We are dedicated to providing high-quality herbal products for a healthier, more balanced life.",
          storyTitle: "Our Story",
          storyText: "Founded with a passion for traditional herbal wisdom and modern wellness, Halesi Herbal started as a small initiative to bring authentic natural remedies to those seeking a more holistic approach to health.",
          missionTitle: "Our Mission",
          missionText: "To empower individuals on their wellness journey by providing accessible, effective, and ethically sourced herbal solutions that honor the power of nature."
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

    for (const page of pages) {
      const exists = await PageContent.findOne({ page: page.page });
      if (!exists) {
        await PageContent.create(page);
        console.log(`Seeded ${page.page} content`);
      }
    }

    console.log('Setup complete!');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdmin();
