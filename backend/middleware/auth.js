const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    console.log('Auth middleware - Checking authorization header');
    const authHeader = req.header('Authorization') || req.header('authorization');
    console.log('Auth header:', authHeader);

    if (!authHeader) {
      console.log('No authorization header found');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token found, verifying...');

    if (!token) {
      console.log('No token found in authorization header');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Token decoded:', decoded);
    
    // Check if the token has userId
    if (!decoded.userId) {
      console.log('Token does not contain userId');
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const user = await User.findById(decoded.userId);
    console.log('User found:', user ? 'yes' : 'no');
    
    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    console.log('Authentication successful for user:', user._id);
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 