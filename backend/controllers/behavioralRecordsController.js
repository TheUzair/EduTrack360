import BehavioralRecord from '../models/behavioralRecords.js';
import mongoose from 'mongoose';

// Get all behavioral records
export const getBehavioralRecords = async (req, res) => {
  try {
    const records = await BehavioralRecord.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific behavioral record by ID
export const getBehavioralRecordById = async (req, res) => {
  try {
    const record = await BehavioralRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new behavioral record
export const createBehavioralRecord = async (req, res) => {
  try {
    const { student_id, staff_id, ...otherFields } = req.body;

    // Helper function to validate and convert ID
    const convertToObjectId = (id, fieldName) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ${fieldName} format`);
      }
      return mongoose.Types.ObjectId.createFromHexString(id);
    };

    const recordData = {
      ...otherFields,
      student_id: student_id ? convertToObjectId(student_id, 'student_id') : undefined,
      staff_id: staff_id ? convertToObjectId(staff_id, 'staff_id') : undefined
    };

    const newRecord = new BehavioralRecord(recordData);
    const savedRecord = await newRecord.save();
    
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ 
      message: error.message,
      type: error.name
    });
  }
};
// Update an existing behavioral record
export const updateBehavioralRecord = async (req, res) => {
  try {
    const updatedRecord = await BehavioralRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedRecord) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a behavioral record
export const deleteBehavioralRecord = async (req, res) => {
  try {
    const deletedRecord = await BehavioralRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
