// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { spawn } = require('child_process');
const weatherRoutes = require('./routes/weather');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const chatRoutes = require('./routes/chat');
const authMiddleware = require('./middleware/auth');

// Check if required environment variables are set
if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('Error: JWT_SECRET is not defined in .env file');
  process.exit(1);
}

if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is not defined in .env file');
  process.exit(1);
}

// Import models
const User = require('./models/User');
const Flight = require('./models/Flight');
const Prediction = require('./models/Prediction');

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8000', 'http://localhost:8081'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

// Add a middleware to log all incoming requests
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  });
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/safe_land_ai')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Auth routes (no auth middleware)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, organization, role, secretKey } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // If role is admin, verify secret key
    if (role === 'admin') {
      if (!secretKey || secretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ message: 'Invalid admin secret key' });
      }
    }

    // Create new user - password will be hashed by the User model's pre-save hook
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      organization,
      role
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        organization: user.organization,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login attempt with email:', req.body.email);
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    console.log('Looking for user with email:', email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('User found:', user._id);

    // Check password
    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('Password match successful');

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
    console.log('Token generated successfully');

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        organization: user.organization,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Predictor routes
app.post('/api/predictor/flight-data', authMiddleware, async (req, res) => {
  try {
    console.log('Fetching flight data for authenticated user:', req.user._id);
    const { Flight_ID } = req.body;
    console.log('Fetching flight data for ID:', Flight_ID);
    
    const pythonProcess = spawn('python', ['backend/predictor.py', 'get_flight_data', Flight_ID]);
    
    let result = '';
    
    pythonProcess.stdout.on('data', (chunk) => {
      result += chunk.toString();
    });
    
    pythonProcess.stderr.on('data', (chunk) => {
      console.log('Python debug:', chunk.toString());
    });
    
    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
      if (code !== 0) {
        return res.status(500).json({ error: 'Failed to fetch flight data' });
      }
      
      try {
        const data = JSON.parse(result.trim());
        console.log('Received flight data:', JSON.stringify(data));
        res.json(data);
      } catch (e) {
        console.error('JSON parse error:', e);
        res.status(500).json({ error: 'Failed to parse flight data' });
      }
    });
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
});

app.post('/api/predictor/predict', authMiddleware, async (req, res) => {
  try {
    console.log('Making prediction for authenticated user:', req.user._id);
    const data = req.body;
    console.log('Making prediction with data:', JSON.stringify(data));
    
    // Validate required fields
    if (!data.Flight_ID) {
      return res.status(400).json({ error: 'Flight ID is required' });
    }

    const pythonProcess = spawn('python', ['backend/predictor.py', 'predict_landing', JSON.stringify(data)]);
    
    let result = '';
    let error = '';
    
    pythonProcess.stdout.on('data', (chunk) => {
      result += chunk.toString();
    });
    
    pythonProcess.stderr.on('data', (chunk) => {
      error += chunk.toString();
      console.log('Python error:', chunk.toString());
    });
    
    pythonProcess.on('close', async (code) => {
      console.log(`Python process exited with code ${code}`);
      if (code !== 0) {
        return res.status(500).json({ error: 'Failed to make prediction', details: error });
      }
      
      try {
        const prediction = JSON.parse(result.trim());
        console.log('Received prediction result:', JSON.stringify(prediction));
        
        // Store prediction in database
        console.log('Saving prediction for user:', req.user._id);
        try {
          const newPrediction = new Prediction({
            user: req.user._id,
            flightId: data.Flight_ID,
            prediction: prediction.prediction,
            probability: prediction.probability,
            inputData: data,
            shapContributions: prediction.shap_contributions,
            correctiveMeasures: prediction.corrective_measures || []
          });
          
          console.log('Saving prediction to database:', JSON.stringify(newPrediction));
          const savedPrediction = await newPrediction.save();
          console.log('Prediction saved successfully with ID:', savedPrediction._id);
          
          // Verify the prediction was saved
          const verifyPrediction = await Prediction.findById(savedPrediction._id);
          console.log('Verified saved prediction:', verifyPrediction);
          
          // Return both the prediction result and the saved prediction ID
          res.json({
            ...prediction,
            predictionId: savedPrediction._id
          });
        } catch (dbError) {
          console.error('Error saving prediction to database:', dbError);
          // Continue with the response even if saving fails
          res.json(prediction);
        }
      } catch (e) {
        console.error('JSON parse error:', e);
        res.status(500).json({ error: 'Failed to parse prediction result' });
      }
    });
  } catch (error) {
    console.error('Error making prediction:', error);
    res.status(500).json({ error: 'Failed to make prediction' });
  }
});

// Add new endpoint to fetch prediction history
app.get('/api/predictions/history', authMiddleware, async (req, res) => {
  try {
    // Add cache control headers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    console.log('Fetching prediction history for user:', req.user._id);
    
    const { 
      page = 1, 
      limit = 10, 
      search, 
      outcome, 
      startDate, 
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Convert user ID to ObjectId
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const query = { user: userId };
    
    console.log('Query parameters:', { page, limit, search, outcome, startDate, endDate, sortBy, sortOrder });
    console.log('User ID:', userId);
    console.log('Query:', JSON.stringify(query));

    // Search functionality
    if (search) {
      query.$or = [
        { flightId: { $regex: search, $options: 'i' } },
        { 'inputData.Runway_Condition': { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by outcome
    if (outcome) {
      query.prediction = outcome;
    }

    // Date range filter
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    console.log('Final query:', JSON.stringify(query));

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    // Get predictions with pagination
    const predictions = await Prediction.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(); // Use lean() for better performance
    
    console.log('Found predictions:', predictions.length);
    console.log('Sample prediction:', predictions[0] ? JSON.stringify(predictions[0]) : 'No predictions found');
    
    // Get total count for pagination
    const total = await Prediction.countDocuments(query);
    console.log('Total predictions:', total);
    
    // Verify database connection
    const dbStatus = await mongoose.connection.db.admin().ping();
    console.log('Database connection status:', dbStatus);
    
    res.json({
      predictions: predictions.map(pred => ({
        id: pred._id,
        flightId: pred.flightId,
        prediction: pred.prediction,
        probability: pred.probability,
        timestamp: pred.createdAt,
        inputData: pred.inputData,
        shapContributions: pred.shapContributions,
        correctiveMeasures: pred.correctiveMeasures
      })),
      pagination: {
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching prediction history:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to fetch prediction history' });
  }
});

// Test endpoint to verify database connection and count predictions
app.get('/api/predictions/test', async (req, res) => {
  try {
    const totalPredictions = await Prediction.countDocuments();
    const recentPredictions = await Prediction.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('flightId prediction createdAt');
    
    res.json({
      status: 'Database connected',
      totalPredictions,
      recentPredictions
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ error: 'Database connection test failed' });
  }
});

// Weather routes (public access)
app.use('/api/weather', weatherRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

// Protected admin routes - exclude login and register
app.use('/api/admin', (req, res, next) => {
  if (req.path === '/login' || req.path === '/register') {
    return next();
  }
  authMiddleware(req, res, next);
}, adminRoutes);

// User routes (with auth middleware)
app.use('/api/user', userRoutes);

// Chat routes
app.use('/api/chat', chatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Serve static files from the dist directory
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Get port from environment variable or use 8000 as fallback
const PORT = process.env.PORT || 8000;

// Create server with error handling
const server = app.listen(PORT, 'localhost', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
    console.log('You can change the port in the .env file or by setting the PORT environment variable.');
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
}); 