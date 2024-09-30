import React from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaArrowRight,
  FaLocationArrow,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  const services = [
    {
      icon: <FaSearch className="text-indigo-500" />,
      title: "Address Validation",
      description: "Validate and correct addresses for accurate delivery",
      to: "/address-validator",
    },
    {
      icon: <FaMapMarkerAlt className="text-indigo-500" />,
      title: "PIN Code Lookup",
      description: "Find the correct PIN code for any address",
      to: "/pincode-lookup",
    },
    {
      icon: <FaLocationArrow className="text-indigo-500" />,
      title: "Nearby Post Offices",
      description: "Find post offices near a specific location",
      to: "/nearby-post-offices",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            IndiaPost AI Assistant
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Revolutionizing address management with intelligent solutions for
            efficient delivery
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <Link
              to="/nearby-post-offices"
              className="bg-white text-indigo-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-indigo-100 transition duration-300 inline-flex items-center"
            >
              Try Nearby Post Ofices
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </header>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <Link key={index} to={service.to}>
                <motion.div
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.7 }}
                >
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="text-indigo-600 font-semibold inline-flex items-center">
                    Learn More <FaArrowRight className="ml-2" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
