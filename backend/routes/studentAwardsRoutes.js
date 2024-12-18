import express from 'express';
import {
  getStudentAwards,
  getStudentAwardById,
  createStudentAward,
  updateStudentAward,
  createMultipleStudentAwards,
  deleteStudentAward,
} from '../controllers/studentAwardsController.js';

const router = express.Router();

// Get all student awards
router.get('/', getStudentAwards);

// Get a specific student award by ID
router.get('/:id', getStudentAwardById);

// Create a new student award
router.post('/', createStudentAward);

// Bulk create student awards
router.post('/bulk', createMultipleStudentAwards); // New route for bulk awards creation


// Update an existing student award
router.put('/:id', updateStudentAward);

// Delete a student award
router.delete('/:id', deleteStudentAward);

export default router;
