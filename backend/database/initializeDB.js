import mongoose from 'mongoose';

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
    const db = mongoose.connection.db;
    
    // Log the current databases
    const adminDb = db.admin();
    const dbInfo = await adminDb.listDatabases();
    console.log('Current databases:', dbInfo.databases.map(db => db.name));
 
    // List all collections in the database
    const collections = await db.listCollections().toArray();
    console.log('Collections in the database:');
    collections.forEach(collection => console.log(collection.name));

  } catch (error) {
    console.error(`Error initializing the database: ${error.message}`);
    throw error; 
  }
};

export default initializeDB;