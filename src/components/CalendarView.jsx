import React, { useState } from 'react';

const CalendarView = ({ isMobile }) => {
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', or 'day'
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 3)); // June 3, 2025
  
  // Generate calendar days for month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of the month and last day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    // Array to hold all calendar days
    const calendarDays = [];
    
    // Add days from previous month to fill the first row
    const daysFromPrevMonth = firstDayOfWeek;
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      calendarDays.push({
        date: prevMonthDays - i,
        currentMonth: false,
        isToday: false
      });
    }
    
    // Add days from current month
    const numDays = lastDay.getDate();
    const today = new Date();
    
    for (let i = 1; i <= numDays; i++) {
      const isToday = 
        i === today.getDate() && 
        month === today.getMonth() && 
        year === today.getFullYear();
        
      calendarDays.push({
        date: i,
        currentMonth: true,
        isToday
      });
    }
    
    // Add days from next month to complete the last row
    const totalCalendarDays = calendarDays.length;
    const remainingDays = 42 - totalCalendarDays; // 6 rows of 7 days
    
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        date: i,
        currentMonth: false,
        isToday: false
      });
    }
    
    return calendarDays;
  };
  
  // Sample tasks data
  const tasks = [
    { 
      id: 1, 
      title: 'Read Chapter 3', 
      course: 'History 101', 
      courseColor: 'bg-red-500',
      dueDate: new Date(2025, 5, 3), // June 3, 2025
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'Complete Math Problem Set', 
      course: 'Calculus II', 
      courseColor: 'bg-blue-500',
      dueDate: new Date(2025, 5, 3), // June 3, 2025
      priority: 'medium'
    },
    { 
      id: 3, 
      title: 'Group Project Meeting', 
      course: 'Business Ethics', 
      courseColor: 'bg-green-500',
      dueDate: new Date(2025, 5, 3), // June 3, 2025
      priority: 'high'
    },
    { 
      id: 4, 
      title: 'Research Paper Draft', 
      course: 'Psychology', 
      courseColor: 'bg-purple-500',
      dueDate: new Date(2025, 5, 4), // June 4, 2025
      priority: 'medium'
    },
    { 
      id: 5, 
      title: 'Midterm Exam', 
      course: 'Computer Science', 
      courseColor: 'bg-yellow-500',
      dueDate: new Date(2025, 5, 5), // June 5, 2025
      priority: 'high'
    },
    { 
      id: 6, 
      title: 'Lab Report Submission', 
      course: 'Chemistry', 
      courseColor: 'bg-indigo-500',
      dueDate: new Date(2025, 5, 6), // June 6, 2025
      priority: 'medium'
    }
  ];
  
  // Sample class schedule
  const classSchedule = [
    {
      id: 1,
      course: 'History 101',
      courseColor: 'bg-red-500',
      day: 1, // Monday
      startTime: '09:00',
      endTime: '10:30',
      location: 'Wheeler Hall 120'
    },
    {
      id: 2,
      course: 'Calculus II',
      courseColor: 'bg-blue-500',
      day: 1, // Monday
      startTime: '11:00',
      endTime: '12:30',
      location: 'Math Building 305'
    },
    {
      id: 3,
      course: 'Business Ethics',
      courseColor: 'bg-green-500',
      day: 2, // Tuesday
      startTime: '13:00',
      endTime: '14:30',
      location: 'Business Hall 220'
    },
    {
      id: 4,
      course: 'Psychology',
      courseColor: 'bg-purple-500',
      day: 3, // Wednesday
      startTime: '09:00',
      endTime: '10:30',
      location: 'Social Science Building 110'
    },
    {
      id: 5,
      course: 'Computer Science',
      courseColor: 'bg-yellow-500',
      day: 3, // Wednesday
      startTime: '14:00',
      endTime: '15:30',
      location: 'Tech Center 405'
    },
    {
      id: 6,
      course: 'Chemistry',
      courseColor: 'bg-indigo-500',
      day: 4, // Thursday
      startTime: '10:00',
      endTime: '12:00',
      location: 'Science Lab 220'
    },
    {
      id: 7,
      course: 'English Literature',
      courseColor: 'bg-pink-500',
      day: 5, // Friday
      startTime: '13:00',
      endTime: '14:30',
      location: 'Humanities Building 310'
    }
  ];
  
  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      return task.dueDate.getDate() === date && 
             task.dueDate.getMonth() === currentDate.getMonth() && 
             task.dueDate.getFullYear() === currentDate.getFullYear();
    });
  };
  
  // Get class schedule for a specific weekday
  const getClassesForWeekday = (weekday) => {
    return classSchedule.filter(cls => cls.day === weekday);
  };
  
  // Day name headers
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Format month and year
  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };
  
  // Navigate to previous month/week/day
  const goToPrevious = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
    } else {
      setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000));
    }
  };
  
  // Navigate to next month/week/day
  const goToNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
    } else {
      setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));
    }
  };
  
  // Generate week days for week view
  const generateWeekDays = () => {
    // Get the current day of the week (0-6, where 0 is Sunday)
    const currentDay = currentDate.getDay();
    
    // Calculate the date of the first day of the week (Sunday)
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDay);
    
    // Generate an array of 7 days starting from the first day of the week
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      
      const isToday = 
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear();
        
      weekDays.push({
        date: date.getDate(),
        dayOfWeek: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear(),
        isToday
      });
    }
    
    return weekDays;
  };
  
  // Hour labels for week and day views
  const hourLabels = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8; // Start from 8 AM
    return hour > 12 ? `${hour - 12} PM` : hour === 12 ? `${hour} PM` : `${hour} AM`;
  });
  
  const calendarDays = generateCalendarDays();
  const weekDays = generateWeekDays();
  
  return (
    <div className={`py-6 ${isMobile ? 'px-4' : 'px-8 ml-16'}`}>
      <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
          <p className="text-gray-600">{formatMonthYear(currentDate)}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={goToPrevious}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              className="px-2 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </button>
            <button
              onClick={goToNext}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          <div className="flex border rounded-md">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 text-sm font-medium ${
                viewMode === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-sm font-medium ${
                viewMode === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 text-sm font-medium ${
                viewMode === 'day'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Day
            </button>
          </div>
          
          <button className="flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Event
          </button>
        </div>
      </div>
      
      {/* Month View */}
      {viewMode === 'month' && (
        <div className="bg-white rounded-lg shadow">
          {/* Calendar header */}
          <div className="grid grid-cols-7 border-b">
            {dayNames.map((day, index) => (
              <div key={index} className="py-2 text-sm font-medium text-center text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const dayTasks = day.currentMonth ? getTasksForDate(day.date) : [];
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] border-b border-r p-1 ${
                    !day.currentMonth ? 'bg-gray-50 text-gray-400' : ''
                  } ${
                    day.isToday ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${
                      day.isToday ? 'bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center' : ''
                    }`}>
                      {day.date}
                    </span>
                    {day.currentMonth && (
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {/* Tasks for this day */}
                  <div className="space-y-1">
                    {dayTasks.slice(0, 3).map(task => (
                      <div
                        key={task.id}
                        className={`px-1 py-0.5 rounded text-xs truncate ${
                          task.priority === 'high' 
                            ? 'border-l-2 border-red-500 bg-red-50'
                            : 'border-l-2 border-blue-500 bg-blue-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className={`inline-block w-2 h-2 mr-1 rounded-full ${task.courseColor}`}></span>
                          {task.title}
                        </div>
                      </div>
                    ))}
                    {dayTasks.length > 3 && (
                      <div className="px-1 py-0.5 text-xs text-gray-500 text-center">
                        +{dayTasks.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Week View */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-lg shadow">
          {/* Week header */}
          <div className="grid grid-cols-8 border-b">
            <div className="py-2 text-sm font-medium text-center text-gray-500 border-r">
              Time
            </div>
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`py-2 text-sm font-medium text-center ${
                  day.isToday ? 'bg-blue-50' : ''
                }`}
              >
                <div>{dayNames[day.dayOfWeek]}</div>
                <div className={`text-base mt-1 ${
                  day.isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mx-auto' : ''
                }`}>
                  {day.date}
                </div>
              </div>
            ))}
          </div>
          
          {/* Time slots */}
          <div className="relative" style={{ height: isMobile ? '400px' : '600px', overflowY: 'auto' }}>
            {hourLabels.map((hour, hourIndex) => (
              <div key={hourIndex} className="grid grid-cols-8 border-b">
                <div className="py-2 text-xs font-medium text-gray-500 text-center border-r">
                  {hour}
                </div>
                
                {weekDays.map((day, dayIndex) => {
                  // Get classes for this day at this hour
                  const hourStart = hourIndex + 8; // Start from 8 AM
                  const classes = getClassesForWeekday(day.dayOfWeek + 1).filter(cls => {
                    const classStartHour = parseInt(cls.startTime.split(':')[0]);
                    return classStartHour === hourStart;
                  });
                  
                  return (
                    <div key={dayIndex} className="py-2 border-r min-h-[60px] relative">
                      {classes.map(cls => {
                        const startHour = parseInt(cls.startTime.split(':')[0]);
                        const endHour = parseInt(cls.endTime.split(':')[0]);
                        const durationHours = endHour - startHour + (parseInt(cls.endTime.split(':')[1]) > 0 ? 1 : 0);
                        
                        return (
                          <div
                            key={cls.id}
                            className={`absolute left-0 right-0 mx-1 p-1 rounded text-xs ${cls.courseColor} bg-opacity-20 overflow-hidden`}
                            style={{ height: `${durationHours * 60}px` }}
                          >
                            <div className="font-medium">{cls.course}</div>
                            <div>{cls.startTime} - {cls.endTime}</div>
                            <div className="text-xs truncate">{cls.location}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Day View */}
      {viewMode === 'day' && (
        <div className="bg-white rounded-lg shadow">
          {/* Day header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="text-lg font-medium">
              {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
          
          {/* Day tasks */}
          <div className="p-4 border-b">
            <h2 className="mb-2 text-sm font-medium text-gray-700">TASKS DUE TODAY</h2>
            <div className="space-y-2">
              {getTasksForDate(currentDate.getDate()).map(task => (
                <div
                  key={task.id}
                  className={`p-2 border rounded-lg ${
                    task.priority === 'high' 
                      ? 'border-l-4 border-l-red-500'
                      : 'border-l-4 border-l-yellow-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 mr-2 border-2 border-gray-300 rounded" />
                      <span className="font-medium">{task.title}</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 mr-1 rounded-full ${task.courseColor}`}></div>
                      <span className="text-xs text-gray-500">{task.course}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {getTasksForDate(currentDate.getDate()).length === 0 && (
                <p className="py-2 text-sm text-center text-gray-500">
                  No tasks due today
                </p>
              )}
            </div>
          </div>
          
          {/* Day schedule */}
          <div className="p-4">
            <h2 className="mb-2 text-sm font-medium text-gray-700">SCHEDULE</h2>
            <div className="space-y-2">
              {getClassesForWeekday(currentDate.getDay() + 1).map(cls => (
                <div
                  key={cls.id}
                  className="flex p-3 border rounded-lg"
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="px-2 py-1 text-xs font-medium text-center bg-gray-100 rounded">
                      {cls.startTime}<br />-<br />{cls.endTime}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 mr-2 rounded-full ${cls.courseColor}`}></div>
                      <span className="font-medium">{cls.course}</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">{cls.location}</div>
                  </div>
                </div>
              ))}
              
              {getClassesForWeekday(currentDate.getDay() + 1).length === 0 && (
                <p className="py-2 text-sm text-center text-gray-500">
                  No classes scheduled for today
                </p>
              )}
            </div>
          </div>
          
          {/* Study blocks */}
          <div className="p-4 border-t">
            <h2 className="mb-2 text-sm font-medium text-gray-700">STUDY BLOCKS</h2>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg bg-blue-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">Focused Study Session</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">2:00 PM - 4:00 PM (2 hours)</div>
                  </div>
                  <div className="text-xs font-medium text-blue-600">
                    Start Focus Mode
                  </div>
                </div>
              </div>
              
              <button className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Study Block
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Legend</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center p-2 border rounded">
            <div className="w-3 h-3 mr-2 bg-red-500 rounded-full"></div>
            <span className="text-sm">High Priority</span>
          </div>
          <div className="flex items-center p-2 border rounded">
            <div className="w-3 h-3 mr-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm">Medium Priority</span>
          </div>
          <div className="flex items-center p-2 border rounded">
            <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Low Priority</span>
          </div>
          <div className="flex items-center p-2 border rounded">
            <div className="w-3 h-3 mr-2 bg-blue-100 rounded-full"></div>
            <span className="text-sm">Study Block</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;