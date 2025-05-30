import PropTypes from "prop-types";
import { useThemeContext } from "../context/ThemeContext";

const wireframes = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Main dashboard showing task overview and progress",
    icon: (
      <svg className="w-8 h-8 mb-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
      </svg>
    )
  },
  {
    id: "tasklist",
    title: "Task List",
    description: "Filterable list of all tasks",
    icon: (
      <svg className="w-8 h-8 mb-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
      </svg>
    )
  },
  {
    id: "calendar",
    title: "Calendar View",
    description: "Calendar interface for scheduling and deadlines",
    icon: (
      <svg className="w-8 h-8 mb-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    )
  },
  {
    id: "taskdetail",
    title: "Task Detail",
    description: "Detailed view of individual tasks",
    icon: (
      <svg className="w-8 h-8 mb-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
      </svg>
    )
  },
  {
    id: "focus",
    title: "Focus Mode",
    description: "Distraction-free study mode with Pomodoro timer",
    icon: (
      <svg className="w-8 h-8 mb-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    )
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Study patterns and productivity insights",
    icon: (
      <svg className="w-8 h-8 mb-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
      </svg>
    )
  },
  {
    id: "course",
    title: "Course Management",
    description: "Course organization and tracking",
    icon: (
      <svg className="w-8 h-8 mb-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
    )
  },
];

function WireframeViewer({ onViewChange }) {
  const { darkMode } = useThemeContext();

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">StudyTrack</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A comprehensive task management application designed specifically for students
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wireframes.map((wireframe) => (
          <div
            key={wireframe.id}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 hover:transform hover:scale-105 flex flex-col items-center text-center"
            onClick={() => onViewChange(wireframe.id)}
          >
            {wireframe.icon}
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{wireframe.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{wireframe.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Click on any card above to view the wireframe
        </p>
      </div>
    </div>
  );
}

WireframeViewer.propTypes = {
  onViewChange: PropTypes.func.isRequired,
};

export default WireframeViewer;