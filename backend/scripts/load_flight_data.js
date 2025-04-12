const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Flight = require('../models/Flight');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Check if MongoDB URI is set
if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

// Connect to MongoDB with better error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    return loadFlightData();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

async function loadFlightData() {
  try {
    const results = [];
    const csvPath = path.join(__dirname, '../flight_landing_data.csv');

    // Check if CSV file exists
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found at: ${csvPath}`);
    }

    console.log('Reading CSV file...');
    
    // Read and parse the CSV file
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', resolve)
        .on('error', reject);
    });

    console.log(`Found ${results.length} records in CSV`);

    // Clear existing data
    console.log('Clearing existing flight data...');
    await Flight.deleteMany({});
    console.log('Existing flight data cleared');

    // Insert new data
    const flights = results.map(row => ({
      Flight_ID: row.Flight_ID,
      Altitude_AGL_ft: parseFloat(row.Altitude_AGL_ft),
      Vertical_Speed_fpm: parseFloat(row.Vertical_Speed_fpm),
      Touchdown_Velocity_fps: parseFloat(row.Touchdown_Velocity_fps),
      G_Force: parseFloat(row.G_Force),
      Wind_Speed_kts: parseFloat(row.Wind_Speed_kts),
      Crosswind_Component_kts: parseFloat(row.Crosswind_Component_kts),
      Visibility_miles: parseFloat(row.Visibility_miles),
      Runway_Condition: row.Runway_Condition,
      Throttle_Input: parseFloat(row.Throttle_Input),
      Brake_Force_pct: parseFloat(row.Brake_Force_pct),
      Flaps_Position_deg: parseFloat(row.Flaps_Position_deg),
      Rudder_Deflection_deg: parseFloat(row.Rudder_Deflection_deg),
      Aileron_Deflection_deg: parseFloat(row.Aileron_Deflection_deg),
      Landing_Gear_Force_N: parseFloat(row.Landing_Gear_Force_N),
      Spoiler_Deployment_pct: parseFloat(row.Spoiler_Deployment_pct),
      Reverse_Thrust_pct: parseFloat(row.Reverse_Thrust_pct)
    }));

    console.log('Inserting flight data...');
    await Flight.insertMany(flights);
    console.log(`Successfully loaded ${flights.length} flight records`);

    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error loading flight data:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
} 