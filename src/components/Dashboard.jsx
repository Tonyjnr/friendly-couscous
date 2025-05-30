import React, { useState, useEffect } from 'react';

// Define TypeScript types (using JSDoc for type safety in .jsx files)
/**
 * @typedef {Object} Task
 * @property {number} id - Unique identifier
 * @property {string} title - Task title
 * @property {string} course - Course name
 * @property {string} courseColor - Color associated with course
 * @property {string} priority - Priority level (high, medium, low)
 * @property {string} dueDate - Due date (Today, Tomorrow, etc.)
 * @property {string} dueTime - Due time
 * @property {number} progress - Completion percentage
 * @property {string} status - Task status (Not Started, In Progress, Almost Done, Completed)
 * @property {string} [description] - Optional task description
 */

/**
 * @typedef {Object} Course
 * @property {number} id - Unique identifier
 * @property {string} name - Course name
 * @property {string} color - Tailwind CSS color class
 * @property {number} tasksCount - Total number of tasks
 * @property {number} completedCount - Number of completed tasks
 */

/**
 * @typedef {Object} StudyPattern
 * @property {string} day - Day of the week
 * @property {number} hours - Hours studied
 * @property {number} productivity - Productivity score
 */

/**
 * @typedef {Object} DashboardFilters
 * @property {string} courseFilter - Course to filter by ('all' for all courses)
 * @property {string} priorityFilter - Priority to filter by ('all' for all priorities)
 * @property {string} sortBy - Field to sort by (dueDate, priority, course)
 * @property {string} searchTerm - Search term for filtering tasks
 */

