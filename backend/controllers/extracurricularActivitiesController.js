import ExtracurricularActivity from '../models/extracurricularActivities.js';
import mongoose from 'mongoose';

// Get all extracurricular activities
export const getExtracurricularActivities = async (req, res) => {
  try {
    const activities = await ExtracurricularActivity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific extracurricular activity by ID
export const getExtracurricularActivityById = async (req, res) => {
  try {
    const activity = await ExtracurricularActivity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new extracurricular activity
export const createExtracurricularActivity = async (req, res) => {
  try {
    // const activityData = {
    //   ...req.body,
    //   activity_id: new mongoose.Types.ObjectId().toString() // Generate unique ID
    // };
    const activityData = {...req.body}
    const newActivity = new ExtracurricularActivity(activityData);
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Create error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update an existing extracurricular activity
export const updateExtracurricularActivity = async (req, res) => {
  try {
    const updatedActivity = await ExtracurricularActivity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedActivity) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an extracurricular activity
export const deleteExtracurricularActivity = async (req, res) => {
  try {
    const deletedActivity = await ExtracurricularActivity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
