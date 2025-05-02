import React from "react";

const Navbar = () => {
  return (
    <header className="py-6 px-8 sm:px-16 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xl font-bold">
          X
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          ClassroomX
        </h1>
      </div>
      <nav>
        <ul className="flex gap-6">
          <li>
            <a
              href="#features"
              className="hover:text-blue-600 transition-colors"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="hover:text-blue-600 transition-colors"
            >
              Pricing
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-600 transition-colors">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
