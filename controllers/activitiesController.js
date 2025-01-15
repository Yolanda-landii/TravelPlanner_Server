const axios = require('axios');
const Activity = require('../models/activities');

const EXTERNAL_API_URL = 'https://api.opentripmap.com/0.1/en/places/radius';
const API_KEY = process.env.OPENTRIPMAP_API_KEY;

// Fetch all activities from the database
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Failed to fetch activities' });
  }
};

// Add a new activity to the database
const addActivity = async (req, res) => {
  try {
    const { name, location, description } = req.body;

    if (!name || !location || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newActivity = new Activity({ name, location, description });
    await newActivity.save();
    res.status(201).json({ message: 'Activity added successfully', newActivity });
  } catch (error) {
    console.error('Error adding activity:', error);
    res.status(500).json({ message: 'Failed to add activity' });
  }
};

// Update an existing activity by ID
const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, description } = req.body;

    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { name, location, description },
      { new: true } // Return the updated document
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json({ message: 'Activity updated successfully', updatedActivity });
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ message: 'Failed to update activity' });
  }
};

// Delete an activity by ID
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedActivity = await Activity.findByIdAndDelete(id);

    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json({ message: 'Activity deleted successfully', deletedActivity });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ message: 'Failed to delete activity' });
  }
};

// Fetch activities from an external API
const fetchExternalActivities = async (req, res) => {
    const { lat, lon, radius = 10000 } = req.query;
  
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }
  
    try {
      const response = await axios.get(EXTERNAL_API_URL, {
        params: {
          apikey: API_KEY,
          lat,
          lon,
          radius,
          limit: 20,
        },
      });
  
      const activities = response.data.features.map((place) => ({
        name: place.properties.name,
        location: `${place.geometry.coordinates[1]}, ${place.geometry.coordinates[0]}`,
        description: place.properties.kinds || 'No description available',
      }));
  
      res.status(200).json(activities);
    } catch (error) {
      console.error('Error fetching external activities:', error);
      res.status(500).json({ message: 'Failed to fetch external activities' });
    }
  };

module.exports = {
  getActivities,
  addActivity,
  updateActivity,
  deleteActivity,
  fetchExternalActivities,
};
