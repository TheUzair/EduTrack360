import mongoose from 'mongoose';

const extracurricularActivitySchema = new mongoose.Schema({
  activity_id: {
    type: String,
    unique: true,
    required: true,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile', required: true },
  activity_name: { type: String, required: true },
  activity_type: { type: String, enum: ['Sports', 'Arts', 'Clubs', 'Competitions'], required: true },
  participation_date: { type: Date, required: true },
  level_of_participation: { type: String, enum: ['School', 'District', 'State', 'National'], required: true },
  award_received: { type: String },
  teacher_in_charge: { type: mongoose.Schema.Types.ObjectId, ref: 'StaffProfile' },
  comments: { type: String },
  created_by: { type: String },
  updated_by: { type: String },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

export default mongoose.model('ExtracurricularActivity', extracurricularActivitySchema);
