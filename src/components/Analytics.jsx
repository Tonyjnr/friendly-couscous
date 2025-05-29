import PropTypes from "prop-types";

function Analytics({ isMobile }) {
  // Mock data - in a real app, this would come from a backend
  const mockData = {
    taskCompletion: {
      daily: 85,
      weekly: 72,
      monthly: 68,
    },
    studyTime: {
      focus: 120, // minutes
      break: 25, // minutes
      total: 145, // minutes
    },
    courseProgress: [
      { course: "Mathematics", completed: 15, total: 20 },
      { course: "Physics", completed: 8, total: 12 },
      { course: "Computer Science", completed: 12, total: 15 },
    ],
  };

  return (
    <div className={`${isMobile ? "p-4" : "p-8"} max-w-4xl mx-auto`}>
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Completion Rates */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Task Completion Rates</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Daily</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${mockData.taskCompletion.daily}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {mockData.taskCompletion.daily}%
              </span>
            </div>
            <div>
              <p className="text-gray-600">Weekly</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${mockData.taskCompletion.weekly}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {mockData.taskCompletion.weekly}%
              </span>
            </div>
          </div>
        </div>

        {/* Study Time */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Study Time</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Focus Time</span>
              <span className="font-semibold">
                {mockData.studyTime.focus} min
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Break Time</span>
              <span className="font-semibold">
                {mockData.studyTime.break} min
              </span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Time</span>
                <span className="font-semibold">
                  {mockData.studyTime.total} min
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
          <div className="space-y-4">
            {mockData.courseProgress.map((course) => (
              <div key={course.course}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">{course.course}</span>
                  <span className="text-sm text-gray-600">
                    {course.completed}/{course.total} tasks
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${(course.completed / course.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Analytics.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Analytics;
