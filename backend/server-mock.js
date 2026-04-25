require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { products, pageContents, users } = require('./mockData');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Mock authentication middleware
const authenticateToken = (req, res, next) => {
  // Simple mock authentication - in production, use proper JWT
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied.' });
  // For mock purposes, we'll just pass through
  req.user = { id: '1', email: 'admin@halesi.com' };
  next();
};

// Mock admin check middleware
const requireAdmin = async (req, res, next) => {
  // For mock purposes, we'll just pass through
  next();
};

// Routes

// Products routes
app.get('/api/products', (req, res) => {
  try {
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const product = products.find(p => p._id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching product' });
  }
});

// Pages routes
app.get('/api/pages/:pageName', (req, res) => {
  try {
    const content = pageContents[req.params.pageName];
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching content' });
  }
});

app.put('/api/pages/:pageName', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { content } = req.body;
    pageContents[req.params.pageName] = content;
    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating content' });
  }
});

// Auth routes (mock)
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Mock token generation
    const token = 'mock_jwt_token_' + Date.now();
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user (mock)
    const newUser = {
      _id: String(users.length + 1),
      name,
      email,
      password: 'hashed_password_mock', // In production, this would be properly hashed
      role: 'user'
    };
    
    users.push(newUser);
    
    // Mock token generation
    const token = 'mock_jwt_token_' + Date.now();
    
    res.json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Halesi Herbal API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// Start server (no database connection needed for mock)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Using mock data - no database connection required');
});
