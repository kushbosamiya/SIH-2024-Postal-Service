import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBuilding,
  FaSpinner,
} from "react-icons/fa";
import { getNearbyPostOffices } from "../db/mockdatabase";

const PostOfficeCard = ({ name, distance }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex items-center mb-2">
      <FaBuilding className="text-indigo-500 mr-2" />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    </div>
    <p className="text-gray-600 flex items-center">
      <FaMapMarkerAlt className="text-indigo-500 mr-2" />
      Distance: {distance} km
    </p>
  </motion.div>
);

const PinCodeLookup = () => {
  const [pinCode, setPinCode] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const postOffices = getNearbyPostOffices(pinCode);
      setResult(postOffices);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
          <h1 className="text-3xl font-bold text-center text-white mb-4">
            PIN Code Lookup
          </h1>
          <p className="text-center text-white mb-6">
            Find nearby post offices by entering a PIN code
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="pinCode"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Enter PIN Code
              </label>
              <input
                type="text"
                id="pinCode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                placeholder="e.g. 400001"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 w-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <FaSearch className="mr-2" />
                  Find Nearby Post Offices
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-green-500 to-teal-600">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Post Offices in {result.city}
            </h2>
            <p className="text-white text-opacity-80">
              Found {result.postOffices.length} nearby post offices
            </p>
          </div>
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {result.postOffices.map((po, index) => (
                <PostOfficeCard
                  key={index}
                  name={po.name}
                  distance={po.distance}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PinCodeLookup;
