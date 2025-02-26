"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("faculty");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Faculty-specific field
  const [employeeId, setEmployeeId] = useState("");

  // Student-specific fields
  const [sap, setSap] = useState("");
  const [roll, setRoll] = useState("");
  const [batch, setBatch] = useState("");
  const [semester, setSemester] = useState("1");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would typically register with your backend
    const userData =
      userType === "faculty"
        ? {
            firstName,
            lastName,
            email,
            password,
            employeeId,
            userType,
          }
        : {
            firstName,
            lastName,
            email,
            password,
            sap,
            roll,
            batch,
            semester,
            userType,
          };

    console.log("Signing up with:", userData);

    setIsLoading(false);
    // Redirect to dashboard on success
    // window.location.href = "/dashboard";
  };

  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  return (
    <div className="w-full max-w-md">
      {/* Mobile logo (only shown on small screens) */}
      <div className="flex items-center gap-2 mb-8 md:hidden">
        <div className="bg-blue-600 text-white p-2 rounded-lg text-xl font-bold">
          X
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          ClassroomX
        </h1>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Create your account
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Join ClassroomX and start transforming your{" "}
          {userType === "faculty" ? "teaching" : "learning"} experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="userType"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            I am a
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setUserType("faculty")}
              className={`py-2 px-4 border rounded-md text-sm font-medium ${
                userType === "faculty"
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Faculty
            </button>
            <button
              type="button"
              onClick={() => setUserType("student")}
              className={`py-2 px-4 border rounded-md text-sm font-medium ${
                userType === "student"
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Student
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800"
              placeholder="John"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800"
            placeholder="••••••••"
          />
          <p className="mt-1 text-xs text-gray-500">
            Must be at least 8 characters with 1 uppercase, 1 number and 1
            special character
          </p>
        </div>

        {userType === "faculty" ? (
          <div>
            <label
              htmlFor="employeeId"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Employee ID
            </label>
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              required
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800"
              placeholder="EMP12345"
            />
          </div>
        ) : (
          <>
            <div>
              <label
                htmlFor="sap"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                SAP
              </label>
              <input
                id="sap"
                name="sap"
                type="number"
                required
                value={sap}
                onChange={(e) => setSap(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800"
                placeholder="SAP12345"
              />
            </div>
            <div>
              <label
                htmlFor="roll"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Roll
              </label>
              <input
                id="roll"
                name="roll"
                type="text"
                required
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800"
                placeholder="R214XXXXXXX"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="batch"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Batch
                </label>
                <input
                  id="batch"
                  name="batch"
                  type="number"
                  required
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800"
                  placeholder="1"
                />
              </div>
              <div>
                <label
                  htmlFor="semester"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Semester
                </label>
                <select
                  id="semester"
                  name="semester"
                  required
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800"
                >
                  {semesters.map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        <div className="flex items-center">
          <input
            id="agree-terms"
            name="agree-terms"
            type="checkbox"
            required
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="agree-terms"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading || !agreeTerms}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
