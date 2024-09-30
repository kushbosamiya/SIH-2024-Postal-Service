import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// You'll need to install this package: npm install @react-google-maps/api
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const PostOfficeMap = () => {
  const [postOffices, setPostOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const mapRef = useRef(null);

  useEffect(() => {
    // Fetch nearby post offices
    fetchNearbyPostOffices();
  }, []);

  const fetchNearbyPostOffices = async () => {
    // Replace this with your actual API call
    const mockData = [
      {
        id: 1,
        name: "Central Post Office",
        address: "123 Main St",
        lat: 40.7128,
        lng: -74.006,
      },
      {
        id: 2,
        name: "North Post Office",
        address: "456 North Ave",
        lat: 40.73,
        lng: -73.995,
      },
      {
        id: 3,
        name: "East Post Office",
        address: "789 East Blvd",
        lat: 40.72,
        lng: -73.985,
      },
    ];
    setPostOffices(mockData);
    if (mockData.length > 0) {
      setMapCenter({ lat: mockData[0].lat, lng: mockData[0].lng });
    }
  };

  const handleOfficeClick = (office) => {
    setSelectedOffice(office);
    setMapCenter({ lat: office.lat, lng: office.lng });
    mapRef.current.panTo({ lat: office.lat, lng: office.lng });
  };

  return (
    <div className="flex flex-col md:flex-row h-[600px]">
      <div className="w-full md:w-1/3 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Nearby Post Offices</h2>
        {postOffices.map((office) => (
          <motion.div
            key={office.id}
            className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOfficeClick(office)}
          >
            <h3 className="text-lg font-semibold">{office.name}</h3>
            <p>{office.address}</p>
          </motion.div>
        ))}
      </div>
      <div className="w-full md:w-2/3">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={mapCenter}
            zoom={13}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            {postOffices.map((office) => (
              <Marker
                key={office.id}
                position={{ lat: office.lat, lng: office.lng }}
                onClick={() => setSelectedOffice(office)}
              />
            ))}
            {selectedOffice && (
              <InfoWindow
                position={{ lat: selectedOffice.lat, lng: selectedOffice.lng }}
                onCloseClick={() => setSelectedOffice(null)}
              >
                <div>
                  <h3 className="font-semibold">{selectedOffice.name}</h3>
                  <p>{selectedOffice.address}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default PostOfficeMap;
