import express from 'express';
import connectDB from './config/connectDB.js'; // Correct path
import dotenv from 'dotenv';
import cors from 'cors';
import behavioralRecordsRoutes from './routes/behavioralRecordsRoutes.js';
import extracurricularActivitiesRoutes from './routes/extracurricularActivitiesRoutes.js';
import studentAwardsRoutes from './routes/studentAwardsRoutes.js';
import classSectionRoutes from './routes/classSectionRoutes.js';
import termDetailsRoutes from './routes/termDetailsRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Connect to the database and initialize collections
connectDB();

// Routes
app.use('/api/behavioral-records', behavioralRecordsRoutes);
app.use('/api/extracurricular-activities', extracurricularActivitiesRoutes);
app.use('/api/student-awards', studentAwardsRoutes);
app.use('/api/class-section', classSectionRoutes);
app.use('/api/term-details', termDetailsRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Welcome to the Personal and Social Records API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
