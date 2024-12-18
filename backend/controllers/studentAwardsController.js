import StudentAward from '../models/studentAwards.js';

// Get all student awards
export const getStudentAwards = async (req, res) => {
  try {
    const awards = await StudentAward.find();
    res.status(200).json(awards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific student award by ID
export const getStudentAwardById = async (req, res) => {
  try {
    const award = await StudentAward.findById(req.params.id);
    if (!award) return res.status(404).json({ message: 'Award not found' });
    res.status(200).json(award);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new student award
export const createStudentAward = async (req, res) => {
  try {
    const newAward = new StudentAward(req.body);
    const savedAward = await newAward.save();
    res.status(201).json(savedAward);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createMultipleStudentAwards = async (req, res) => {
  try {
    const awards = req.body; 
    const savedAwards = await StudentAward.insertMany(awards); 
    res.status(201).json(savedAwards);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update an existing student award
export const updateStudentAward = async (req, res) => {
  try {
    const updatedAward = await StudentAward.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedAward) return res.status(404).json({ message: 'Award not found' });
    res.status(200).json(updatedAward);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student award
export const deleteStudentAward = async (req, res) => {
  try {
    const deletedAward = await StudentAward.findByIdAndDelete(req.params.id);
    if (!deletedAward) return res.status(404).json({ message: 'Award not found' });
    res.status(200).json({ message: 'Award deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
