import React from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaMapPin,
  FaBuilding,
  FaUser,
  FaRoad,
  FaCity,
} from "react-icons/fa";

const ResultsDisplay = ({ results }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow-lg rounded-lg border-t-4 border-green-500"
    >
      <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
        <FaCheckCircle className="mr-2 text-green-600" />
        Address Validated Successfully
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultItem icon={FaUser} label="Name" value={results.name} />
        <ResultItem icon={FaRoad} label="Street" value={results.street} />
        <ResultItem icon={FaCity} label="City" value={results.city} />
        <ResultItem
          icon={FaMapPin}
          label="Corrected PIN Code"
          value={results.pinCode}
        />
        <ResultItem
          icon={FaBuilding}
          label="Delivery Post Office"
          value={results.postOffice}
        />
      </div>
    </motion.div>
  );
};

const ResultItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start p-3 bg-green-50 rounded-lg">
    <Icon className="mr-3 text-green-600 mt-1 flex-shrink-0" />
    <div>
      <p className="text-sm font-medium text-green-800">{label}</p>
      <p className="text-base text-green-700">{value}</p>
    </div>
  </div>
);

export default ResultsDisplay;
