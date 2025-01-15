const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/destinations', require('./routes/destinationRoute'));
// app.use('/api/weather', require('./routes/weatherRoute'));
// app.use('/api/activities', require('./routes/ActivitiesRoute'));
// app.use('/api/favorites', require('./routes/weatherRoute'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
