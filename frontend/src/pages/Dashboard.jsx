import React from 'react';
import { 
  Users, 
  Award, 
  Calendar, 
  Activity, 
  TrendingUp, 
  AlertCircle,
  BookOpen,
  Bell
} from 'lucide-react';

const Dashboard = () => {
  // Sample data - Replace with actual data from your backend
  const recentActivities = [
    { id: 1, type: 'award', student: 'John Smith', action: 'received Academic Excellence Award', time: '2 hours ago' },
    { id: 2, type: 'behavioral', student: 'Emma Wilson', action: 'participated in community service', time: '3 hours ago' },
    { id: 3, type: 'extracurricular', student: 'Michael Brown', action: 'joined Basketball Team', time: '5 hours ago' },
    { id: 4, type: 'class', student: 'Sarah Davis', action: 'changed section from A to B', time: '1 day ago' },
  ];

  const stats = [
    { 
      title: 'Total Students',
      value: '1,234',
      icon: <Users className="w-6 h-6" />,
      change: '+5.2%',
      color: 'bg-blue-500'
    },
    {
      title: 'Active Awards',
      value: '156',
      icon: <Award className="w-6 h-6" />,
      change: '+2.4%',
      color: 'bg-green-500'
    },
    {
      title: 'Current Term',
      value: 'Term 2',
      icon: <Calendar className="w-6 h-6" />,
      change: '45 days left',
      color: 'bg-purple-500'
    },
    {
      title: 'Activities',
      value: '89',
      icon: <Activity className="w-6 h-6" />,
      change: '+12.5%',
      color: 'bg-orange-500'
    },
  ];

  const upcomingEvents = [
		{ id: 1, title: 'Annual Sports Day', date: '15 Mar 2024', type: 'Sports' },
		{ id: 2, title: 'Science Exhibition', date: '22 Mar 2024', type: 'Academic' },
		{ id: 3, title: 'Parent-Teacher Meeting', date: '28 Mar 2024', type: 'Meeting' },
	];
	
	// Calculate the next 3 months' dates
const today = new Date();

const getFutureDate = (monthsToAdd, daysToAdd) => {
    const futureDate = new Date(today);
    futureDate.setMonth(today.getMonth() + monthsToAdd);
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    return futureDate;
};

const formatDate = (date) => {
    return `${date.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]} ${date.getFullYear()}`;
};

// Pre-calculate the event dates
const eventDates = [
    getFutureDate(1, 5),  // Event 1
    getFutureDate(2, 9),  // Event 2
    getFutureDate(3, 0)   // Event 3
];

// Update event dates using the pre-calculated dates
upcomingEvents.forEach((event, index) => {
    if (index < eventDates.length) {
        event.date = formatDate(eventDates[index]);
    }
});

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  {stat.icon}
                </div>
                <span className="text-green-500 text-sm font-semibold">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-shrink-0 mr-4">
                    {activity.type === 'award' && <Award className="w-5 h-5 text-yellow-500" />}
                    {activity.type === 'behavioral' && <AlertCircle className="w-5 h-5 text-blue-500" />}
                    {activity.type === 'extracurricular' && <Activity className="w-5 h-5 text-green-500" />}
                    {activity.type === 'class' && <Users className="w-5 h-5 text-purple-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-semibold">{activity.student}</span>
                      {' '}{activity.action}
                    </p>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-gray-800">{event.title}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {event.date}
                  </div>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 mt-1">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {[
            { title: 'Add New Student', icon: <Users />, color: 'bg-blue-100 text-blue-600' },
            { title: 'Record Award', icon: <Award />, color: 'bg-yellow-100 text-yellow-600' },
            { title: 'Add Activity', icon: <Activity />, color: 'bg-green-100 text-green-600' },
            { title: 'View Reports', icon: <TrendingUp />, color: 'bg-purple-100 text-purple-600' },
          ].map((action, index) => (
            <button
              key={index}
              className="flex items-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${action.color} p-3 rounded-lg mr-3`}>
                {action.icon}
              </div>
              <span className="font-medium">{action.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;