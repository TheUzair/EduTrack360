import express from 'express';
import {
  getTermDetails,
  getTermDetailById,
  createTermDetail,
  createBulkTermDetails, // Import the bulk insert function
  updateTermDetail,
  deleteTermDetail,
} from '../controllers/termDetailsController.js';

const router = express.Router();

// Get all term details
router.get('/', getTermDetails);

// Get a specific term detail by ID
router.get('/:id', getTermDetailById);

// Create a new term detail
router.post('/', createTermDetail);

// Bulk create term details
router.post('/bulk', createBulkTermDetails); // Add this route for bulk insert

// Update an existing term detail
router.put('/:id', updateTermDetail);

// Delete a term detail
router.delete('/:id', deleteTermDetail);

export default router;
