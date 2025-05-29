import React, { useState } from 'react';

const TaskList = ({ isMobile }) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'board'
  const [filterCourse, setFilterCourse] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Sample data
  const tasks = [
    { 
      id: 1, 
      title: 'Read Chapter 3', 
      course: 'History 101', 
      courseColor: 'bg-red-500',
      priority: 'high', 
      dueDate: 'Today', 
      dueTime: '11:59 PM',
      progress: 0,
      status: 'Not Started'
    },
    { 
      id: 2, 
      title: 'Complete Math Problem Set', 
      course: 'Calculus II', 
      courseColor: 'bg-blue-500',
      priority: 'medium', 
      dueDate: 'Today', 
      dueTime: '3:00 PM',
      progress: 25,
      status: 'In Progress'
    },
    { 
      id: 3, 
      title: 'Group Project Meeting', 
      course: 'Business Ethics',
      courseColor: 'bg-green-500', 
      priority: 'high', 
      dueDate: 'Today', 
      dueTime: '4:30 PM',
      progress: 0,
      status: 'Not Started'
    },
    { 
      id: 4, 
      title: 'Research Paper Draft', 
      course: 'Psychology', 
      courseColor: 'bg-purple-500',
      priority: 'medium', 
      dueDate: 'Tomorrow', 
      dueTime: '5:00 PM',
      progress: 50,
      status: 'In Progress'
    },
    { 
      id: 5, 
      title: 'Midterm Exam', 
      course: 'Computer Science', 
      courseColor: 'bg-yellow-500',
      priority: 'high', 
      dueDate: 'In 2 days', 
      dueTime: '10:00 AM',
      progress: 75,
      status: 'In Progress'
    },
    { 
      id: 6, 
      title: 'Lab Report Submission', 
      course: 'Chemistry', 
      courseColor: 'bg-indigo-500',
      priority: 'medium', 
      dueDate: 'In 3 days', 
      dueTime: '11:59 PM',
      progress: 90,
      status: 'Almost Done'
    },
    { 
      id: 7, 
      title: 'Reading Assignment', 
      course: 'English Literature', 
      courseColor: 'bg-pink-500',
      priority: 'low', 
      dueDate: 'In 4 days', 
      dueTime: '11:59 PM',
      progress: 0,
      status: 'Not Started'
    }
  ];

  const courses = [
    { id: 0, name: 'All Courses', color: 'bg-gray-500' },
    { id: 1, name: 'History 101', color: 'bg-red-500' },
    { id: 2, name: 'Calculus II', color: 'bg-blue-500' },
    { id: 3, name: 'Business Ethics', color: 'bg-green-500' },
    { id: 4, name: 'Psychology', color: 'bg-purple-500' },
    { id: 5, name: 'Computer Science', color: 'bg-yellow-500' },
    { id: 6, name: 'Chemistry', color: 'bg-indigo-500' },
    { id: 7, name: 'English Literature', color: 'bg-pink-500' }
  ];

  // Filter tasks based on selected course
  const filteredTasks = filterCourse === 'all' 
    ? tasks 
    : tasks.filter(task => task.course === filterCourse);
  
  // Sort tasks based on selected sort option
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'date') {
      // Simple date sorting logic for the wireframe
      if (a.dueDate === 'Today' && b.dueDate !== 'Today') return -1;
      if (a.dueDate === 'Tomorrow' && b.dueDate === 'Today') return 1;
      if (a.dueDate === 'Tomorrow' && b.dueDate !== 'Today' && b.dueDate !== 'Tomorrow') return -1;
      return 0;
    } else if (sortBy === 'priority') {
      const priorityValue = { high: 3, medium: 2, low: 1 };
      return priorityValue[b.priority] - priorityValue[a.priority];
    } else if (sortBy === 'course') {
      return a.course.localeCompare(b.course);
    }
    return 0;
  });

  // Group tasks by status for board view
  const tasksByStatus = {
    'Not Started': sortedTasks.filter(task => task.status === 'Not Started'),
    'In Progress': sortedTasks.filter(task => task.status === 'In Progress'),
    'Almost Done': sortedTasks.filter(task => task.status === 'Almost Done'),
    'Completed': sortedTasks.filter(task => task.status === 'Completed')
  };

  return (
    <div className={`py-6 ${isMobile ? 'px-4' : 'px-8 ml-16'}`}>
      <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
          <p className="text-gray-600">7 active tasks</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 text-sm font-medium border rounded-md ${
              viewMode === 'list' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'text-gray-700 border-gray-300'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('board')}
            className={`px-3 py-1 text-sm font-medium border rounded-md ${
              viewMode === 'board' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'text-gray-700 border-gray-300'
            }`}
          >
            Board View
          </button>
          <button className="flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            New Task
          </button>
        </div>
      </div>
      
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className={`flex flex-col mb-4 space-y-2 ${!isMobile && 'sm:flex-row sm:items-center sm:justify-between sm:space-y-0'}`}>
          <div className="flex items-center">
            <label htmlFor="filter-course" className="mr-2 text-sm font-medium text-gray-600">Course:</label>
            <select
              id="filter-course"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="px-2 py-1 text-sm border rounded-md"
            >
              <option value="all">All Courses</option>
              {courses.slice(1).map(course => (
                <option key={course.id} value={course.name}>{course.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <label htmlFor="sort-by" className="mr-2 text-sm font-medium text-gray-600">Sort by:</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1 text-sm border rounded-md"
              >
                <option value="date">Due Date</option>
                <option value="priority">Priority</option>
                <option value="course">Course</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input type="text" placeholder="Search tasks..." className="px-3 py-1 text-sm border rounded-md" />
              <button className="p-1 ml-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* List View */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium">Task</th>
                  <th className="py-2 font-medium">Course</th>
                  <th className="py-2 font-medium">Priority</th>
                  <th className="py-2 font-medium">Due Date</th>
                  <th className="py-2 font-medium">Progress</th>
                  <th className="py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task) => (
                  <tr key={task.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <input type="checkbox" className="w-4 h-4 border-2 border-gray-300 rounded" />
                    </td>
                    <td className="py-3 font-medium text-gray-800">{task.title}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 mr-2 rounded-full ${task.courseColor}`}></div>
                        <span>{task.course}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3">
                      <div>
                        <div className={`font-medium ${
                          task.dueDate === 'Today' ? 'text-red-600' : 
                          task.dueDate === 'Tomorrow' ? 'text-orange-600' : 
                          'text-gray-700'
                        }`}>
                          {task.dueDate}
                        </div>
                        <div className="text-xs text-gray-500">{task.dueTime}</div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-24 h-2 mr-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              task.progress >= 75 ? 'bg-green-500' :
                              task.progress >= 25 ? 'bg-blue-500' :
                              task.progress > 0 ? 'bg-yellow-500' : 'bg-gray-300'
                            }`} 
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{task.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-1">
                        <button className="p-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </button>
                        <button className="p-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Board View */}
        {viewMode === 'board' && (
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
            {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
              <div key={status} className="border rounded-lg">
                <div className="p-3 font-medium text-gray-800 border-b bg-gray-50">
                  {status} ({statusTasks.length})
                </div>
                <div className="p-2">
                  {statusTasks.map(task => (
                    <div key={task.id} className="p-3 mb-2 border rounded-lg bg-white">
                      <h3 className="mb-1 font-medium text-gray-800">{task.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 mr-1 rounded-full ${task.courseColor}`}></div>
                          <span className="text-xs text-gray-500">{task.course}</span>
                        </div>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className={`font-medium ${
                          task.dueDate === 'Today' ? 'text-red-600' : 
                          task.dueDate === 'Tomorrow' ? 'text-orange-600' : 
                          'text-gray-700'
                        }`}>
                          {task.dueDate} ({task.dueTime})
                        </div>
                        <div className="flex items-center">
                          <div className="w-12 h-1 mr-1 bg-gray-200 rounded-full">
                            <div 
                              className={`h-1 rounded-full ${
                                task.progress >= 75 ? 'bg-green-500' :
                                task.progress >= 25 ? 'bg-blue-500' :
                                task.progress > 0 ? 'bg-yellow-500' : 'bg-gray-300'
                              }`} 
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-600">{task.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {statusTasks.length === 0 && (
                    <div className="p-4 text-sm text-center text-gray-500">
                      No tasks in this status
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Batch Actions</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
            Mark Selected as Complete
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
            Change Due Date
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
            Change Priority
          </button>
          <button className="px-3 py-1 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50">
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;