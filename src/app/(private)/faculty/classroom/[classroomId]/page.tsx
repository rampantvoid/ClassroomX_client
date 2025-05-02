"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/components/auth-provider";

interface Session {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  topic: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

export default function ClassroomDetailPage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const { user } = useAuth();
  const classroomId = React.use(params).classroomId;
  const [classroom, setClassroom] = useState({
    id: 1,
    createdAt: "2025-03-23T07:57:33.191Z",
    updatedAt: "2025-03-23T07:57:33.191Z",
    course: "DS",
    semester: "FOUR",
    facultyID: 500106010,
    batches: [
      {
        classroomId: 1,
        batchId: 1,
        semester: "FOUR",
      },
      {
        classroomId: 1,
        batchId: 2,
        semester: "FOUR",
      },
    ],
    sessions: [
      {
        id: 1,
        createdAt: "2025-03-26T14:11:43.299Z",
        updatedAt: "2025-03-26T14:11:43.299Z",
        classroomId: 1,
        facultyId: 500106010,
        title: "BST",
        description: "Creating BST",
        startTime: "2025-03-20T13:56:00.000Z",
        endTime: "2025-03-26T13:59:00.000Z",
        isActive: true,
        totalScore: 0,
      },
      {
        id: 2,
        createdAt: "2025-03-26T14:30:50.879Z",
        updatedAt: "2025-03-26T14:30:50.879Z",
        classroomId: 1,
        facultyId: 500106010,
        title: "Linked List",
        description: "Study about linked list",
        startTime: "2025-03-26T13:56:00.000Z",
        endTime: "2025-03-26T16:01:00.000Z",
        isActive: true,
        totalScore: 0,
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  const getClassroom = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      if (!token) window.location.href = "/";

      const request = await axios.get(
        `http://localhost:3001/faculty/classroom/${classroomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClassroom(request.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClassroom();
    console.log("user", user);
  }, []);

  const [showCreateSessionModal, setShowCreateSessionModal] = useState(false);
  const [newSessionData, setNewSessionData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    topic: "",
  });

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");

      // Placeholder for API call to create session
      const request = await axios.post(
        "http://localhost:3001/classroom/sessions/create",
        {
          ...newSessionData,
          classroomId: classroom.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowCreateSessionModal(false);
      setNewSessionData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        topic: "",
      });
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  if (loading) return <></>;
  else
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {classroom.course} - Batches{" "}
                {classroom.batches.map((batch, _) => (
                  <span key={batch.batchId}> {batch.batchId}</span>
                ))}
              </h1>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Semester {classroom.semester}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Sessions
              </h3>
              <Link href={`${classroomId}/createSession`}>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create Session
                </button>
              </Link>
            </div>

            {/* Sessions List */}
            <div className="space-y-4">
              {classroom.sessions.length ? (
                classroom.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                  >
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                        {session.title}
                      </h4>
                      <div className="text-sm">
                        {session.startTime.split("T")[0]}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span className="">
                          {session.startTime.split("T")[1].split(".")[0]} -{" "}
                          {session.endTime.split("T")[1].split(".")[0]}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                        Topic: {session.description}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-md border-blue-600 border p-4 justify-center items-center flex">
                  No session
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Create Session Modal */}
        {showCreateSessionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Create New Session
                </h3>
                <button
                  onClick={() => setShowCreateSessionModal(false)}
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
              <form onSubmit={handleCreateSession}>
                <div className="space-y-4">
                  {/* Session Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Session Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={newSessionData.title}
                      onChange={(e) =>
                        setNewSessionData({
                          ...newSessionData,
                          title: e.target.value,
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="e.g. Introduction to Trees"
                      required
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={newSessionData.date}
                      onChange={(e) =>
                        setNewSessionData({
                          ...newSessionData,
                          date: e.target.value,
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>

                  {/* Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="startTime"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Start Time
                      </label>
                      <input
                        type="time"
                        id="startTime"
                        value={newSessionData.startTime}
                        onChange={(e) =>
                          setNewSessionData({
                            ...newSessionData,
                            startTime: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="endTime"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        End Time
                      </label>
                      <input
                        type="time"
                        id="endTime"
                        value={newSessionData.endTime}
                        onChange={(e) =>
                          setNewSessionData({
                            ...newSessionData,
                            endTime: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Topic */}
                  <div>
                    <label
                      htmlFor="topic"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Topic
                    </label>
                    <input
                      type="text"
                      id="topic"
                      value={newSessionData.topic}
                      onChange={(e) =>
                        setNewSessionData({
                          ...newSessionData,
                          topic: e.target.value,
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="e.g. Binary Search Trees"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateSessionModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Create Session
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
}
