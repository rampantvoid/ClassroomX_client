"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/components/auth-provider";

interface CodingQuestion {
  title: string;
  description: string;
  score: number;
  testCases: {
    input: string;
    expectedOutput: string;
    isHidden: boolean;
  }[];
}

export default function CreateLiveCodingSessionPage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const classroomId = React.use(params).classroomId;
  const { user } = useAuth();

  const [sessionData, setSessionData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    classroomId: Number(classroomId),
    facultyId: user.employeeID,
  });

  const [questions, setQuestions] = useState<CodingQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<CodingQuestion>({
    title: "",
    description: "",
    score: 10,
    testCases: [{ input: "", expectedOutput: "", isHidden: false }],
  });

  const addQuestion = () => {
    if (currentQuestion.title && currentQuestion.description) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        title: "",
        description: "",
        score: 10,
        testCases: [{ input: "", expectedOutput: "", isHidden: false }],
      });
    }
  };

  const addTestCase = () => {
    setCurrentQuestion({
      ...currentQuestion,
      testCases: [
        ...currentQuestion.testCases,
        { input: "", expectedOutput: "", isHidden: false },
      ],
    });
  };

  const removeTestCase = (index: number) => {
    const updatedTestCases = currentQuestion.testCases.filter(
      (_, i) => i !== index
    );
    setCurrentQuestion({
      ...currentQuestion,
      testCases: updatedTestCases,
    });
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");

      const payload = {
        ...sessionData,
        startTime: new Date(sessionData.startTime).toISOString(),
        endTime: sessionData.endTime
          ? new Date(sessionData.endTime).toISOString()
          : null,
        questions: questions,
        totalScore: 0,
      };

      console.log(payload);
      const response = await axios.post(
        "http://localhost:3001/faculty/create-session",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Session created:", response.data);

      window.location.href = `/faculty/classroom/${classroomId}`;
    } catch (error) {
      console.error("Error creating live coding session:", error);
    }
  };

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
              Create Live Coding Session
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleCreateSession} className="space-y-6">
          {/* Session Details */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Session Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  value={sessionData.title}
                  onChange={(e) =>
                    setSessionData({ ...sessionData, title: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Live Coding: Data Structures"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={sessionData.description || ""}
                  onChange={(e) =>
                    setSessionData({
                      ...sessionData,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Brief session overview"
                  rows={3}
                />
              </div>
              <div>
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  id="startTime"
                  value={sessionData.startTime}
                  onChange={(e) =>
                    setSessionData({
                      ...sessionData,
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
                  End Time (Optional)
                </label>
                <input
                  type="datetime-local"
                  id="endTime"
                  value={sessionData.endTime || ""}
                  onChange={(e) =>
                    setSessionData({ ...sessionData, endTime: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Coding Questions */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Coding Questions
              </h2>
              <button
                type="button"
                onClick={addQuestion}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
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
                Add Question
              </button>
            </div>

            {/* Current Question Input */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="questionTitle"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Question Title
                  </label>
                  <input
                    type="text"
                    id="questionTitle"
                    value={currentQuestion.title}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        title: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Implement Binary Search"
                  />
                </div>
                <div>
                  <label
                    htmlFor="questionScore"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Question Score
                  </label>
                  <input
                    type="number"
                    id="questionScore"
                    value={currentQuestion.score}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        score: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    min="1"
                    max="100"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="questionDescription"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Question Description
                </label>
                <textarea
                  id="questionDescription"
                  value={currentQuestion.description}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Detailed problem statement"
                  rows={3}
                />
              </div>

              {/* Test Cases */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Test Cases
                  </h3>
                  <button
                    type="button"
                    onClick={addTestCase}
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Add Test Case
                  </button>
                </div>
                {currentQuestion.testCases.map((testCase, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2"
                  >
                    <input
                      type="text"
                      placeholder="Input"
                      value={testCase.input}
                      onChange={(e) => {
                        const updatedTestCases = [...currentQuestion.testCases];
                        updatedTestCases[index].input = e.target.value;
                        setCurrentQuestion({
                          ...currentQuestion,
                          testCases: updatedTestCases,
                        });
                      }}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Expected Output"
                      value={testCase.expectedOutput}
                      onChange={(e) => {
                        const updatedTestCases = [...currentQuestion.testCases];
                        updatedTestCases[index].expectedOutput = e.target.value;
                        setCurrentQuestion({
                          ...currentQuestion,
                          testCases: updatedTestCases,
                        });
                      }}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={testCase.isHidden}
                        onChange={(e) => {
                          const updatedTestCases = [
                            ...currentQuestion.testCases,
                          ];
                          updatedTestCases[index].isHidden = e.target.checked;
                          setCurrentQuestion({
                            ...currentQuestion,
                            testCases: updatedTestCases,
                          });
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Hidden Test Case
                      </span>
                      {currentQuestion.testCases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTestCase(index)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Added Questions List */}
            {questions.length > 0 && (
              <div>
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                  Added Questions
                </h3>
                {questions.map((q, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-2 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {q.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Score: {q.score} | Test Cases: {q.testCases.length}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="text-red-500 hover:text-red-700"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={questions.length === 0}
              className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Live Coding Session
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
