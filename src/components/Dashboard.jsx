import React from 'react';

const Dashboard = ({ isMobile }) => {
  // Sample data
  const todayTasks = [
    { id: 1, title: 'Read Chapter 3', course: 'History 101', priority: 'high', dueTime: '11:59 PM' },
    { id: 2, title: 'Complete Math Problem Set', course: 'Calculus II', priority: 'medium', dueTime: '3:00 PM' },
    { id: 3, title: 'Group Project Meeting', course: 'Business Ethics', priority: 'high', dueTime: '4:30 PM' }
  ];
  
  const upcomingTasks = [
    { id: 4, title: 'Research Paper Draft', course: 'Psychology', priority: 'medium', dueDate: 'Tomorrow' },
    { id: 5, title: 'Midterm Exam', course: 'Computer Science', priority: 'high', dueDate: 'In 2 days' }
  ];
  
  const courses = [
    { id: 1, name: 'History 101', color: 'bg-red-500', tasksCount: 4, completedCount: 1 },
    { id: 2, name: 'Calculus II', color: 'bg-blue-500', tasksCount: 7, completedCount: 3 },
    { id: 3, name: 'Business Ethics', color: 'bg-green-500', tasksCount: 5, completedCount: 2 },
    { id: 4, name: 'Psychology', color: 'bg-purple-500', tasksCount: 3, completedCount: 0 },
    { id: 5, name: 'Computer Science', color: 'bg-yellow-500', tasksCount: 6, completedCount: 4 }
  ];
  
  return (
    <div className={`py-6 ${isMobile ? 'px-4' : 'px-8 ml-16'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Monday, June 3, 2025</p>
        </div>
        <button className="flex items-center px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          New Task
        </button>
      </div>
      
      {/* Progress Summary */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">Weekly Progress</h2>
        <div className="flex mb-2">
          <div className="flex-1">
            <p className="text-sm text-gray-600">Tasks Completed</p>
            <p className="text-2xl font-bold text-gray-800">14/25</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Study Hours</p>
            <p className="text-2xl font-bold text-gray-800">18.5</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Focus Score</p>
            <p className="text-2xl font-bold text-gray-800">8.2/10</p>
          </div>
        </div>
        <div className="w-full h-2 mb-1 bg-gray-200 rounded-full">
          <div className="h-2 bg-blue-600 rounded-full" style={{ width: '56%' }}></div>
        </div>
        <p className="text-xs text-gray-500 text-right">56% of weekly goal completed</p>
      </div>
      
      {/* Today's Tasks */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Today's Tasks</h2>
          <a href="#" className="text-sm text-blue-600 hover:underline">See All</a>
        </div>
        <ul className="space-y-2">
          {todayTasks.map(task => (
            <li key={task.id} className="flex items-center p-3 bg-gray-50 border rounded-lg">
              <input type="checkbox" className="w-5 h-5 mr-3 border-2 border-gray-300 rounded" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{task.title}</h3>
                <div className="flex items-center">
                  <span className={`inline-block w-2 h-2 mr-1 ${
                    task.course === 'History 101' ? 'bg-red-500' :
                    task.course === 'Calculus II' ? 'bg-blue-500' : 
                    task.course === 'Business Ethics' ? 'bg-green-500' : 'bg-purple-500'
                  } rounded-full`}></span>
                  <span className="text-xs text-gray-500">{task.course}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.priority}
                </span>
                <span className="mt-1 text-xs text-gray-500">{task.dueTime}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Upcoming Tasks */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming</h2>
          <a href="#" className="text-sm text-blue-600 hover:underline">See All</a>
        </div>
        <ul className="space-y-2">
          {upcomingTasks.map(task => (
            <li key={task.id} className="flex items-center p-3 bg-gray-50 border rounded-lg">
              <input type="checkbox" className="w-5 h-5 mr-3 border-2 border-gray-300 rounded" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{task.title}</h3>
                <div className="flex items-center">
                  <span className={`inline-block w-2 h-2 mr-1 ${
                    task.course === 'Psychology' ? 'bg-purple-500' : 'bg-yellow-500'
                  } rounded-full`}></span>
                  <span className="text-xs text-gray-500">{task.course}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.priority}
                </span>
                <span className="mt-1 text-xs text-gray-500">{task.dueDate}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Course Overview */}
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Course Overview</h2>
          <a href="#" className="text-sm text-blue-600 hover:underline">Manage Courses</a>
        </div>
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
          {courses.map(course => (
            <div key={course.id} className="p-3 border rounded-lg">
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 mr-2 rounded-full ${course.color}`}></div>
                <h3 className="font-medium text-gray-800">{course.name}</h3>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{course.completedCount}/{course.tasksCount} tasks</span>
                <span>{Math.round((course.completedCount / course.tasksCount) * 100)}% complete</span>
              </div>
              <div className="w-full h-1 mt-1 bg-gray-200 rounded-full">
                <div 
                  className={`h-1 rounded-full ${course.color}`} 
                  style={{ width: `${Math.round((course.completedCount / course.tasksCount) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;