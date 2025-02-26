"use client";
import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [userType, setUserType] = useState("faculty"); // Changed default to faculty for testing
  const [userName, setUserName] = useState("John Doe");
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [newClassData, setNewClassData] = useState({
    course: "",
    semester: "FOUR",
    batches: [{ batchId: 1, semester: "FOUR" }],
  });
  const [batchInputs, setBatchInputs] = useState([1]);

  // Sample data for faculty
  const facultyClasses = [
    {
      id: 1,
      name: "Introduction to Computer Science",
      code: "CS101",
      students: 45,
      next: "Today, 10:00 AM",
    },
    {
      id: 2,
      name: "Data Structures",
      code: "CS201",
      students: 38,
      next: "Tomorrow, 2:00 PM",
    },
    {
      id: 3,
      name: "Algorithms",
      code: "CS301",
      students: 30,
      next: "Friday, 11:00 AM",
    },
  ];

  // Sample data for students
  const studentCourses = [
    {
      id: 1,
      name: "Introduction to Computer Science",
      code: "CS101",
      instructor: "Dr. Smith",
      next: "Today, 10:00 AM",
    },
    {
      id: 2,
      name: "Calculus I",
      code: "MATH101",
      instructor: "Prof. Johnson",
      next: "Tomorrow, 9:00 AM",
    },
    {
      id: 3,
      name: "Physics 101",
      code: "PHYS101",
      instructor: "Dr. Brown",
      next: "Wednesday, 1:00 PM",
    },
  ];

  // Function to handle adding a batch
  const addBatch = () => {
    const lastBatchId = batchInputs[batchInputs.length - 1] || 0;
    const newBatchId = lastBatchId + 1;
    setBatchInputs([...batchInputs, newBatchId]);
    setNewClassData({
      ...newClassData,
      batches: [
        ...newClassData.batches,
        { batchId: newBatchId, semester: newClassData.semester },
      ],
    });
  };

  // Function to handle removing a batch
  const removeBatch = (batchIdToRemove: any) => {
    if (batchInputs.length <= 1) return; // Keep at least one batch
    setBatchInputs(batchInputs.filter((id) => id !== batchIdToRemove));
    setNewClassData({
      ...newClassData,
      batches: newClassData.batches.filter(
        (batch) => batch.batchId !== batchIdToRemove
      ),
    });
  };

  // Function to handle batch change
  const handleBatchChange = (batchId: any, newValue: any) => {
    setNewClassData({
      ...newClassData,
      batches: newClassData.batches.map((batch) =>
        batch.batchId === batchId
          ? {
              ...batch,
              batchId: parseInt(newValue),
              semester: newClassData.semester,
            }
          : batch
      ),
    });
  };

  // Function to handle semester change
  const handleSemesterChange = (newSemester: any) => {
    setNewClassData({
      ...newClassData,
      semester: newSemester,
      batches: newClassData.batches.map((batch) => ({
        ...batch,
        semester: newSemester,
      })),
    });
  };

  // Function to handle form submission
  const handleCreateClass = (e: any) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log("Creating new class with data:", newClassData);
    // Close the modal
    setShowCreateClassModal(false);
    // Reset form
    setNewClassData({
      course: "",
      semester: "FOUR",
      batches: [{ batchId: 1, semester: "FOUR" }],
    });
    setBatchInputs([1]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg text-xl font-bold">
              X
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              ClassroomX
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                <span>{userName}</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="/api/placeholder/40/40"
                  alt="User avatar"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {userName}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {userType === "faculty"
              ? "Manage your classes and keep track of your teaching schedule."
              : "Stay on top of your courses and assignments."}
          </p>
        </div>

        {/* Quick Actions - Only visible to faculty */}
        {userType === "faculty" && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div>
              <button
                onClick={() => setShowCreateClassModal(true)}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Create New Class
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Classes/Courses */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {userType === "faculty" ? "Your Classes" : "Your Courses"}
            </h3>
          </div>
          <div>
            {userType === "faculty" ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {facultyClasses.map((cls) => (
                  <li
                    key={cls.id}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Link
                      href={`/class/${cls.id}`}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <h4 className="text-md font-medium text-gray-900 dark:text-white">
                          {cls.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {cls.code} • {cls.students} students
                        </p>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>Next class: {cls.next}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {studentCourses.map((course) => (
                  <li
                    key={course.id}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Link
                      href={`/course/${course.id}`}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <h4 className="text-md font-medium text-gray-900 dark:text-white">
                          {course.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {course.code} • {course.instructor}
                        </p>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>Next class: {course.next}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700">
            <Link
              href={
                userType === "faculty" ? "/classes/create" : "/courses/browse"
              }
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {userType === "faculty"
                ? "Create new class"
                : "Browse more courses"}{" "}
              →
            </Link>
          </div>
        </div>
      </main>

      {/* Create Class Modal */}
      {showCreateClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Create New Class
              </h3>
              <button
                onClick={() => setShowCreateClassModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleCreateClass}>
              <div className="space-y-4">
                {/* Course Name */}
                <div>
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Course Code
                  </label>
                  <input
                    type="text"
                    id="course"
                    value={newClassData.course}
                    onChange={(e) =>
                      setNewClassData({
                        ...newClassData,
                        course: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. DS"
                    required
                  />
                </div>

                {/* Semester */}
                <div>
                  <label
                    htmlFor="semester"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Semester
                  </label>
                  <select
                    id="semester"
                    value={newClassData.semester}
                    onChange={(e) => handleSemesterChange(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="ONE">ONE</option>
                    <option value="TWO">TWO</option>
                    <option value="THREE">THREE</option>
                    <option value="FOUR">FOUR</option>
                    <option value="FIVE">FIVE</option>
                    <option value="SIX">SIX</option>
                    <option value="SEVEN">SEVEN</option>
                    <option value="EIGHT">EIGHT</option>
                  </select>
                </div>

                {/* Batches */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Batches
                  </label>
                  <div className="space-y-3">
                    {batchInputs.map((batchId, index) => (
                      <div
                        key={batchId}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="number"
                          value={
                            newClassData.batches.find(
                              (b) => b.batchId === batchId
                            )?.batchId || ""
                          }
                          onChange={(e) =>
                            handleBatchChange(batchId, e.target.value)
                          }
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Batch ID"
                          min="1"
                          required
                        />
                        {batchInputs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBatch(batchId)}
                            className="p-2 text-red-600 hover:text-red-800"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addBatch}
                    className="mt-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <svg
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Batch
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateClassModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Create Class
                </button>
              </div>
            </form>

            {/* JSON Preview (for development) */}
            {/* <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Generated JSON:
              </p>
              <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-auto max-h-32">
                {JSON.stringify(newClassData, null, 2)}
              </pre>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
