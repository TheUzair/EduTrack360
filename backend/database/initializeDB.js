import mongoose from 'mongoose';
import BehavioralRecord from '../models/behavioralRecords.js';
import ExtracurricularActivity from '../models/extracurricularActivities.js';
import StudentAward from '../models/studentAwards.js';
import ClassSection from '../models/classSection.js';
import TermDetail from '../models/termDetails.js';

const initializeDB = async () => {
  try {
    const dbName = 'personal-social-records';
    console.log(`Attempting to connect to the database: ${dbName}`);

    // Ensure we're connected to the database
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(`mongodb://localhost/${dbName}`);
    }
    console.log(`Successfully connected to the database: ${dbName}`);

    // Get the database instance
    // const db = mongoose.connection.db;
    
    // Log the current databases
    // const adminDb = db.admin();
    // const dbInfo = await adminDb.listDatabases();
    // console.log('Current databases:', dbInfo.databases.map(db => db.name));

    // Optionally, drop the database if needed (careful with this in production)
    // await db.dropDatabase();
    // console.log('Database cleared');

    // Create sample ObjectIds for references
    // const sampleStudentId = new mongoose.Types.ObjectId();
    // const sampleStaffId = new mongoose.Types.ObjectId();
    // const sampleTeacherId = new mongoose.Types.ObjectId();

    // // Create sample data for each collection
    // const sampleBehavioralRecord = new BehavioralRecord({
    //   student_id: sampleStudentId,
    //   incident_date: new Date(),
    //   incident_type: 'Positive',
    //   description: 'Participated actively in class discussion.',
    //   action_taken: 'Commended by teacher',
    //   staff_id: sampleStaffId,
    //   follow_up_required: false,
    //   created_by: 'admin',
    //   updated_by: 'admin'
    // });

    // const sampleExtracurricularActivity = new ExtracurricularActivity({
    //   student_id: sampleStudentId,
    //   activity_name: 'Basketball Tournament',
    //   activity_type: 'Sports',
    //   participation_date: new Date(),
    //   level_of_participation: 'School',
    //   award_received: 'Best Player',
    //   teacher_in_charge: sampleTeacherId,
    //   comments: 'Excellent performance.',
    //   created_by: 'admin',
    //   updated_by: 'admin'
    // });

    // const sampleStudentAward = new StudentAward({
    //   student_id: sampleStudentId,
    //   award_name: 'Best Student Award',
    //   award_description: 'Awarded for excellence in academics and leadership.',
    //   date_awarded: new Date(),
    //   awarding_body: 'School Board',
    //   award_category: 'Academic',
    //   created_by: 'admin',
    //   updated_by: 'admin'
    // });

    // const sampleClassSection = new ClassSection({
    //   class_name: 'Grade 10',
    //   section: 'A',
    //   teacher_id: sampleTeacherId,
    //   created_by: 'admin',
    //   updated_by: 'admin'
    // });

    // const sampleTermDetail = new TermDetail({
    //   term_name: 'Term 1',
    //   academic_year: '2024-2025',
    //   start_date: new Date('2024-06-01'),
    //   end_date: new Date('2024-12-01'),
    //   created_by: 'admin',
    //   updated_by: 'admin'
    // });

    // // Save data to collections
    //  // Save data to collections
		//  console.log('Saving sample data to collections...');
		//  await sampleBehavioralRecord.save();
		//  console.log('BehavioralRecord saved');
		//  await sampleExtracurricularActivity.save();
		//  console.log('ExtracurricularActivity saved');
		//  await sampleStudentAward.save();
		//  console.log('StudentAward saved');
		//  await sampleClassSection.save();
		//  console.log('ClassSection saved');
		//  await sampleTermDetail.save();
		//  console.log('TermDetail saved');
 
		// // After saving all collections
    // console.log('Sample data added successfully!');

    // List all collections in the database
    // const collections = await db.listCollections().toArray();
    // console.log('Collections in the database:');
    // collections.forEach(collection => console.log(collection.name));

    // // Log the updated list of databases
    // const updatedDbInfo = await adminDb.listDatabases();
    // console.log('Updated databases:', updatedDbInfo.databases.map(db => db.name));

    // // Log some stats about the database
    // const stats = await db.stats();
    // console.log('Database stats:', JSON.stringify(stats, null, 2));
  } catch (error) {
    console.error(`Error initializing the database: ${error.message}`);
    throw error; 
  }
};

export default initializeDB;