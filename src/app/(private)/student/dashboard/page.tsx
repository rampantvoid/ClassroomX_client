"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/components/auth-provider";

export default function Dashboard() {
  const { setUser } = useAuth();
  const [user, setUserData] = useState({
    createdAt: "",
    email: "",
    sap: null,
    firstName: "",
    lastName: "",
    updatedAt: "",
  });
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("student"); // Changed default to faculty for testing
  const [userName, setUserName] = useState("John Doe");
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [newClassData, setNewClassData] = useState({
    course: "",
    semester: "FOUR",
    batches: [{ batchId: 1, semester: "FOUR" }],
  });
  const [batchInputs, setBatchInputs] = useState([1]);
  const [studentCourses, setStudentClasses] = useState([
    {
      classroomId: 3,
      batchId: 1,
      semester: "SIX",
      classroom: {
        id: 3,
        createdAt: "2025-03-23T08:51:30.133Z",
        updatedAt: "2025-03-23T08:51:30.133Z",
        course: "DS",
        semester: "SIX",
        facultyID: 500106010,
      },
    },
  ]);

  const getUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");

      if (!token) window.location.href = "/";

      const request = await axios.get("http://localhost:3001/student/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(request.data);
      setUserData(request.data);
      setUser(request.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getClasses = async () => {
    try {
      const token = await localStorage.getItem("access_token");

      if (!token) window.location.href = "/";

      const request = await axios.get(
        "http://localhost:3001/student/classrooms",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(request);
      setStudentClasses(request.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getClasses();
  }, []);

  if (loading) return <></>;
  else
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
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user.firstName} {user.lastName}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Stay on top of your courses and assignments.
            </p>
          </div>

          {/* Classes/Courses */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {userType === "faculty" ? "Your Classes" : "Your Courses"}
              </h3>
            </div>
            <div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {studentCourses.map((course, idx) => (
                  <Link
                    key={course.classroomId}
                    href={`/course/${course.classroomId}`}
                    className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <li className="p-6 ">
                      <div>
                        <h4 className="text-md font-medium text-gray-900 dark:text-white">
                          {course.classroom.course}
                        </h4>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
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
      </div>
    );
}
