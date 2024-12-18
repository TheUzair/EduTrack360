import TermDetail from '../models/termDetails.js';

// Get all term details
export const getTermDetails = async (req, res) => {
  try {
    const terms = await TermDetail.find();
    res.status(200).json(terms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific term detail by ID
export const getTermDetailById = async (req, res) => {
  try {
    const term = await TermDetail.findById(req.params.id);
    if (!term) return res.status(404).json({ message: 'Term not found' });
    res.status(200).json(term);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new term detail
export const createTermDetail = async (req, res) => {
  try {
    const newTerm = new TermDetail(req.body);
    const savedTerm = await newTerm.save();
    res.status(201).json(savedTerm);
  } catch (error) {
    console.error("Validation error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Bulk create term details
export const createBulkTermDetails = async (req, res) => {
  try {
    const terms = req.body; // Assuming the body is an array of term details
    const savedTerms = await TermDetail.insertMany(terms); // Bulk insert
    res.status(201).json(savedTerms); // Send back the inserted terms
  } catch (error) {
    console.error("Error inserting bulk terms:", error.message);
    res.status(400).json({ message: error.message });
  }
};


export const updateTermDetail = async (req, res) => {
  try {
    const updatedTerm = await TermDetail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTerm) return res.status(404).json({ message: 'Term not found' });
    res.status(200).json(updatedTerm);
  } catch (error) {
    console.error("Validation error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Delete a term detail
export const deleteTermDetail = async (req, res) => {
  try {
    const deletedTerm = await TermDetail.findByIdAndDelete(req.params.id);
    if (!deletedTerm) return res.status(404).json({ message: 'Term not found' });
    res.status(200).json({ message: 'Term deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
