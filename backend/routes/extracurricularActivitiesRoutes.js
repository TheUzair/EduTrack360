import express from 'express';
import {
  getExtracurricularActivities,
  getExtracurricularActivityById,
  createExtracurricularActivity,
  updateExtracurricularActivity,
  deleteExtracurricularActivity,
} from '../controllers/extracurricularActivitiesController.js';

const router = express.Router();

// Get all extracurricular activities
router.get('/', getExtracurricularActivities);

// Get a specific extracurricular activity by ID
router.get('/:id', getExtracurricularActivityById);

// Create a new extracurricular activity
router.post('/', createExtracurricularActivity);

// Update an existing extracurricular activity
router.put('/:id', updateExtracurricularActivity);

// Delete an extracurricular activity
router.delete('/:id', deleteExtracurricularActivity);

export default router;
