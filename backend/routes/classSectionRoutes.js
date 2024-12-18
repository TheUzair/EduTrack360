import express from 'express';
import {
  getClassSections,
  getClassSectionById,
  createClassSection,
  createMultipleClassSections, // Import the new bulk creation function
  updateClassSection,
  deleteClassSection,
} from '../controllers/classSectionController.js';

const router = express.Router();

// Get all class sections
router.get('/', getClassSections);

// Get a specific class section by ID
router.get('/:id', getClassSectionById);

// Create a new class section
router.post('/', createClassSection);

// Bulk create class sections
router.post('/bulk', createMultipleClassSections); // New route for bulk class section creation

// Update an existing class section
router.put('/:id', updateClassSection);

// Delete a class section
router.delete('/:id', deleteClassSection);

export default router;
