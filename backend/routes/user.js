const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    // User is already attached to req by auth middleware
    const user = req.user;
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      organization: user.organization,
      role: user.role,
      phone: user.phone
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, email, organization, role, phone } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'First name, last name, and email are required' });
    }

    // Check if email is being changed and if it's already taken
    if (email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already taken' });
      }
    }

    // Update user data
    req.user.firstName = firstName;
    req.user.lastName = lastName;
    req.user.email = email;
    req.user.organization = organization || req.user.organization;
    req.user.role = role || req.user.role;
    req.user.phone = phone || req.user.phone;

    await req.user.save();

    // Generate new token
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        organization: req.user.organization,
        role: req.user.role,
        phone: req.user.phone
      },
      token
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router; 