import ClassSection from '../models/classSection.js';

// Get all class sections
export const getClassSections = async (req, res) => {
  try {
    const sections = await ClassSection.find();
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific class section by ID
export const getClassSectionById = async (req, res) => {
  try {
    const section = await ClassSection.findById(req.params.id);
    if (!section) return res.status(404).json({ message: 'Section not found' });
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new class section
export const createClassSection = async (req, res) => {
  try {
    const newSection = new ClassSection(req.body);
    const savedSection = await newSection.save();
    res.status(201).json(savedSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createMultipleClassSections = async (req, res) => {
  try {
    const sections = req.body;
    const savedSections = await ClassSection.insertMany(sections); 
    res.status(201).json(savedSections); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update an existing class section
export const updateClassSection = async (req, res) => {
  try {
    const updatedSection = await ClassSection.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedSection) return res.status(404).json({ message: 'Section not found' });
    res.status(200).json(updatedSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a class section
export const deleteClassSection = async (req, res) => {
  try {
    const deletedSection = await ClassSection.findByIdAndDelete(req.params.id);
    if (!deletedSection) return res.status(404).json({ message: 'Section not found' });
    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
