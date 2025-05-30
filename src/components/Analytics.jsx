import React, { useState } from 'react';

const Analytics = ({ isMobile }) => {
  // State for selected time range
  const [timeRange, setTimeRange] = useState('week'); // 'week', 'month', 'semester'
  
  // Sample data
  const productivityData = {
    week: [65, 78, 55, 89, 72, 45, 80],
    month: [60, 70, 68, 72, 75, 63, 80, 75, 65, 72, 75, 78, 68, 70, 65, 78, 55, 89, 72, 45, 65, 80, 90, 85, 78, 65, 55, 70, 80, 85],
    semester: [55, 60, 62, 65, 68, 70, 72, 75, 78, 80, 82, 85, 84, 80, 78, 75, 74, 72, 70, 68, 65, 62, 60, 65, 68, 72, 75, 80, 85, 90]
  };
  
  const taskCompletionData = {
    week: [12, 8, 15, 10, 14, 9, 18],
    month: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20) + 5),
    semester: Array.from({ length: 30 }, () => Math.floor(Math.random() * 25) + 10)
  };
  
  const focusSessionData = {
    week: [3.5, 2.0, 4.0, 3.0, 2.5, 1.0, 3.5],
    month: Array.from({ length: 30 }, () => Number((Math.random() * 4 + 1).toFixed(1))),
    semester: Array.from({ length: 30 }, () => Number((Math.random() * 5 + 1).toFixed(1)))
  };
  
  const coursePerformance = [
    { course: 'History 101', tasks: 12, completed: 8, onTime: 7, late: 1, avgFocusTime: 2.5 },
    { course: 'Calculus II', tasks: 15, completed: 10, onTime: 8, late: 2, avgFocusTime: 3.2 },
    { course: 'Business Ethics', tasks: 8, completed: 7, onTime: 6, late: 1, avgFocusTime: 2.0 },
    { course: 'Psychology', tasks: 10, completed: 6, onTime: 5, late: 1, avgFocusTime: 2.8 },
    { course: 'Computer Science', tasks: 14, completed: 12, onTime: 10, late: 2, avgFocusTime: 3.5 },
    { course: 'Chemistry', tasks: 9, completed: 5, onTime: 4, late: 1, avgFocusTime: 2.2 },
    { course: 'English Literature', tasks: 7, completed: 5, onTime: 5, late: 0, avgFocusTime: 1.8 }
  ];
  
  const productivityByTimeOfDay = [
    { time: '6 AM - 9 AM', productivity: 85 },
    { time: '9 AM - 12 PM', productivity: 92 },
    { time: '12 PM - 3 PM', productivity: 70 },
    { time: '3 PM - 6 PM', productivity: 78 },
    { time: '6 PM - 9 PM', productivity: 88 },
    { time: '9 PM - 12 AM', productivity: 65 }
  ];
  
  const procrastinationInsights = {
    startTimes: {
      early: '35%',
      onTime: '42%',
      close: '23%'
    },
    taskTypes: [
      { type: 'Reading', procrastination: 'High' },
      { type: 'Problem Sets', procrastination: 'Medium' },
      { type: 'Essays', procrastination: 'High' },
      { type: 'Quizzes', procrastination: 'Low' },
      { type: 'Projects', procrastination: 'Medium' }
    ],
    improvement: '+15%'
  };
  
  // Generate labels based on time range
  const getLabels = () => {
    if (timeRange === 'week') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else if (timeRange === 'month') {
      return Array.from({ length: 30 }, (_, i) => `${i + 1}`);
    } else {
      return Array.from({ length: 30 }, (_, i) => `${i + 1}`);
    }
  };
  
  const renderChart = (data, color, showArea = false) => {
    const maxValue = Math.max(...data) * 1.2; // Add some padding
    const chartHeight = 120;
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = chartHeight - (value / maxValue) * chartHeight;
      return `${x},${y}`;
    }).join(' ');
    
    // Generate area path if requested
    let areaPath = '';
    if (showArea) {
      const startPoint = `0,${chartHeight}`;
      const endPoint = `100,${chartHeight}`;
      areaPath = `M${startPoint} L${points.split(' ').map(point => `${point.split(',')[0]},${point.split(',')[1]}`).join(' L')} L${endPoint} Z`;
    }
    
    const labels = getLabels();
    
    return (
      <div className="relative w-full h-32">
        {/* Y-axis line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
        
        {/* X-axis line */}
        <div className="absolute left-0 bottom-0 right-0 h-px bg-gray-200"></div>
        
        {/* Chart area */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 120" preserveAspectRatio="none">
          {showArea && (
            <path 
              d={areaPath} 
              fill={color} 
              fillOpacity="0.2" 
            />
          )}
          <polyline 
            points={points} 
            fill="none" 
            stroke={color} 
            strokeWidth="2"
          />
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = chartHeight - (value / maxValue) * chartHeight;
            return (
              <circle 
                key={index} 
                cx={x} 
                cy={y} 
                r="2" 
                fill="white"
                stroke={color}
                strokeWidth="1"
              />
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="absolute left-0 right-0 bottom-0 flex justify-between pt-2 translate-y-full text-xs text-gray-500">
          {labels.filter((_, i) => {
            // For longer ranges, show fewer labels to avoid overcrowding
            const skipFactor = timeRange === 'week' ? 1 : 5;
            return i % skipFactor === 0 || i === labels.length - 1;
          }).map((label, index) => (
            <div key={index} className="text-center">{label}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`py-6 ${isMobile ? 'px-4' : 'px-8 ml-16'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-600">Track your productivity and study patterns</p>
        </div>
        
        <div className="flex border rounded-md">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 text-sm font-medium ${
              timeRange === 'week'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 text-sm font-medium ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('semester')}
            className={`px-3 py-1 text-sm font-medium ${
              timeRange === 'semester'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Semester
          </button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Productivity Score */}
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500">PRODUCTIVITY SCORE</h2>
          </div>
          <div className="mb-1 text-3xl font-bold text-gray-800">
            {productivityData[timeRange][productivityData[timeRange].length - 1]}%
          </div>
          <div className="flex items-center mb-4 text-sm">
            <span className="text-green-600 font-medium">↑ 12%</span>
            <span className="text-gray-500 ml-1">vs previous {timeRange}</span>
          </div>
          {renderChart(productivityData[timeRange], '#3B82F6', true)}
        </div>
        
        {/* Tasks Completed */}
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500">TASKS COMPLETED</h2>
          </div>
          <div className="mb-1 text-3xl font-bold text-gray-800">
            {taskCompletionData[timeRange].reduce((a, b) => a + b, 0)} tasks
          </div>
          <div className="flex items-center mb-4 text-sm">
            <span className="text-green-600 font-medium">↑ 8%</span>
            <span className="text-gray-500 ml-1">vs previous {timeRange}</span>
          </div>
          {renderChart(taskCompletionData[timeRange], '#10B981')}
        </div>
        
        {/* Focus Session Hours */}
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500">FOCUS SESSION HOURS</h2>
          </div>
          <div className="mb-1 text-3xl font-bold text-gray-800">
            {focusSessionData[timeRange].reduce((a, b) => a + b, 0).toFixed(1)} hours
          </div>
          <div className="flex items-center mb-4 text-sm">
            <span className="text-green-600 font-medium">↑ 15%</span>
            <span className="text-gray-500 ml-1">vs previous {timeRange}</span>
          </div>
          {renderChart(focusSessionData[timeRange], '#8B5CF6')}
        </div>
      </div>
      
      {/* Course Performance */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Course Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 font-medium">Course</th>
                <th className="py-2 font-medium">Tasks</th>
                <th className="py-2 font-medium">Completion Rate</th>
                <th className="py-2 font-medium">On-time %</th>
                <th className="py-2 font-medium">Avg. Focus Time</th>
              </tr>
            </thead>
            <tbody>
              {coursePerformance.map((course, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    <div className="flex items-center">
                      <div 
                        className={`w-3 h-3 mr-2 rounded-full ${
                          index === 0 ? 'bg-red-500' : 
                          index === 1 ? 'bg-blue-500' : 
                          index === 2 ? 'bg-green-500' : 
                          index === 3 ? 'bg-purple-500' : 
                          index === 4 ? 'bg-yellow-500' : 
                          index === 5 ? 'bg-indigo-500' : 
                          'bg-pink-500'
                        }`}>
                      </div>
                      <span className="font-medium">{course.course}</span>
                    </div>
                  </td>
                  <td className="py-3">{course.completed}/{course.tasks}</td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-24 h-2 mr-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-500 rounded-full" 
                          style={{ width: `${(course.completed / course.tasks) * 100}%` }}>
                        </div>
                      </div>
                      <span>{Math.round((course.completed / course.tasks) * 100)}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-24 h-2 mr-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            (course.onTime / course.completed) > 0.9 ? 'bg-green-500' : 
                            (course.onTime / course.completed) > 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(course.onTime / course.completed) * 100}%` }}>
                        </div>
                      </div>
                      <span>{Math.round((course.onTime / course.completed) * 100)}%</span>
                    </div>
                  </td>
                  <td className="py-3">{course.avgFocusTime} hrs/task</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className={`mt-6 grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {/* Productivity by Time of Day */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Productivity by Time of Day</h2>
          <div className="space-y-3">
            {productivityByTimeOfDay.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-24 text-sm text-gray-600">{item.time}</div>
                <div className="flex-1">
                  <div className="relative w-full h-6 bg-gray-100 rounded-full">
                    <div 
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                      style={{ width: `${item.productivity}%` }}>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-end pr-2">
                      <span className="text-xs font-medium text-gray-800">{item.productivity}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-500 italic">
            Your optimal study time appears to be between 9 AM and 12 PM.
          </div>
        </div>
        
        {/* Procrastination Insights */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Procrastination Insights</h2>
          
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-gray-700">When You Start Tasks</h3>
            <div className="flex">
              <div className="flex-1 bg-green-100 h-10 flex items-center justify-center rounded-l">
                <span className="text-sm font-medium text-green-800">{procrastinationInsights.startTimes.early} Early</span>
              </div>
              <div className="flex-1 bg-yellow-100 h-10 flex items-center justify-center">
                <span className="text-sm font-medium text-yellow-800">{procrastinationInsights.startTimes.onTime} On Time</span>
              </div>
              <div className="flex-1 bg-red-100 h-10 flex items-center justify-center rounded-r">
                <span className="text-sm font-medium text-red-800">{procrastinationInsights.startTimes.close} Close to Deadline</span>
              </div>
            </div>
          </div>
          
          <h3 className="mb-2 text-sm font-medium text-gray-700">Procrastination by Task Type</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-1 font-medium">Task Type</th>
                <th className="py-1 font-medium">Procrastination Level</th>
              </tr>
            </thead>
            <tbody>
              {procrastinationInsights.taskTypes.map((item, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-2">{item.type}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.procrastination === 'High' ? 'bg-red-100 text-red-800' :
                      item.procrastination === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.procrastination}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-4 text-sm text-green-600">
            <span className="font-medium">Improvement: {procrastinationInsights.improvement}</span> reduction in last-minute task completion
          </div>
        </div>
      </div>
      
      {/* Suggestions */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Personalized Insights & Suggestions</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-blue-800">Study Time Optimization</h3>
                <p className="mt-1 text-sm text-blue-700">
                  Your productivity peaks between 9 AM and 12 PM. Consider scheduling more challenging tasks during this time window.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg bg-purple-50 border-purple-200">
            <div className="flex items-start">
              <div className="p-2 bg-purple-100 rounded-full mr-3">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-purple-800">Task Pattern Recognition</h3>
                <p className="mt-1 text-sm text-purple-700">
                  You tend to procrastinate on reading assignments and essays. Try breaking these into smaller 25-minute focus sessions with rewards after completion.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg bg-green-50 border-green-200">
            <div className="flex items-start">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-green-800">Progress Recognition</h3>
                <p className="mt-1 text-sm text-green-700">
                  You've improved your procrastination habits by 15% this semester. Keep tracking your progress and celebrating small wins!
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
            <div className="flex items-start">
              <div className="p-2 bg-yellow-100 rounded-full mr-3">
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-yellow-800">Chemistry Focus Needed</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Chemistry has your lowest task completion rate (56%). Consider allocating more focus sessions to this subject or seeking additional help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Export Options */}
      <div className="mt-6 flex justify-end">
        <button className="flex items-center px-4 py-2 mr-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Export as PDF
        </button>
        <button className="flex items-center px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
          </svg>
          Share Report
        </button>
      </div>
    </div>
  );
};

export default Analytics;