import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaCamera, FaSpinner } from "react-icons/fa";
import ResultsDisplay from "./ResultsDisplay";

const AddressForm = () => {
  const [fullAddress, setFullAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsScanning(true);
    // Simulate address validation
    setTimeout(() => {
      setValidationResult(
        isImage
          ? {
              name: "ashish baraiya",
              street: "amarnath",
              city: "Rajkot",
              pinCode: "360002",
              postOffice: "Rajkot Bhaktinagar",
            }
          : {
              name: "kapil khatri",
              street: "Hudko",
              city: "Rajkot",
              pinCode: "360002",
              postOffice: "Rajkot Bhaktinagar",
            }
      );
      setIsImage(false);
      setIsScanning(false);
    }, 1500);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setIsImage(true);
    if (file) {
      setIsScanning(true);
      // Simulate image processing delay
      setTimeout(() => {
        const mockExtractedAddress = "ashish baraiya amarnath Rajkot 360001";
        setFullAddress(mockExtractedAddress);
        setIsScanning(false);
      }, 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h1 className="text-3xl font-bold text-center text-white mb-4">
            Address Validator
          </h1>
          <p className="text-center text-white mb-6">
            Enter a full address or upload an image to validate and correct the
            address information.
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="fullAddress"
                className="block text-sm font-medium text-gray-700"
              >
                <FaSearch className="inline mr-2 h-4 w-4" />
                Enter Full Address or Scan Image
              </label>
              <textarea
                id="fullAddress"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                rows="3"
                placeholder="e.g. John Doe 123 Main St Mumbai 400001"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <motion.label
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  htmlFor="imageUpload"
                  className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 flex items-center"
                >
                  <FaCamera className="mr-2 h-4 w-4" />
                  Scan Image
                </motion.label>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <FaSpinner className="inline-block mr-2 h-4 w-4 animate-spin" />
                    Validating...
                  </>
                ) : (
                  "Validate Address"
                )}
              </motion.button>
            </div>
          </form>

          {isScanning && !validationResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center"
            >
              <FaSpinner className="animate-spin h-5 w-5 mr-3" />
              <span>Processing... Please wait.</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {validationResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <ResultsDisplay results={validationResult} />
        </motion.div>
      )}
    </div>
  );
};

export default AddressForm;
