import React, { useState, useEffect } from 'react';

const FocusMode = ({ isMobile }) => {
  // Timer states
  const [timerMode, setTimerMode] = useState('focus'); // 'focus', 'break', 'longBreak'
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [cycle, setCycle] = useState(1);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  
  // Settings
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [showSettings, setShowSettings] = useState(false);
  const [distractionBlocking, setDistractionBlocking] = useState(true);
  
  // Current task
  const currentTask = {
    id: 5,
    title: 'Midterm Exam Preparation',
    course: 'Computer Science',
    courseColor: 'bg-yellow-500',
    priority: 'high',
    dueDate: 'June 5, 2025',
    description: 'Review all lecture materials and complete practice problems for the midterm exam. Focus on chapters 4-7 and all lab exercises.'
  };
  
  // Recent focus sessions
  const focusSessions = [
    { id: 1, date: 'Today', task: 'Research Paper Draft', duration: '45 minutes', productivity: 'High' },
    { id: 2, date: 'Today', task: 'Lab Assignment 5', duration: '30 minutes', productivity: 'Medium' },
    { id: 3, date: 'Yesterday', task: 'Midterm Exam Preparation', duration: '1 hour 15 minutes', productivity: 'High' },
  ];
  
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        
        if (timerMode === 'focus') {
          setTotalFocusTime(prev => prev + 1);
        }
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer completed
      const notification = new Audio('/notification-sound.mp3'); // This would be a real sound in a production app
      // notification.play(); // Commented out to prevent audio playing in wireframe demo
      
      if (timerMode === 'focus') {
        // Move to break after focus period
        if (cycle % 4 === 0) {
          // Long break after 4 focus sessions
          setTimerMode('longBreak');
          setTimeLeft(longBreakTime * 60);
        } else {
          setTimerMode('break');
          setTimeLeft(breakTime * 60);
        }
      } else {
        // Move to focus after break
        setTimerMode('focus');
        setTimeLeft(focusTime * 60);
        if (timerMode === 'longBreak') {
          // Start a new cycle after a long break
          setCycle(1);
        } else {
          setCycle(cycle + 1);
        }
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerMode, cycle, focusTime, breakTime, longBreakTime]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Format total focus time in hours and minutes
  const formatTotalTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours} hr ${mins} min`;
    } else {
      return `${mins} min`;
    }
  };
  
  // Handle timer controls
  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    
    if (timerMode === 'focus') {
      setTimeLeft(focusTime * 60);
    } else if (timerMode === 'break') {
      setTimeLeft(breakTime * 60);
    } else {
      setTimeLeft(longBreakTime * 60);
    }
  };
  
  // Skip to next timer
  const skipTimer = () => {
    setIsRunning(false);
    
    if (timerMode === 'focus') {
      if (cycle % 4 === 0) {
        setTimerMode('longBreak');
        setTimeLeft(longBreakTime * 60);
      } else {
        setTimerMode('break');
        setTimeLeft(breakTime * 60);
      }
    } else {
      setTimerMode('focus');
      setTimeLeft(focusTime * 60);
      if (timerMode === 'longBreak') {
        setCycle(1);
      } else {
        setCycle(cycle + 1);
      }
    }
  };
  
  return (
    <div className={`min-h-screen ${timerMode === 'focus' ? 'bg-blue-50' : 'bg-green-50'}`}>
      <div className={`py-6 ${isMobile ? 'px-4' : 'px-8 ml-16'} max-w-3xl mx-auto`}>
        {/* Timer Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Focus Mode</h1>
            <p className="text-gray-600">
              {timerMode === 'focus' ? 'Stay focused!' : 'Take a break!'}
            </p>
          </div>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 bg-white rounded-full shadow-sm hover:bg-gray-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <div className="p-4 mb-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-medium text-gray-800">Timer Settings</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm text-gray-600">Focus Time (min)</label>
                <input 
                  type="number" 
                  value={focusTime}
                  onChange={(e) => setFocusTime(Number(e.target.value))}
                  min="1"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-600">Short Break (min)</label>
                <input 
                  type="number" 
                  value={breakTime}
                  onChange={(e) => setBreakTime(Number(e.target.value))}
                  min="1"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-600">Long Break (min)</label>
                <input 
                  type="number" 
                  value={longBreakTime}
                  onChange={(e) => setLongBreakTime(Number(e.target.value))}
                  min="1"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="distraction-blocking"
                  checked={distractionBlocking}
                  onChange={() => setDistractionBlocking(!distractionBlocking)}
                  className="w-4 h-4 border-2 border-gray-300 rounded text-blue-600"
                />
                <label htmlFor="distraction-blocking" className="ml-2 text-sm text-gray-700">
                  Enable distraction blocking
                </label>
              </div>
              
              <button 
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm font-medium text-blue-700 border border-blue-700 rounded-md hover:bg-blue-50"
              >
                Apply Settings
              </button>
            </div>
          </div>
        )}
        
        {/* Main Timer */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-lg text-center">
          <div className="flex justify-center mb-4">
            <div className={`px-4 py-1 text-sm font-medium rounded-full ${timerMode === 'focus' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
              {timerMode === 'focus' ? 'Focus Time' : timerMode === 'break' ? 'Short Break' : 'Long Break'} • Cycle {cycle}/4
            </div>
          </div>
          
          <div className={`text-7xl font-bold mb-6 ${timerMode === 'focus' ? 'text-blue-800' : 'text-green-800'}`}>
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex justify-center space-x-4 mb-6">
            {!isRunning ? (
              <button 
                onClick={startTimer}
                className="px-6 py-3 text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                </svg>
                Start
              </button>
            ) : (
              <button 
                onClick={pauseTimer}
                className="px-6 py-3 text-white bg-yellow-500 rounded-full shadow-md hover:bg-yellow-600 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                Pause
              </button>
            )}
            
            <button 
              onClick={resetTimer}
              className="px-6 py-3 text-gray-600 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"></path>
              </svg>
              Reset
            </button>
            
            <button 
              onClick={skipTimer}
              className="px-6 py-3 text-gray-600 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              Skip
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            Total focus time today: {formatTotalTime(totalFocusTime)}
          </div>
        </div>
        
        {/* Current Task */}
        <div className="p-4 mb-6 bg-white rounded-lg shadow">
          <h2 className="mb-3 text-lg font-medium text-gray-800">Current Task</h2>
          
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">{currentTask.title}</h3>
                <div className="flex items-center mt-1">
                  <div className={`w-2 h-2 mr-2 rounded-full ${currentTask.courseColor}`}></div>
                  <span className="text-xs text-gray-500">{currentTask.course}</span>
                  <span className="mx-2 text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">Due: {currentTask.dueDate}</span>
                  <span className="mx-2 text-xs text-gray-400">•</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    currentTask.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {currentTask.priority}
                  </span>
                </div>
              </div>
              
              <button className="p-1 text-gray-600 hover:text-gray-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </button>
            </div>
            
            <p className="mt-2 text-sm text-gray-600">{currentTask.description}</p>
            
            <button className="flex items-center justify-center w-full px-3 py-2 mt-3 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
              Switch Task
            </button>
          </div>
        </div>
        
        {/* Recent Focus Sessions */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-3 text-lg font-medium text-gray-800">Recent Focus Sessions</h2>
          
          <ul className="space-y-2">
            {focusSessions.map(session => (
              <li key={session.id} className="flex items-center justify-between p-2 border-b last:border-0">
                <div>
                  <div className="font-medium text-gray-800">{session.task}</div>
                  <div className="text-xs text-gray-500">{session.date} • {session.duration}</div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  session.productivity === 'High' ? 'bg-green-100 text-green-800' : 
                  session.productivity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {session.productivity} productivity
                </span>
              </li>
            ))}
          </ul>
          
          <button className="flex items-center justify-center w-full px-3 py-2 mt-3 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            View All Sessions
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;