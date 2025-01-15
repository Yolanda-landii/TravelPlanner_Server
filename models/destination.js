const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: String,
  coordinates: { lat: Number, lon: Number },
});

module.exports = mongoose.model('Destination', DestinationSchema);