const Dashboard = ({ isMobile }) => {
  // State management for data
  const [allTasks, setAllTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    courseFilter: 'all',
    priorityFilter: 'all',
    sortBy: 'dueDate',
    searchTerm: '',
  });
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    course: '',
    priority: 'medium',
    dueDate: '',
    dueTime: '',
    description: '',
  });
  const [studyPatterns, setStudyPatterns] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState({
    tasksCompleted: 0,
    totalTasks: 0,
    studyHours: 0,
    focusScore: 0,
    weeklyGoalPercentage: 0,
  });
  
  // Sample data - in a real app this would come from API/database
  const sampleTasks = [
    { 
      id: 1, 
      title: 'Read Chapter 3', 
      course: 'History 101', 
      courseColor: 'bg-red-500',
      priority: 'high', 
      dueDate: 'Today', 
      dueTime: '11:59 PM',
      progress: 0,
      status: 'Not Started',
      description: 'Read pages 45-78 and take notes on key events.'
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
      status: 'In Progress',
      description: 'Solve problems 3.1-3.15 in the textbook.'
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
      status: 'Not Started',
      description: 'Discuss project timeline and assign roles.'
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
      status: 'In Progress',
      description: 'Complete first draft of research paper on cognitive biases.'
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
      status: 'In Progress',
      description: 'Study chapters 1-5 for midterm exam.'
    },
    { 
      id: 6, 
      title: 'Lab Report', 
      course: 'Chemistry', 
      courseColor: 'bg-indigo-500',
      priority: 'medium', 
      dueDate: 'In 3 days', 
      dueTime: '11:59 PM',
      progress: 30,
      status: 'In Progress',
      description: 'Write up results from last week\'s experiment.'
    },
    { 
      id: 7, 
      title: 'Essay Outline', 
      course: 'English Literature', 
      courseColor: 'bg-pink-500',
      priority: 'low', 
      dueDate: 'In 4 days', 
      dueTime: '11:59 PM',
      progress: 10,
      status: 'Not Started',
      description: 'Create outline for comparative essay on 19th century authors.'
    }
  ];
  
  const sampleCourses = [
    { id: 1, name: 'History 101', color: 'bg-red-500', tasksCount: 4, completedCount: 1 },
    { id: 2, name: 'Calculus II', color: 'bg-blue-500', tasksCount: 7, completedCount: 3 },
    { id: 3, name: 'Business Ethics', color: 'bg-green-500', tasksCount: 5, completedCount: 2 },
    { id: 4, name: 'Psychology', color: 'bg-purple-500', tasksCount: 3, completedCount: 0 },
    { id: 5, name: 'Computer Science', color: 'bg-yellow-500', tasksCount: 6, completedCount: 4 },
    { id: 6, name: 'Chemistry', color: 'bg-indigo-500', tasksCount: 4, completedCount: 1 },
    { id: 7, name: 'English Literature', color: 'bg-pink-500', tasksCount: 3, completedCount: 1 }
  ];

  const sampleStudyPatterns = [
    { day: 'Mon', hours: 3.5, productivity: 65 },
    { day: 'Tue', hours: 4.2, productivity: 78 },
    { day: 'Wed', hours: 2.1, productivity: 55 },
    { day: 'Thu', hours: 5.0, productivity: 89 },
    { day: 'Fri', hours: 3.8, productivity: 72 },
    { day: 'Sat', hours: 1.5, productivity: 45 },
    { day: 'Sun', hours: 4.5, productivity: 80 }
  ];

  // Initialize data on component mount
  useEffect(() => {
    // In a real app, these would be API calls
    setAllTasks(sampleTasks);
    setCourses(sampleCourses);
    setStudyPatterns(sampleStudyPatterns);
    
    // Calculate weekly stats
    const completedTasks = sampleTasks.filter(task => task.status === 'Completed').length;
    const totalTasks = sampleTasks.length;
    const totalStudyHours = sampleStudyPatterns.reduce((sum, day) => sum + day.hours, 0);
    const avgProductivity = sampleStudyPatterns.reduce((sum, day) => sum + day.productivity, 0) / sampleStudyPatterns.length;
    
    setWeeklyStats({
      tasksCompleted: completedTasks,
      totalTasks: totalTasks,
      studyHours: totalStudyHours.toFixed(1),
      focusScore: (avgProductivity / 10).toFixed(1),
      weeklyGoalPercentage: 56 // In a real app, this would be calculated based on goals
    });
  }, []);

  // Filter today's tasks
  const todayTasks = allTasks.filter(task => task.dueDate === 'Today');
  
  // Filter upcoming tasks (not today)
  const upcomingTasks = allTasks.filter(task => task.dueDate !== 'Today');
  
  // Handle task status toggle
  const toggleTaskStatus = (taskId) => {
    setAllTasks(prevTasks => prevTasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'Completed' ? 'Not Started' : 'Completed';
        const newProgress = newStatus === 'Completed' ? 100 : 0;
        return { ...task, status: newStatus, progress: newProgress };
      }
      return task;
    }));
  };
  
  // Add a new task
  const handleAddTask = () => {
    if (newTask.title && newTask.course && newTask.dueDate) {
      // Find course color
      const courseObj = courses.find(c => c.name === newTask.course);
      const courseColor = courseObj ? courseObj.color : 'bg-gray-500';
      
      // Create new task object
      const task = {
        id: allTasks.length + 1,
        title: newTask.title,
        course: newTask.course,
        courseColor: courseColor,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        dueTime: newTask.dueTime,
        progress: 0,
        status: 'Not Started',
        description: newTask.description
      };
      
      // Add to tasks
      setAllTasks([...allTasks, task]);
      
      // Reset form and close modal
      setNewTask({
        title: '',
        course: '',
        priority: 'medium',
        dueDate: '',
        dueTime: '',
        description: '',
      });
      setIsAddTaskModalOpen(false);
      
      // Update course stats
      if (courseObj) {
        setCourses(prevCourses => prevCourses.map(c => {
          if (c.id === courseObj.id) {
            return { ...c, tasksCount: c.tasksCount + 1 };
          }
          return c;
        }));
      }
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Get the current date for display
  const getCurrentDate = () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };
  
  // Calculate productivity trend (up/down from previous week)
  const productivityTrend = () => {
    const currentProductivity = studyPatterns.reduce((sum, day) => sum + day.productivity, 0) / studyPatterns.length;
    const previousProductivity = currentProductivity * 0.9; // Simulated previous week data
    const percentChange = Math.round(((currentProductivity - previousProductivity) / previousProductivity) * 100);
    return {
      direction: percentChange >= 0 ? 'up' : 'down',
      percentage: Math.abs(percentChange)
    };
  };
  
  // Analyze study patterns to determine optimal times
  const analyzeStudyPatterns = () => {
    // Find day with highest productivity
    const mostProductiveDay = [...studyPatterns].sort((a, b) => b.productivity - a.productivity)[0];
    return {
      bestDay: mostProductiveDay.day,
      bestProductivity: mostProductiveDay.productivity
    };
  };
  
  const productivityInsight = analyzeStudyPatterns();
  const trend = productivityTrend();
  
  return (
    <div className={`py-6 ${isMobile ? 'px-4' : 'px-8 ml-16'}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">{getCurrentDate()}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Search and filter section */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search tasks..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange({ target: { name: 'searchTerm', value: e.target.value } })}
              className="px-3 py-2 pr-8 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <svg className="absolute right-2 top-2.5 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <button 
            onClick={() => setIsAddTaskModalOpen(true)}
            className="flex items-center px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            New Task
          </button>
        </div>
      </div>
      
      {/* Progress Summary with Enhanced Analytics */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Weekly Progress</h2>
          <div className="flex items-center text-sm">
            <span className={`mr-1 ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend.direction === 'up' ? '↑' : '↓'} {trend.percentage}%
            </span>
            <span className="text-gray-500">vs last week</span>
          </div>
        </div>
        <div className="flex flex-wrap mb-2 -mx-2">
          <div className="flex-1 px-2 mb-2 sm:mb-0">
            <p className="text-sm text-gray-600">Tasks Completed</p>
            <p className="text-2xl font-bold text-gray-800">{weeklyStats.tasksCompleted}/{weeklyStats.totalTasks}</p>
          </div>
          <div className="flex-1 px-2 mb-2 sm:mb-0">
            <p className="text-sm text-gray-600">Study Hours</p>
            <p className="text-2xl font-bold text-gray-800">{weeklyStats.studyHours}</p>
          </div>
          <div className="flex-1 px-2">
            <p className="text-sm text-gray-600">Focus Score</p>
            <p className="text-2xl font-bold text-gray-800">{weeklyStats.focusScore}/10</p>
          </div>
        </div>
        <div className="w-full h-2 mb-1 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-blue-600 rounded-full" 
            style={{ width: `${weeklyStats.weeklyGoalPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <p>Best study day: {productivityInsight.bestDay} ({productivityInsight.bestProductivity}% productivity)</p>
          <p>{weeklyStats.weeklyGoalPercentage}% of weekly goal completed</p>
        </div>
      </div>
      
      {/* Study Pattern Analytics */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Study Patterns</h2>
          <a href="#" className="text-sm text-blue-600 hover:underline">Detailed Analytics</a>
        </div>
        <div className="relative h-32">
          {/* Render chart with study patterns */}
          <div className="absolute inset-0">
            <div className="flex items-end justify-between h-full pt-6">
              {studyPatterns.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-8 bg-blue-500 rounded-t" 
                    style={{ 
                      height: `${(day.hours / 5) * 100}%`,
                      opacity: day.productivity / 100
                    }}
                  ></div>
                  <div className="mt-1 text-xs text-gray-600">{day.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 bg-blue-500 rounded-sm opacity-50"></div>
            <span>Study Hours</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 bg-blue-500 rounded-sm opacity-100"></div>
            <span>Productivity Level</span>
          </div>
        </div>
      </div>
      
      {/* Today's Tasks with Interactive Features */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Today's Tasks</h2>
          <div className="flex items-center">
            <select 
              className="px-2 py-1 mr-2 text-sm border rounded-md"
              name="priorityFilter"
              value={filters.priorityFilter}
              onChange={handleFilterChange}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <a href="#" className="text-sm text-blue-600 hover:underline">See All</a>
          </div>
        </div>
        {todayTasks.length > 0 ? (
          <ul className="space-y-2">
            {todayTasks
              .filter(task => 
                filters.priorityFilter === 'all' || task.priority === filters.priorityFilter
              )
              .filter(task => 
                !filters.searchTerm || task.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
              )
              .map(task => (
                <li key={task.id} className="flex items-center p-3 bg-gray-50 border rounded-lg">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 mr-3 border-2 border-gray-300 rounded"
                    checked={task.status === 'Completed'}
                    onChange={() => toggleTaskStatus(task.id)}
                  />
                  <div className="flex-1">
                    <h3 className={`font-medium ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 mr-1 ${task.courseColor} rounded-full`}></span>
                      <span className="text-xs text-gray-500">{task.course}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="mt-1 text-xs text-gray-500">{task.dueTime}</span>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>No tasks due today!</p>
            <button 
              onClick={() => setIsAddTaskModalOpen(true)}
              className="mt-2 text-blue-600 hover:underline"
            >
              Add a task
            </button>
          </div>
        )}
      </div>
      
      {/* Upcoming Tasks with Filtering */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming</h2>
          <div className="flex items-center">
            <select 
              className="px-2 py-1 mr-2 text-sm border rounded-md"
              name="courseFilter"
              value={filters.courseFilter}
              onChange={handleFilterChange}
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.name}>{course.name}</option>
              ))}
            </select>
            <a href="#" className="text-sm text-blue-600 hover:underline">See All</a>
          </div>
        </div>
        {upcomingTasks.length > 0 ? (
          <ul className="space-y-2">
            {upcomingTasks
              .filter(task => 
                filters.courseFilter === 'all' || task.course === filters.courseFilter
              )
              .filter(task => 
                !filters.searchTerm || task.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
              )
              .slice(0, 3) // Limit to 3 tasks for dashboard view
              .map(task => (
                <li key={task.id} className="flex items-center p-3 bg-gray-50 border rounded-lg">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 mr-3 border-2 border-gray-300 rounded"
                    checked={task.status === 'Completed'}
                    onChange={() => toggleTaskStatus(task.id)}
                  />
                  <div className="flex-1">
                    <h3 className={`font-medium ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 mr-1 ${task.courseColor} rounded-full`}></span>
                      <span className="text-xs text-gray-500">{task.course}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="mt-1 text-xs font-medium text-gray-700">{task.dueDate}</span>
                      <span className="text-xs text-gray-500">{task.dueTime}</span>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>No upcoming tasks!</p>
            <button 
              onClick={() => setIsAddTaskModalOpen(true)}
              className="mt-2 text-blue-600 hover:underline"
            >
              Add a task
            </button>
          </div>
        )}
      </div>
      
      {/* Course Overview */}
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Course Overview</h2>
          <a href="#" className="text-sm text-blue-600 hover:underline">Manage Courses</a>
        </div>
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
          {courses.map(course => (
            <div key={course.id} className="p-3 border rounded-lg hover:shadow-md transition-shadow duration-200">
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
              <div className="flex items-center justify-between mt-2">
                <button className="text-xs text-blue-600 hover:underline">View Tasks</button>
                <span className="text-xs text-gray-500">
                  {allTasks.filter(task => task.course === course.name && task.dueDate === 'Today').length} due today
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
                <button 
                  onClick={() => setIsAddTaskModalOpen(false)}
                  className="p-1 text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Complete assignment"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Task details..."
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Course</label>
                    <select
                      value={newTask.course}
                      onChange={(e) => setNewTask({...newTask, course: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.name}>{course.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Due Date</label>
                    <select
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Date</option>
                      <option value="Today">Today</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="In 2 days">In 2 days</option>
                      <option value="In 3 days">In 3 days</option>
                      <option value="In 4 days">In 4 days</option>
                      <option value="In 5 days">In 5 days</option>
                      <option value="Next week">Next week</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Due Time</label>
                    <input
                      type="text"
                      value={newTask.dueTime}
                      onChange={(e) => setNewTask({...newTask, dueTime: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 3:00 PM"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6 space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddTaskModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Productivity Insight Toast */}
      <div className="fixed bottom-4 right-4 max-w-xs p-4 bg-white rounded-lg shadow-lg border-l-4 border-blue-500 transition-all duration-300">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">Productivity Insight</p>
            <p className="mt-1 text-sm text-gray-600">
              You're most productive on {productivityInsight.bestDay}. Consider scheduling important tasks on this day for optimal results.
            </p>
            <div className="mt-2">
              <button className="text-xs text-blue-600 hover:underline">View Details</button>
            </div>
          </div>
          <button className="ml-4 text-gray-400 hover:text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
