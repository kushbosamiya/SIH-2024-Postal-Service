import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
// import MapComponent from "./MapComponent";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];



const Dashboard = () => {
  const [satisfactionData, setSatisfactionData] = useState([]);
  const [featureUsageData, setFeatureUsageData] = useState([]);
  const [timeRange, setTimeRange] = useState("week");

  useEffect(() => {
    fetchData(timeRange);
  }, [timeRange]);

  const fetchData = () => {
    const mockSatisfactionData = [
      { name: "Very Satisfied", value: 400 },
      { name: "Satisfied", value: 300 },
      { name: "Neutral", value: 200 },
      { name: "Unsatisfied", value: 100 },
    ];

    const mockFeatureUsageData = [
      { name: "Address Validation", users: 500 },
      { name: "PIN Code Lookup", users: 400 },
      { name: "Nearby Post Offices", users: 300 },
    ];

    setSatisfactionData(mockSatisfactionData);
    setFeatureUsageData(mockFeatureUsageData);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          User Satisfaction Dashboard
        </h1>
        <select
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">User Satisfaction</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={satisfactionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {satisfactionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Feature Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">Recent Feedback</h2>
        <ul className="space-y-4">
          <li className="bg-green-100 p-4 rounded-lg">
            <p className="font-semibold">Very helpful service!</p>
            <p className="text-sm text-gray-600">User123 - 2 days ago</p>
          </li>
          <li className="bg-yellow-100 p-4 rounded-lg">
            <p className="font-semibold">
              The PIN code lookup could be faster.
            </p>
            <p className="text-sm text-gray-600">User456 - 4 days ago</p>
          </li>
          <li className="bg-green-100 p-4 rounded-lg">
            <p className="font-semibold">
              Address validation saved me from a delivery mistake. Thanks!
            </p>
            <p className="text-sm text-gray-600">User789 - 1 week ago</p>
          </li>
        </ul>
      </motion.div>

      <div className="flex justify-center">
        <motion.button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate Detailed Report
        </motion.button>
      </div>
    </div>
  );
};

export default Dashboard;
