import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  Users, 
  Calendar, 
  Activity, 
  Clock,
  ChevronRight
} from 'lucide-react'; 
import {useNavigate} from 'react-router-dom';
import Dashboard from './Dashboard';

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Behavioral Records",
      description: "Track and manage student behavior and disciplinary records",
      link: "/behavioral-records",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Extracurricular Activities",
      description: "Monitor student participation in various activities and clubs",
      link: "/extracurricular-activities",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Student Awards",
      description: "Record and celebrate student achievements and recognition",
      link: "/student-awards",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Class Sections",
      description: "Manage class sections and student assignments",
      link: "/class-section",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Term Details",
      description: "Organize academic terms and schedules",
      link: "/term-details",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Access",
      description: "View recent activities and important updates",
      link: "/dashboard",
      color: "bg-teal-100 text-teal-600",
    },
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to Personal & Social Records
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              A comprehensive system to manage and track student development
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors" onClick={handleButtonClick}>
              
                Get Started
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors" onClick={handleButtonClick}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link 
              to={feature.link} 
              key={index}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className={`${feature.color} rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { label: "Total Students", value: "1,234+" },
              { label: "Activities Tracked", value: "50+" },
              { label: "Awards Given", value: "789" },
              { label: "Active Classes", value: "45" },
            ].map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About</h4>
              <p className="text-gray-400">
                Personal & Social Records System helps schools track and manage student development effectively.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Support</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@school.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 School Street</li>
              </ul>
            </div>
          </div>
         
        </div>
      </footer>
    </div>
  );
};

export default HomePage;