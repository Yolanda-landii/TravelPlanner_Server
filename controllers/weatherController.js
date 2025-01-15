const axios = require('axios');

const getWeather = async (req, res) => {
    const { location } = req.params;
    const { destination } = req.query;

    try {
        const apiKey = process.env.WEATHER_API_KEY;

        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}&units=metric`);

        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${destination}&appid=${apiKey}&units=metric`);

        const forecast = [];
        let currentDate = new Date();
        let dayIndex = 0;

        // Loop through forecast data and group by day
        for (let i = 0; i < forecastResponse.data.list.length; i++) {
            const forecastItem = forecastResponse.data.list[i];
            const forecastDate = new Date(forecastItem.dt * 1000);

            if (forecastDate.getDate() === currentDate.getDate() + dayIndex) {
                if (forecast[dayIndex]) {
                    forecast[dayIndex].temperature.push(forecastItem.main.temp);
                    forecast[dayIndex].condition.push(forecastItem.weather[0].description);
                } else {
                    forecast[dayIndex] = {
                        date: forecastDate.toLocaleDateString(),
                        temperature: [forecastItem.main.temp],
                        condition: [forecastItem.weather[0].description],
                    };
                }
            } else {
                dayIndex++;
                if (dayIndex < 5) {
                    forecast.push({
                        date: forecastDate.toLocaleDateString(),
                        temperature: [forecastItem.main.temp],
                        condition: [forecastItem.weather[0].description],
                    });
                }
            }
        }

        // Constructing the weather data
        const weatherData = {
            locationName: destination,
            currentWeather: {
                temperature: weatherResponse.data.main.temp,
                humidity: weatherResponse.data.main.humidity,
                windSpeed: weatherResponse.data.wind.speed,
                condition: weatherResponse.data.weather[0].description,
            },
            forecast: forecast,
        };

        res.json(weatherData);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};

module.exports = { getWeather };
