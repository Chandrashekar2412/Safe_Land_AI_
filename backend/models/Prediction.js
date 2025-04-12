const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  flightId: {
    type: String,
    required: true
  },
  prediction: {
    type: String,
    required: true,
    enum: ['Hard Landing', 'Soft Landing']
  },
  probability: {
    type: String,
    required: true
  },
  inputData: {
    type: Object,
    required: true
  },
  shapContributions: {
    type: Object,
    required: true
  },
  correctiveMeasures: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Prediction', predictionSchema); 