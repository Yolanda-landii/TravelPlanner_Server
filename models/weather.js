const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  currentWeather: {
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    windSpeed: { type: Number, required: true },
    condition: { type: String, required: true },
  },
  forecast: [
    {
      date: { type: String, required: true },
      temperature: { type: Number, required: true },
      condition: { type: String, required: true },
    },
  ],
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Weather', WeatherSchema);
