import { createContext, useContext, useState, useEffect } from "react";

// Sample data
const sampleTasks = [
  {
    id: 1,
    title: "Read Chapter 3",
    course: "History 101",
    courseColor: "bg-red-500",
    priority: "high",
    dueDate: "Today",
    dueTime: "11:59 PM",
    progress: 0,
    status: "Not Started",
    description: "Read pages 45-78 and take notes on key events.",
  },
  {
    id: 2,
    title: "Complete Math Problem Set",
    course: "Calculus II",
    courseColor: "bg-blue-500",
    priority: "medium",
    dueDate: "Today",
    dueTime: "3:00 PM",
    progress: 25,
    status: "In Progress",
    description: "Solve problems 3.1-3.15 in the textbook.",
  },
  {
    id: 3,
    title: "Group Project Meeting",
    course: "Business Ethics",
    courseColor: "bg-green-500",
    priority: "high",
    dueDate: "Today",
    dueTime: "4:30 PM",
    progress: 0,
    status: "Not Started",
    description: "Discuss project timeline and assign roles.",
  },
  {
    id: 4,
    title: "Research Paper Draft",
    course: "Psychology",
    courseColor: "bg-purple-500",
    priority: "medium",
    dueDate: "Tomorrow",
    dueTime: "5:00 PM",
    progress: 50,
    status: "In Progress",
    description: "Complete first draft of research paper on cognitive biases.",
  },
  {
    id: 5,
    title: "Midterm Exam",
    course: "Computer Science",
    courseColor: "bg-yellow-500",
    priority: "high",
    dueDate: "In 2 days",
    dueTime: "10:00 AM",
    progress: 75,
    status: "In Progress",
    description: "Study chapters 1-5 for midterm exam.",
  },
  {
    id: 6,
    title: "Lab Report",
    course: "Chemistry",
    courseColor: "bg-indigo-500",
    priority: "medium",
    dueDate: "In 3 days",
    dueTime: "11:59 PM",
    progress: 30,
    status: "In Progress",
    description: "Write up results from last week's experiment.",
  },
  {
    id: 7,
    title: "Essay Outline",
    course: "English Literature",
    courseColor: "bg-pink-500",
    priority: "low",
    dueDate: "In 4 days",
    dueTime: "11:59 PM",
    progress: 10,
    status: "Not Started",
    description:
      "Create outline for comparative essay on 19th century authors.",
  },
];

const sampleCourses = [
  {
    id: 1,
    name: "History 101",
    color: "bg-red-500",
    tasksCount: 4,
    completedCount: 1,
  },
  {
    id: 2,
    name: "Calculus II",
    color: "bg-blue-500",
    tasksCount: 7,
    completedCount: 3,
  },
  {
    id: 3,
    name: "Business Ethics",
    color: "bg-green-500",
    tasksCount: 5,
    completedCount: 2,
  },
  {
    id: 4,
    name: "Psychology",
    color: "bg-purple-500",
    tasksCount: 3,
    completedCount: 0,
  },
  {
    id: 5,
    name: "Computer Science",
    color: "bg-yellow-500",
    tasksCount: 6,
    completedCount: 4,
  },
  {
    id: 6,
    name: "Chemistry",
    color: "bg-indigo-500",
    tasksCount: 4,
    completedCount: 1,
  },
  {
    id: 7,
    name: "English Literature",
    color: "bg-pink-500",
    tasksCount: 3,
    completedCount: 1,
  },
];

// Create context
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    // In a real app, this would be an API call
    setTasks(sampleTasks);
    setCourses(sampleCourses);
    setLoading(false);
  }, []);

  // Add a new task
  const addTask = (newTask) => {
    // Find course color
    const courseObj = courses.find((c) => c.name === newTask.course);
    const courseColor = courseObj ? courseObj.color : "bg-gray-500";

    // Create new task object
    const task = {
      id: tasks.length + 1,
      ...newTask,
      courseColor,
      progress: 0,
      status: "Not Started",
    };

    // Add to tasks
    setTasks([...tasks, task]);

    // Update course stats
    if (courseObj) {
      setCourses((prevCourses) =>
        prevCourses.map((c) => {
          if (c.id === courseObj.id) {
            return { ...c, tasksCount: c.tasksCount + 1 };
          }
          return c;
        })
      );
    }

    return task;
  };

  // Update a task
  const updateTask = (taskId, updatedData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, ...updatedData };
        }
        return task;
      })
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    if (taskToDelete) {
      // Update course stats
      const courseObj = courses.find((c) => c.name === taskToDelete.course);
      if (courseObj) {
        setCourses((prevCourses) =>
          prevCourses.map((c) => {
            if (c.id === courseObj.id) {
              return {
                ...c,
                tasksCount: c.tasksCount - 1,
                completedCount:
                  taskToDelete.status === "Completed"
                    ? Math.max(0, c.completedCount - 1)
                    : c.completedCount,
              };
            }
            return c;
          })
        );
      }

      // Remove task
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  // Toggle task status
  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const newStatus =
            task.status === "Completed" ? "Not Started" : "Completed";
          const newProgress = newStatus === "Completed" ? 100 : 0;

          // Update course stats
          const courseObj = courses.find((c) => c.name === task.course);
          if (courseObj) {
            setCourses((prevCourses) =>
              prevCourses.map((c) => {
                if (c.id === courseObj.id) {
                  return {
                    ...c,
                    completedCount:
                      newStatus === "Completed"
                        ? c.completedCount + 1
                        : Math.max(0, c.completedCount - 1),
                  };
                }
                return c;
              })
            );
          }

          return { ...task, status: newStatus, progress: newProgress };
        }
        return task;
      })
    );
  };

  // Add a new course
  const addCourse = (newCourse) => {
    const course = {
      id: courses.length + 1,
      ...newCourse,
      tasksCount: 0,
      completedCount: 0,
    };

    setCourses([...courses, course]);
    return course;
  };

  // Update a course
  const updateCourse = (courseId, updatedData) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          return { ...course, ...updatedData };
        }
        return course;
      })
    );
  };

  // Delete a course
  const deleteCourse = (courseId) => {
    const courseToDelete = courses.find((course) => course.id === courseId);
    if (courseToDelete) {
      // Remove all tasks associated with this course
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.course !== courseToDelete.name)
      );

      // Remove course
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
    }
  };

  // Filter tasks by various criteria
  const filterTasks = (filters = {}) => {
    return tasks.filter((task) => {
      // Filter by course
      if (
        filters.course &&
        filters.course !== "all" &&
        task.course !== filters.course
      ) {
        return false;
      }

      // Filter by priority
      if (
        filters.priority &&
        filters.priority !== "all" &&
        task.priority !== filters.priority
      ) {
        return false;
      }

      // Filter by status
      if (
        filters.status &&
        filters.status !== "all" &&
        task.status !== filters.status
      ) {
        return false;
      }

      // Filter by search term
      if (
        filters.searchTerm &&
        !task.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filter by due date
      if (filters.dueDate) {
        if (filters.dueDate === "today" && task.dueDate !== "Today") {
          return false;
        }
        if (filters.dueDate === "upcoming" && task.dueDate === "Today") {
          return false;
        }
      }

      return true;
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        courses,
        loading,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        addCourse,
        updateCourse,
        deleteCourse,
        filterTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
