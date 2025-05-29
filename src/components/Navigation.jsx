import PropTypes from "prop-types";

function Navigation({ isMobile, onViewChange, currentView }) {
  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "tasklist", icon: "📝", label: "Tasks" },
    { id: "calendar", icon: "📅", label: "Calendar" },
    { id: "focus", icon: "🎯", label: "Focus" },
    { id: "analytics", icon: "📈", label: "Analytics" },
    { id: "course", icon: "📚", label: "Courses" },
  ];

  const handleNavClick = (viewId) => {
    if (viewId !== currentView) {
      onViewChange(viewId);
    }
  };

  if (isMobile) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center p-2 ${
                currentView === item.id ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="h-full py-4">
      <div className="flex flex-col items-center space-y-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg transition-colors ${
              currentView === item.id
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title={item.label}
          >
            <span className="text-xl">{item.icon}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  onViewChange: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
};

export default Navigation;
