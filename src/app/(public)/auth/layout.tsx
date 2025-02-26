// app/auth/layout.tsx
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Branding and info */}
      <div className="hidden md:flex flex-col bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 justify-between">
        <div>
          <div className="flex items-center gap-2 mb-12">
            <div className="bg-white text-blue-600 p-2 rounded-lg text-xl font-bold">
              X
            </div>
            <h1 className="text-2xl font-bold">ClassroomX</h1>
          </div>

          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-6">
              Transform Your Teaching Experience
            </h2>
            <p className="text-lg opacity-90">
              Join thousands of educators who are enhancing student engagement
              and learning outcomes with our innovative platform.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p>Interactive learning tools</p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p>Real-time student progress tracking</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p>Collaborative classroom tools</p>
          </div>
        </div>

        <div className="text-sm opacity-80 mt-12">
          © {new Date().getFullYear()} ClassroomX. All rights reserved.
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex justify-center items-center p-6">{children}</div>
    </div>
  );
}
