const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
  service_name: {
    type: String,
    required: true,
  },
  environment: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

// Unique index: Only one combination of service_name, environment, and key can exist
ConfigSchema.index({ service_name: 1, environment: 1, key: 1 }, { unique: true });

module.exports = mongoose.model('Config', ConfigSchema);
