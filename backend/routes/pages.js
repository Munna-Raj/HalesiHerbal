const express = require('express');
const jwt = require('jsonwebtoken');
const PageContent = require('../models/PageContent');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Admin rights required.' });
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error during admin check' });
  }
};

// GET content for a specific page (public)
router.get('/:pageName', async (req, res) => {
  try {
    // Check if database is connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.error('DATABASE DISCONNECTED: Cannot fetch page content');
      return res.status(503).json({ 
        message: 'Database is not connected. Please check if your IP is whitelisted in MongoDB Atlas or if local MongoDB is running.',
        error: 'Database Connection Error'
      });
    }

    const content = await PageContent.findOne({ page: req.params.pageName });
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json({ success: true, content: content.content });
  } catch (error) {
    console.error('Page content fetch error:', error);
    res.status(500).json({ message: 'Server error while fetching content' });
  }
});

// UPDATE content for a specific page (admin only)
router.put('/:pageName', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { content } = req.body;
    let pageContent = await PageContent.findOne({ page: req.params.pageName });

    if (pageContent) {
      pageContent.content = content;
      await pageContent.save();
    } else {
      pageContent = await PageContent.create({
        page: req.params.pageName,
        content
      });
    }

    res.json({ success: true, content: pageContent.content });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating content' });
  }
});

module.exports = router;
