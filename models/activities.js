const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);
