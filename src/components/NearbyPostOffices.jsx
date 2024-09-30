import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaSpinner,
  FaLink,
  FaDirections,
} from "react-icons/fa";
import { getNearbyPostOfficesByLocation } from "../db/mockdatabase";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const PostOfficeCard = ({ name, distance, onClick, isSelected }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
      isSelected ? "border-2 border-blue-500" : ""
    }`}
    onClick={onClick}
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

const NearbyPostOffices = () => {
  const [locationLink, setLocationLink] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPostOffice, setSelectedPostOffice] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 22.3026702,
    lng: 70.8036307,
  };

  const onMapLoad = useCallback((map) => {
    setMap(map);
    setPlacesService(new window.google.maps.places.PlacesService(map));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const postOffices = await getNearbyPostOfficesByLocation(locationLink);
      setResult(postOffices);
      if (postOffices.postOffices.length > 0) {
        center.lat = postOffices.postOffices[0].lat;
        center.lng = postOffices.postOffices[0].lng;
      }
    } catch (err) {
      setError("Failed to fetch nearby post offices. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const findExactLocation = (postOffice) => {
    if (placesService) {
      const request = {
        query: postOffice.name,
        fields: ["name", "geometry"],
      };

      placesService.findPlaceFromQuery(request, (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          const exactLocation = results[0].geometry.location;
          setSelectedPostOffice({
            ...postOffice,
            lat: exactLocation.lat(),
            lng: exactLocation.lng(),
          });
          map.panTo(exactLocation);
          map.setZoom(18); // Zoom in for a closer view
        }
      });
    }
  };

  const handlePostOfficeClick = (postOffice) => {
    findExactLocation(postOffice);
    setDirections(null);
  };

  const handleGetDirections = () => {
    if (selectedPostOffice) {
      const origin = ``;
      const destination = `${selectedPostOffice.lat},${selectedPostOffice.lng}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
          <h1 className="text-3xl font-bold text-center text-white mb-4">
            Nearby Post Offices
          </h1>
          <p className="text-center text-white mb-6">
            Find post offices near a specific location
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="locationLink"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter Location Link
              </label>
              <input
                type="text"
                id="locationLink"
                value={locationLink}
                onChange={(e) => setLocationLink(e.target.value)}
                placeholder="Paste your location link here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 w-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Finding nearby post offices...
                </>
              ) : (
                <>
                  <FaLink className="mr-2" />
                  Find Nearby Post Offices
                </>
              )}
            </motion.button>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </div>
      </motion.div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Nearby Post Offices
            </h2>
            <p className="text-white text-opacity-80">
              Found {result.postOffices.length} post offices near the provided
              location
            </p>
          </div>
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {result.postOffices.map((po, index) => (
                <PostOfficeCard
                  key={index}
                  name={po.name}
                  distance={po.distance}
                  onClick={() => handlePostOfficeClick(po)}
                  isSelected={selectedPostOffice === po}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-green-500 to-teal-600">
            <h2 className="text-2xl font-semibold text-white mb-2">
              {!selectedPostOffice
                ? "Post Office Map"
                : selectedPostOffice?.name}
            </h2>
          </div>
          <div className="p-6">
            <LoadScript
              googleMapsApiKey="AIzaSyBhXgJib4AJRpyVhCOIVt9ZZ0TOw0PPm3k"
              libraries={["places"]}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
                onLoad={onMapLoad}
              >
                {!selectedPostOffice &&
                  result.postOffices.map((po, index) => (
                    <Marker
                      key={index}
                      position={{ lat: po.lat, lng: po.lng }}
                      onClick={() => handlePostOfficeClick(po)}
                    />
                  ))}
                {selectedPostOffice && (
                  <Marker
                    position={{
                      lat: selectedPostOffice.lat,
                      lng: selectedPostOffice.lng,
                    }}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    }}
                  />
                )}
                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                    options={{
                      polylineOptions: {
                        strokeColor: "#3B82F6",
                        strokeWeight: 5,
                      },
                    }}
                  />
                )}
              </GoogleMap>
            </LoadScript>
            {selectedPostOffice && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetDirections}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 w-full flex items-center justify-center"
              >
                <FaDirections className="mr-2" />
                Get Directions to {selectedPostOffice.name}
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NearbyPostOffices;
