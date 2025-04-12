const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminAuth = async (req, res, next) => {
    try {
        console.log('Admin auth middleware - checking token');
        const authHeader = req.header('Authorization');
        console.log('Auth header:', authHeader);
        
        if (!authHeader) {
            console.log('No Authorization header found');
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.replace('Bearer ', '');
        console.log('Extracted token:', token);
        
        if (!token) {
            console.log('No token found in Authorization header');
            return res.status(401).json({ message: 'No token provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded);
        } catch (jwtError) {
            console.error('JWT verification error:', jwtError);
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        const admin = await Admin.findById(decoded.id);
        console.log('Found admin:', admin ? admin._id : 'not found');

        if (!admin) {
            console.log('Admin not found for token');
            return res.status(401).json({ message: 'Admin not found' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.error('Admin auth error:', error);
        res.status(401).json({ message: 'Not authorized' });
    }
};

module.exports = adminAuth; 