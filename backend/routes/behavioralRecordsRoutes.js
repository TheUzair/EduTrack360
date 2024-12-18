import express from 'express';
import {
  getBehavioralRecords,
  getBehavioralRecordById,
  createBehavioralRecord,
  updateBehavioralRecord,
  deleteBehavioralRecord,
} from '../controllers/behavioralRecordsController.js';

const router = express.Router();

// Get all behavioral records
router.get('/', getBehavioralRecords);

// Get a specific behavioral record by Mongo's ID
router.get('/:id', getBehavioralRecordById);

// Create a new behavioral record
router.post('/', createBehavioralRecord);

// Update an existing behavioral record
router.put('/:id', updateBehavioralRecord);

// Delete a behavioral record
router.delete('/:id', deleteBehavioralRecord);

export default router;
