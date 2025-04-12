const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  Flight_ID: {
    type: String,
    required: true,
    unique: true
  },
  Altitude_AGL_ft: {
    type: Number,
    required: true
  },
  Vertical_Speed_fpm: {
    type: Number,
    required: true
  },
  Touchdown_Velocity_fps: {
    type: Number,
    required: true
  },
  G_Force: {
    type: Number,
    required: true
  },
  Wind_Speed_kts: {
    type: Number,
    required: true
  },
  Crosswind_Component_kts: {
    type: Number,
    required: true
  },
  Visibility_miles: {
    type: Number,
    required: true
  },
  Runway_Condition: {
    type: String,
    required: true,
    enum: ['Dry', 'Wet', 'Slippery']
  },
  Throttle_Input: {
    type: Number,
    required: true
  },
  Brake_Force_pct: {
    type: Number,
    required: true
  },
  Flaps_Position_deg: {
    type: Number,
    required: true
  },
  Rudder_Deflection_deg: {
    type: Number,
    required: true
  },
  Aileron_Deflection_deg: {
    type: Number,
    required: true
  },
  Landing_Gear_Force_N: {
    type: Number,
    required: true
  },
  Spoiler_Deployment_pct: {
    type: Number,
    required: true
  },
  Reverse_Thrust_pct: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema); 