import React, { useState } from 'react';

const TaskDetail = ({ isMobile }) => {
  // Sample task data
  const task = {
    id: 5,
    title: 'Midterm Exam Preparation',
    description: 'Review all lecture materials and complete practice problems for the midterm exam. Focus on chapters 4-7 and all lab exercises.',
    course: 'Computer Science',
    courseColor: 'bg-yellow-500',
    priority: 'high',
    dueDate: 'June 5, 2025',
    dueTime: '10:00 AM',
    estimatedTime: '8 hours',
    progress: 75,
    status: 'In Progress',
    weight: 'Heavy (25% of final grade)',
    attachments: [
      { id: 1, name: 'Practice_Problems.pdf', type: 'pdf', size: '2.4 MB' },
      { id: 2, name: 'Lecture_Notes.docx', type: 'docx', size: '1.7 MB' },
      { id: 3, name: 'Study_Guide.pdf', type: 'pdf', size: '3.1 MB' }
    ],
    subtasks: [
      { id: 1, title: 'Review Chapter 4 notes', completed: true },
      { id: 2, title: 'Review Chapter 5 notes', completed: true },
      { id: 3, title: 'Review Chapter 6 notes', completed: true },
      { id: 4, title: 'Review Chapter 7 notes', completed: false },
      { id: 5, title: 'Complete practice exam', completed: false },
      { id: 6, title: 'Review lab exercises', completed: false }
    ],
    relatedTasks: [
      { id: 8, title: 'Lab Assignment 5', course: 'Computer Science', priority: 'medium', dueDate: 'June 2, 2025' },
      { id: 12, title: 'Study Group Meeting', course: 'Computer Science', priority: 'medium', dueDate: 'June 4, 2025' }
    ]
  };

  // States for form inputs
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [course, setCourse] = useState(task.course);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [dueTime, setDueTime] = useState(task.dueTime);
  const [estimatedTime, setEstimatedTime] = useState(task.estimatedTime);
  const [weight, setWeight] = useState(task.weight);
  const [activeTab, setActiveTab] = useState('details');
  
  // State for new subtask
  const [newSubtask, setNewSubtask] = useState('');

  // Sample course list
  const courses = [
    { id: 1, name: 'History 101', color: 'bg-red-500' },
    { id: 2, name: 'Calculus II', color: 'bg-blue-500' },
    { id: 3, name: 'Business Ethics', color: 'bg-green-500' },
    { id: 4, name: 'Psychology', color: 'bg-purple-500' },
    { id: 5, name: 'Computer Science', color: 'bg-yellow-500' },
    { id: 6, name: 'Chemistry', color: 'bg-indigo-500' },
    { id: 7, name: 'English Literature', color: 'bg-pink-500' }
  ];

  // Function to handle subtask completion toggle
  const toggleSubtask = (id) => {
    // This would update the subtask in a real application
    console.log(`Toggled subtask ${id}`);
  };

  // Function to add new subtask
  const addSubtask = () => {
    if (newSubtask.trim() !== '') {
      // This would add the new subtask in a real application
      console.log(`Added new subtask: ${newSubtask}`);
      setNewSubtask('');
    }
  };

  // Calculate completion percentage
  const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
  const completionPercentage = Math.round((completedSubtasks / task.subtasks.length) * 100);

  return (
    <div className={`py-6 ${isMobile ? 'px-4' : 'px-8 ml-16'}`}>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Task Details</h1>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
              Mark Complete
            </button>
            <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className={`w-3 h-3 mr-2 rounded-full ${task.courseColor}`}></div>
          <span className="text-gray-600">{task.course}</span>
          <span className={`ml-3 px-2 py-0.5 text-xs rounded-full ${
            task.priority === 'high' ? 'bg-red-100 text-red-800' : 
            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-green-100 text-green-800'
          }`}>
            {task.priority} priority
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b">
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'subtasks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('subtasks')}
          >
            Subtasks ({completedSubtasks}/{task.subtasks.length})
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'attachments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('attachments')}
          >
            Attachments ({task.attachments.length})
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'related' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('related')}
          >
            Related
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Task Title */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Task Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              {/* Two-column layout for smaller fields */}
              <div className={`${isMobile ? 'space-y-6' : 'grid grid-cols-2 gap-6'}`}>
                {/* Course */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Course</label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Due Time */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Due Time</label>
                  <input
                    type="text"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Estimated Time */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Estimated Time</label>
                  <input
                    type="text"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Weight</label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">Progress</label>
                  <span className="text-sm text-gray-500">{task.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-600 rounded-full" 
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
                <select
                  value={task.status}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Almost Done">Almost Done</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          )}

          {/* Subtasks Tab */}
          {activeTab === 'subtasks' && (
            <div>
              {/* Progress indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Completion</span>
                  <span className="text-sm text-gray-500">{completionPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-green-500 rounded-full" 
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Subtasks list */}
              <ul className="mb-4 space-y-2">
                {task.subtasks.map(subtask => (
                  <li key={subtask.id} className="flex items-center p-3 bg-gray-50 border rounded-lg">
                    <input 
                      type="checkbox" 
                      checked={subtask.completed}
                      onChange={() => toggleSubtask(subtask.id)}
                      className="w-5 h-5 mr-3 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className={subtask.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                      {subtask.title}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Add new subtask */}
              <div className="flex mt-4">
                <input
                  type="text"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  placeholder="Add a new subtask..."
                  className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                  onClick={addSubtask}
                  className="px-4 py-2 font-medium text-white bg-blue-600 rounded-r-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* Attachments Tab */}
          {activeTab === 'attachments' && (
            <div>
              <ul className="mb-4 space-y-2">
                {task.attachments.map(file => (
                  <li key={file.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-gray-100 rounded">
                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <div>
                      <button className="p-1 text-gray-600 hover:text-gray-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                      </button>
                      <button className="p-1 text-gray-600 hover:text-red-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Upload file button */}
              <div className="mt-4">
                <button className="flex items-center px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  Upload File
                </button>
              </div>
            </div>
          )}

          {/* Related Tasks Tab */}
          {activeTab === 'related' && (
            <div>
              <ul className="mb-4 space-y-2">
                {task.relatedTasks.map(relatedTask => (
                  <li key={relatedTask.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <input type="checkbox" className="w-5 h-5 mr-3 border-2 border-gray-300 rounded" />
                      <div>
                        <p className="font-medium text-gray-800">{relatedTask.title}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500">{relatedTask.course}</span>
                          <span className="mx-2 text-xs text-gray-400">•</span>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            relatedTask.priority === 'high' ? 'bg-red-100 text-red-800' : 
                            relatedTask.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {relatedTask.priority}
                          </span>
                          <span className="mx-2 text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">Due: {relatedTask.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Link task button */}
              <div className="mt-4">
                <button className="flex items-center px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                  Link Another Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons at bottom */}
      <div className="flex justify-between mt-6">
        <button className="px-4 py-2 font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
          Delete Task
        </button>
        <div className="flex space-x-2">
          <button className="px-4 py-2 font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;