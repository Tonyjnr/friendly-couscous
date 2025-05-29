import PropTypes from "prop-types";

function CourseManagement({ isMobile }) {
  // Mock data - in a real app, this would come from a backend
  const mockCourses = [
    {
      id: 1,
      name: "Mathematics",
      instructor: "Dr. Smith",
      schedule: "MWF 10:00 AM",
      color: "blue",
      totalTasks: 20,
      completedTasks: 15,
      upcomingDeadlines: 2,
    },
    {
      id: 2,
      name: "Physics",
      instructor: "Prof. Johnson",
      schedule: "TTh 1:30 PM",
      color: "green",
      totalTasks: 12,
      completedTasks: 8,
      upcomingDeadlines: 1,
    },
    {
      id: 3,
      name: "Computer Science",
      instructor: "Dr. Williams",
      schedule: "MWF 2:00 PM",
      color: "purple",
      totalTasks: 15,
      completedTasks: 12,
      upcomingDeadlines: 3,
    },
  ];

  return (
    <div className={`${isMobile ? "p-4" : "p-8"} max-w-4xl mx-auto`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Course
        </button>
      </div>

      <div className="grid gap-6">
        {mockCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
                <p className="text-gray-600">{course.instructor}</p>
                <p className="text-gray-600">{course.schedule}</p>
              </div>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: course.color }}
              ></div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Task Completion</span>
                  <span className="text-sm text-gray-600">
                    {course.completedTasks}/{course.totalTasks}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${
                        (course.completedTasks / course.totalTasks) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-orange-500 font-medium">
                  {course.upcomingDeadlines} upcoming{" "}
                  {course.upcomingDeadlines === 1 ? "deadline" : "deadlines"}
                </span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

CourseManagement.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default CourseManagement;
