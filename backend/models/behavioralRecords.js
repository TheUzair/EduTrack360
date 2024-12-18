import mongoose from 'mongoose';

const behavioralRecordSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile', required: true },
  incident_date: { type: Date, required: true },
  incident_type: { type: String, enum: ['Positive', 'Negative'], required: true },
  description: { type: String, required: true },
  action_taken: { type: String },
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StaffProfile' },
  resolution_date: { type: Date },
  follow_up_required: { type: Boolean, default: false },
  created_by: { type: String },
  updated_by: { type: String },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

export default mongoose.model('BehavioralRecord', behavioralRecordSchema);
