import React, { useState } from 'react';

const CourseManagement = ({ isMobile }) => {
  // Sample course data
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      name: 'History 101', 
      color: 'bg-red-500', 
      instructor: 'Dr. Sarah Miller', 
      schedule: 'MWF 9:00 AM - 10:30 AM',
      location: 'Wheeler Hall 120',
      tasks: 12,
      completed: 8,
      progress: 67, // percentage
      nextDeadline: 'Research Paper, June 10',
      credits: 3
    },
    { 
      id: 2, 
      name: 'Calculus II', 
      color: 'bg-blue-500', 
      instructor: 'Prof. James Chen', 
      schedule: 'MWF 11:00 AM - 12:30 PM',
      location: 'Math Building 305',
      tasks: 15,
      completed: 10,
      progress: 67, // percentage
      nextDeadline: 'Problem Set 7, June 5',
      credits: 4
    },
    { 
      id: 3, 
      name: 'Business Ethics', 
      color: 'bg-green-500', 
      instructor: 'Dr. Michael Rodriguez', 
      schedule: 'TR 1:00 PM - 2:30 PM',
      location: 'Business Hall 220',
      tasks: 8,
      completed: 7,
      progress: 88, // percentage
      nextDeadline: 'Group Presentation, June 15',
      credits: 3
    },
    { 
      id: 4, 
      name: 'Psychology', 
      color: 'bg-purple-500', 
      instructor: 'Dr. Emily Johnson', 
      schedule: 'MW 9:00 AM - 10:30 AM',
      location: 'Social Science Building 110',
      tasks: 10,
      completed: 6,
      progress: 60, // percentage
      nextDeadline: 'Research Paper Draft, June 8',
      credits: 3
    },
    { 
      id: 5, 
      name: 'Computer Science', 
      color: 'bg-yellow-500', 
      instructor: 'Prof. Robert Garcia', 
      schedule: 'WF 2:00 PM - 3:30 PM',
      location: 'Tech Center 405',
      tasks: 14,
      completed: 12,
      progress: 86, // percentage
      nextDeadline: 'Final Project, June 20',
      credits: 4
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    instructor: '',
    schedule: '',
    location: '',
    color: 'bg-gray-500',
    credits: 3
  });

  // Available colors for courses
  const colorOptions = [
    { name: 'Red', value: 'bg-red-500' },
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Green', value: 'bg-green-500' },
    { name: 'Purple', value: 'bg-purple-500' },
    { name: 'Yellow', value: 'bg-yellow-500' },
    { name: 'Indigo', value: 'bg-indigo-500' },
    { name: 'Pink', value: 'bg-pink-500' },
    { name: 'Teal', value: 'bg-teal-500' }
  ];

  // Credit hours options
  const creditOptions = [1, 2, 3, 4, 5];

  // Total credits
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  // Handle input changes for new course
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: value
    });
  };

  // Handle form submission for adding a new course
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add the new course to the list
    setCourses([
      ...courses,
      {
        id: courses.length + 1,
        ...newCourse,
        tasks: 0,
        completed: 0,
        progress: 0,
        nextDeadline: 'None'
      }
    ]);
    
    // Reset form
    setNewCourse({
      name: '',
      instructor: '',
      schedule: '',
      location: '',
      color: 'bg-gray-500',
      credits: 3
    });
    
    // Hide form
    setShowAddForm(false);
  };

  return (
    <div className={`py-6 ${isMobile ? 'px-4' : 'px-8 ml-16'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
          <p className="text-gray-600">Spring Semester 2025</p>
        </div>
        
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Course
        </button>
      </div>
      
      {/* Credits Summary */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-500">TOTAL CREDITS</h2>
            <p className="text-2xl font-bold text-gray-800">{totalCredits}</p>
          </div>
          
          <div className="flex space-x-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-500">COURSES</h2>
              <p className="text-2xl font-bold text-gray-800">{courses.length}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-semibold text-gray-500">AVG. PROGRESS</h2>
              <p className="text-2xl font-bold text-gray-800">
                {Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Grid */}
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {courses.map(course => (
          <div key={course.id} className="overflow-hidden bg-white rounded-lg shadow">
            <div className={`${course.color} h-2`}></div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                <div className={`w-4 h-4 rounded-full ${course.color}`}></div>
              </div>
              
              <div className="mt-2 space-y-2">
                <div className="flex items-start">
                  <svg className="w-4 h-4 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span className="text-sm text-gray-600">{course.instructor}</span>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-4 h-4 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-sm text-gray-600">{course.schedule}</span>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-4 h-4 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-sm text-gray-600">{course.location}</span>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-4 h-4 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                  </svg>
                  <span className="text-sm text-gray-600">
                    {course.completed}/{course.tasks} tasks completed
                  </span>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-4 h-4 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span className="text-sm text-gray-600">{course.credits} credits</span>
                </div>
                
                <div className="pt-3 mt-3 border-t">
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">Progress</span>
                    <span className="text-gray-600">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-2 rounded-full ${course.color}`} 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {course.nextDeadline && (
                  <div className="pt-3 mt-3 border-t">
                    <div className="text-sm font-medium text-gray-700">Next Deadline</div>
                    <div className="text-sm text-gray-600">{course.nextDeadline}</div>
                  </div>
                )}
              </div>
              
              <div className="flex mt-4 space-x-2">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
                  View Tasks
                </button>
                <button className="flex items-center justify-center px-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Course Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add New Course</h2>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="p-1 text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Course Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newCourse.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Introduction to Psychology"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Instructor</label>
                  <input
                    type="text"
                    name="instructor"
                    value={newCourse.instructor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Dr. Emily Johnson"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Schedule</label>
                    <input
                      type="text"
                      name="schedule"
                      value={newCourse.schedule}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., MWF 10:00 AM"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={newCourse.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Science Building 101"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Color</label>
                    <select
                      name="color"
                      value={newCourse.color}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {colorOptions.map(color => (
                        <option key={color.value} value={color.value}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Credits</label>
                    <select
                      name="credits"
                      value={newCourse.credits}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {creditOptions.map(credit => (
                        <option key={credit} value={credit}>
                          {credit} {credit === 1 ? 'credit' : 'credits'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6 space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Add Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Bottom Actions */}
      <div className="p-4 mt-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Import/Export</h2>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"></path>
            </svg>
            Import from LMS
          </button>
          
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Export Courses
          </button>
          
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Sync Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;