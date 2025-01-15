const express = require('express');
const router = express.Router();
const { getActivities, addActivity, updateActivity, deleteActivity, fetchActivitiesByWeather } = require('../controllers/activitiesController');

// Other activity routes
router.get('/', getActivities);
router.post('/', addActivity);
router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);

// External API route
router.get('/external', fetchActivitiesByWeather);

module.exports = router;
