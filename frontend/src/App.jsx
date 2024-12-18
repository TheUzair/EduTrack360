import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BehavioralRecordsPage from './pages/BehavioralRecordsPage';
import ExtracurricularActivitiesPage from './pages/ExtracurricularActivitiesPage';
import StudentAwardsPage from './pages/StudentAwardsPage';
import ClassSectionPage from './pages/ClassSectionPage';
import TermDetailsPage from './pages/TermDetailsPage';
import Dashboard from './pages/Dashboard';
import { Toaster } from './components/ui/toaster';
import './index.css';
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/behavioral-records" element={<BehavioralRecordsPage />} />
            <Route path="/extracurricular-activities" element={<ExtracurricularActivitiesPage />} />
            <Route path="/student-awards" element={<StudentAwardsPage />} />
            <Route path="/class-section" element={<ClassSectionPage />} />
            <Route path="/term-details" element={<TermDetailsPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
