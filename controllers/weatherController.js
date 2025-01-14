const axios = require('axios');

const getWeather = async (req, res) => {
    const { location } = req.params;
    const { destination } = req.query; 

    try {
       
        const apiKey = process.env.WEATHER_API_KEY;
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}&units=metric`);
        
        // Constructing the weather data
        const weatherData = {
            locationName: destination, 
            currentWeather: {
                temperature: weatherResponse.data.main.temp,
                humidity: weatherResponse.data.main.humidity,
                windSpeed: weatherResponse.data.wind.speed,
                condition: weatherResponse.data.weather[0].description,
            },
            forecast: [] 
        };

        res.json(weatherData); 
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};

module.exports = { getWeather };
