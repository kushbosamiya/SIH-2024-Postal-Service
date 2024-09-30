import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AddressForm from "./components/AddressForm";
import PinCodeLookup from "./components/PinCodeLookup";
import NearbyPostOffices from "./components/NearbyPostOffices";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/address-validator" element={<AddressForm />} />
            <Route path="/pincode-lookup" element={<PinCodeLookup />} />
            <Route
              path="/nearby-post-offices"
              element={<NearbyPostOffices />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
