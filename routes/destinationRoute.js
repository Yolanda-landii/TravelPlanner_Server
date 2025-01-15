const express = require('express');
const { searchDestinations } = require('../controllers/destinationController');
const router = express.Router();

router.get('/search', searchDestinations);

module.exports = router;
