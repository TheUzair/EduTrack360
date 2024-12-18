import mongoose from 'mongoose';

const studentAwardSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile', required: true },
  award_name: { type: String, required: true },
  award_description: { type: String },
  date_awarded: { type: Date, required: true },
  awarding_body: { type: String },
  award_category: { type: String, enum: ['Academic', 'Extracurricular', 'Leadership', 'Community Service'] },
  created_by: { type: String },
  updated_by: { type: String },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

export default mongoose.model('StudentAward', studentAwardSchema);
