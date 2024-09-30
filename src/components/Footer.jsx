import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">IndiaPost</h3>
            <p className="text-indigo-200 mb-4">
              Connecting India, Delivering Trust
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-indigo-300 hover:text-white transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-indigo-300 hover:text-white transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-indigo-300 hover:text-white transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-indigo-300 hover:text-white transition-colors duration-300"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-indigo-200 hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/address-validator"
                  className="text-indigo-200 hover:text-white transition-colors duration-300"
                >
                  Address Validation
                </Link>
              </li>
              <li>
                <Link
                  to="/pincode-lookup"
                  className="text-indigo-200 hover:text-white transition-colors duration-300"
                >
                  PIN Code Lookup
                </Link>
              </li>
              <li>
                <Link
                  to="/nearby-post-offices"
                  className="text-indigo-200 hover:text-white transition-colors duration-300"
                >
                  Nearby Post Offices
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
            <p className="text-indigo-200 mb-4">
              Stay updated with our latest news and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-indigo-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-r-md transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-indigo-700 text-center text-indigo-300">
          <p>
            &copy; {new Date().getFullYear()} IndiaPost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
