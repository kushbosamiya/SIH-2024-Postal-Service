import React from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaHome,
  FaSearch,
  FaMapMarkerAlt,
  FaLocationArrow,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <FaEnvelope className="mr-2" />
          IndiaPost
        </Link>
        <ul className="flex space-x-6 mt-4 md:mt-0">
          <li>
            <Link
              to="/"
              className="hover:text-indigo-200 transition duration-300 flex items-center"
            >
              <FaHome className="mr-1" /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/address-validator"
              className="hover:text-indigo-200 transition duration-300 flex items-center"
            >
              <FaSearch className="mr-1" /> Address Validator
            </Link>
          </li>
          <li>
            <Link
              to="/pincode-lookup"
              className="hover:text-indigo-200 transition duration-300 flex items-center"
            >
              <FaMapMarkerAlt className="mr-1" /> PIN Code Lookup
            </Link>
          </li>
          <li>
            <Link
              to="/nearby-post-offices"
              className="hover:text-indigo-200 transition duration-300 flex items-center"
            >
              <FaLocationArrow className="mr-1" /> Nearby Post Offices
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
