import mongoose from 'mongoose';

const termDetailSchema = new mongoose.Schema({
  term_name: { type: String, required: true },
  academic_year: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  created_by: { type: String },
  updated_by: { type: String },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

export default mongoose.model('TermDetail', termDetailSchema);
