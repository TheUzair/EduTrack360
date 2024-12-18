import mongoose from 'mongoose';

const classSectionSchema = new mongoose.Schema({
  class_name: { type: String, required: true },
  section: { type: String },
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TeacherProfile' },
  created_by: { type: String },
  updated_by: { type: String },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

export default mongoose.model('ClassSection', classSectionSchema);
