import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">

        {/* Logo / Title */}
        <Link to="/" className="text-2xl font-semibold">
          Library System
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 text-lg">
          <Link to="/availability" className="hover:text-gray-200">
            Book Availability
          </Link>

          <Link to="/waitlist" className="hover:text-gray-200">
            Waitlist
          </Link>

          <Link to="/notifications" className="hover:text-gray-200">
            Notifications
          </Link>

          <Link to="/feedback" className="hover:text-gray-200">
            Feedback
          </Link>

          <Link to="/help" className="hover:text-gray-200">
            Help
          </Link>
        </div>
      </div>
    </nav>
  );
}
