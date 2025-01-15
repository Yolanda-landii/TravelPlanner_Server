const axios = require('axios');

const searchDestinations = async (req, res) => {
  const { query } = req.query; 
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.WEATHER_API_KEY}`
    );
    res.json(response.data); // Return the weather data
  } catch (error) {
    console.error(error.message); // Log error for debugging
    res.status(500).json({ message: 'Error fetching destinations' });
  }
};

module.exports = { searchDestinations };
