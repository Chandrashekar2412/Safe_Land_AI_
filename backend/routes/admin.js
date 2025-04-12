const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const adminAuth = require('../middleware/adminAuth');
const authMiddleware = require('../middleware/auth');

// Admin registration (only one admin allowed)
router.post('/register', async (req, res) => {
    try {
        console.log('Admin registration attempt:', req.body);

        // Check if admin already exists
        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            console.log('Admin already exists');
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            console.log('Missing required fields');
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin
        const admin = new Admin({
            username,
            email,
            password: hashedPassword,
            isSuperAdmin: true
        });

        await admin.save();
        console.log('Admin created successfully:', admin._id);

        // Generate token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.status(201).json({
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                isSuperAdmin: admin.isSuperAdmin
            }
        });
    } catch (error) {
        console.error('Admin registration error:', error);
        res.status(500).json({ 
            message: 'Error creating admin',
            error: error.message 
        });
    }
});

// Admin login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Admin login attempt:', { email });

        // Find admin
        const admin = await Admin.findOne({ email });
        console.log('Admin found:', admin ? 'yes' : 'no');
        
        if (!admin) {
            console.log('Admin not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log('Password match:', isMatch);
        
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });
        console.log('Token generated successfully');

        console.log('Admin login successful:', admin._id);
        res.json({
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                isSuperAdmin: admin.isSuperAdmin
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Error during login' });
    }
});

// Protected routes below this point
router.use(adminAuth);

// Get all users
router.get('/users', async (req, res) => {
    try {
        console.log('Fetching users...');
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .lean();

        console.log('Found users:', users.length);
        
        // Format the response to match the frontend expectations
        const formattedUsers = users.map(user => ({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            organization: user.organization,
            role: user.role || 'user',
            isActive: user.isActive !== undefined ? user.isActive : true,
            createdAt: user.createdAt
        }));

        res.json(formattedUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Update user
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, organization, role, isActive } = req.body;

        // Validate input
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ message: 'First name, last name, and email are required' });
        }

        // Check if email is already taken by another user
        const existingUser = await User.findOne({ email, _id: { $ne: id } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { firstName, lastName, email, organization, role, isActive },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent deleting the last admin
        const user = await User.findById(id);
        if (user.role === 'admin') {
            const adminCount = await User.countDocuments({ role: 'admin' });
            if (adminCount <= 1) {
                return res.status(400).json({ message: 'Cannot delete the last admin user' });
            }
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

// Get admin dashboard data
router.get('/dashboard', async (req, res) => {
    try {
        // Get all users
        const users = await User.find().select('-password');
        
        // Get system statistics
        const totalUsers = await User.countDocuments();
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('-password');

        res.json({
            message: 'Welcome to admin dashboard',
            admin: {
                id: req.admin._id,
                username: req.admin.username,
                email: req.admin.email,
                isSuperAdmin: req.admin.isSuperAdmin
            },
            statistics: {
                totalUsers,
                recentUsers
            },
            users
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
});

module.exports = router; 