import { useState } from 'react';
import WireframeViewer from './components/WireframeViewer';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import CalendarView from './components/CalendarView';
import TaskDetail from './components/TaskDetail';
import FocusMode from './components/FocusMode';
import Analytics from './components/Analytics';
import CourseManagement from './components/CourseManagement';
import Navigation from './components/Navigation';

function App() {
  const [currentView, setCurrentView] = useState('viewer');
  const [mobileView, setMobileView] = useState(false);

  // Handle view switching for the wireframes
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Toggle between mobile and desktop view
  const toggleDeviceView = () => {
    setMobileView(!mobileView);
  };

  // Render the appropriate component based on the current view
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard isMobile={mobileView} />;
      case 'tasklist':
        return <TaskList isMobile={mobileView} />;
      case 'calendar':
        return <CalendarView isMobile={mobileView} />;
      case 'taskdetail':
        return <TaskDetail isMobile={mobileView} />;
      case 'focus':
        return <FocusMode isMobile={mobileView} />;
      case 'analytics':
        return <Analytics isMobile={mobileView} />;
      case 'course':
        return <CourseManagement isMobile={mobileView} />;
      case 'viewer':
      default:
        return <WireframeViewer onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView !== 'viewer' && (
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
          <button
            onClick={() => setCurrentView('viewer')}
            className="px-4 py-2 font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
          >
            Back to Wireframe List
          </button>
          <div className="flex items-center">
            <span className="mr-2 font-medium">View Mode:</span>
            <button
              onClick={toggleDeviceView}
              className={`px-4 py-2 font-medium border rounded ${
                mobileView
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 border-blue-600'
              }`}
            >
              {mobileView ? 'Mobile View' : 'Desktop View'}
            </button>
          </div>
        </div>
      )}

      <div 
        className={`transition-all duration-300 ${
          mobileView && currentView !== 'viewer' 
            ? 'max-w-sm mx-auto' 
            : 'container mx-auto'
        }`}
      >
        {renderContent()}
      </div>

      {currentView !== 'viewer' && mobileView && (
        <div className="fixed bottom-0 left-0 right-0">
          <Navigation isMobile={true} onViewChange={handleViewChange} currentView={currentView} />
        </div>
      )}
      
      {currentView !== 'viewer' && !mobileView && (
        <div className="fixed top-0 left-0 bottom-0 w-16 bg-white shadow-md">
          <Navigation isMobile={false} onViewChange={handleViewChange} currentView={currentView} />
        </div>
      )}
    </div>
  );
}

export default App;