import PropTypes from "prop-types";

const wireframes = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Main dashboard showing task overview and progress",
  },
  {
    id: "tasklist",
    title: "Task List",
    description: "Filterable list of all tasks",
  },
  {
    id: "calendar",
    title: "Calendar View",
    description: "Calendar interface for scheduling and deadlines",
  },
  {
    id: "taskdetail",
    title: "Task Detail",
    description: "Detailed view of individual tasks",
  },
  {
    id: "focus",
    title: "Focus Mode",
    description: "Distraction-free study mode with Pomodoro timer",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Study patterns and productivity insights",
  },
  {
    id: "course",
    title: "Course Management",
    description: "Course organization and tracking",
  },
];

function WireframeViewer({ onViewChange }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">StudyTrack Wireframes</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wireframes.map((wireframe) => (
          <div
            key={wireframe.id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow"
            onClick={() => onViewChange(wireframe.id)}
          >
            <h2 className="text-xl font-semibold mb-2">{wireframe.title}</h2>
            <p className="text-gray-600">{wireframe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

WireframeViewer.propTypes = {
  onViewChange: PropTypes.func.isRequired,
};

export default WireframeViewer;
