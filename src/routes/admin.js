import express from 'express';
import User from '../models/User.js';
import Prediction from '../models/Prediction.js';
import ActivityLog from '../models/ActivityLog.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get analytics data
router.get('/analytics', authenticateAdmin, async (req, res) => {
  try {
    // Get user growth data (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          date: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    // Get activity statistics
    const totalUsers = await User.countDocuments();
    const totalPredictions = await Prediction.countDocuments();
    const averagePredictionsPerUser = totalUsers > 0 ? totalPredictions / totalUsers : 0;

    // Get most active hour
    const mostActiveHour = await Prediction.aggregate([
      {
        $group: {
          _id: { $hour: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 1
      }
    ]);

    // Get prediction success rate
    const predictionSuccessRate = await Prediction.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    // Get recent activity
    const recentActivity = await ActivityLog.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .populate('user', 'username')
      .lean();

    const formattedActivity = recentActivity.map(activity => ({
      timestamp: activity.timestamp,
      action: activity.action,
      user: activity.user?.username || 'System'
    }));

    res.json({
      userGrowth,
      activityStats: {
        totalPredictions,
        averagePredictionsPerUser,
        mostActiveHour: mostActiveHour[0]?._id || 0
      },
      predictionSuccessRate,
      recentActivity: formattedActivity
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
});

// Get all users
router.get('/users', authenticateAdmin, async (req, res) => {
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
      username: user.username,
      email: user.email,
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
router.put('/users/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, isActive } = req.body;

    // Validate input
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already taken' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, role, isActive },
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
router.delete('/users/:id', authenticateAdmin, async (req, res) => {
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

    // Also delete user's predictions
    await Prediction.deleteMany({ user: id });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

export default router; 