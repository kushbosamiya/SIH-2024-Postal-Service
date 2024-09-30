// mockDatabase.js

const mockAddresses = [
  {
    id: 1,
    name: "John Doe",
    street: "123 Main St",
    city: "Mumbai",
    pinCode: "400001",
    postOffice: "Mumbai GPO",
  },
  {
    id: 2,
    name: "Jane Smith",
    street: "456 Park Ave",
    city: "Delhi",
    pinCode: "110001",
    postOffice: "New Delhi GPO",
  },
  {
    id: 3,
    name: "Alice Johnson",
    street: "789 Oak Rd",
    city: "Bangalore",
    pinCode: "560001",
    postOffice: "Bangalore GPO",
  },
  {
    id: 4,
    name: "Bob Wilson",
    street: "321 Pine Ln",
    city: "Chennai",
    pinCode: "600001",
    postOffice: "Chennai GPO",
  },
  {
    id: 5,
    name: "Eva Brown",
    street: "654 Elm St",
    city: "Kolkata",
    pinCode: "700001",
    postOffice: "Kolkata GPO",
  },
];

const mockPinCodes = {
  400001: { city: "Mumbai", postOffice: "Mumbai GPO" },
  110001: { city: "Delhi", postOffice: "New Delhi GPO" },
  560001: { city: "Bangalore", postOffice: "Bangalore GPO" },
  600001: { city: "Chennai", postOffice: "Chennai GPO" },
  700001: { city: "Kolkata", postOffice: "Kolkata GPO" },
};

export const interpretAddress = (inputAddress) => {
  // Simulate address interpretation
  const words = inputAddress.toLowerCase().split(" ");
  const interpretedAddress = {
    name: words.slice(0, 2).join(" "),
    street: words.slice(2, -2).join(" "),
    city: words[words.length - 2],
    pinCode: words[words.length - 1],
  };
  return interpretedAddress;
};

export const correctPinCode = (pinCode) => {
  // Simple PIN code correction: if not in mockPinCodes, return a default
  return mockPinCodes[pinCode] ? pinCode : "110001";
};

export const identifyPostOffice = (pinCode) => {
  const correctedPinCode = correctPinCode(pinCode);
  return mockPinCodes[correctedPinCode].postOffice;
};

export const validateAddress = (address) => {
  const correctedPinCode = correctPinCode(address.pinCode);
  const postOffice = identifyPostOffice(correctedPinCode);
  return {
    ...address,
    pinCode: correctedPinCode,
    postOffice: postOffice,
  };
};

// mockDatabase.js

const mockPinCodesP = {
  400001: {
    city: "Mumbai",
    postOffices: [
      { name: "Mumbai GPO", distance: 0 },
      { name: "Colaba Post Office", distance: 2.5 },
      { name: "Fort Post Office", distance: 1.8 },
    ],
  },
  110001: {
    city: "Delhi",
    postOffices: [
      { name: "New Delhi GPO", distance: 0 },
      { name: "Connaught Place Post Office", distance: 1.2 },
      { name: "Parliament Street Post Office", distance: 2.0 },
    ],
  },
  560001: {
    city: "Bangalore",
    postOffices: [
      { name: "Bangalore GPO", distance: 0 },
      { name: "Vidhana Soudha Post Office", distance: 1.5 },
      { name: "Cubbon Park Post Office", distance: 2.2 },
    ],
  },
  600001: {
    city: "Chennai",
    postOffices: [
      { name: "Chennai GPO", distance: 0 },
      { name: "Anna Road Head Post Office", distance: 1.7 },
      { name: "Mylapore Post Office", distance: 3.0 },
    ],
  },
  700001: {
    city: "Kolkata",
    postOffices: [
      { name: "Kolkata GPO", distance: 0 },
      { name: "Dalhousie Square Post Office", distance: 1.0 },
      { name: "Esplanade Post Office", distance: 1.8 },
    ],
  },

  360002: {
    city: "Rajkot",
    postOffices: [
      {
        name: "Rajkot Head Post Office",
        distance: 3.0,
      },
      {
        name: "Bhaktinagar Post Office",
        distance: 4.4,
      },
      {
        name: "Junction Post Office",
        distance: 2.5,
      },
      {
        name: "Rajkot Raiyaa Road Post Office",
        distance: 5.7,
      },
      {
        name: "Rajkot Mochi Bazar Sub Post Office",
        distance: 2.1,
      },
    ],
  },
};

export const getNearbyPostOffices = (pinCode) => {
  const correctedPinCode = correctPinCodeP(pinCode);
  return mockPinCodesP[correctedPinCode];
};

export const correctPinCodeP = (pinCode) => {
  // Simple PIN code correction: if not in mockPinCodes, return a default
  return mockPinCodesP[pinCode] ? pinCode : "110001";
};

const mockLocationData = {
  "Mumbai Central": {
    lat: 18.9711,
    lng: 72.8197,
    postOffices: [
      { name: "Mumbai GPO", lat: 18.9373, lng: 72.8326, distance: 2.5 },
      { name: "Dadar Post Office", lat: 19.0178, lng: 72.8478, distance: 3.8 },
      { name: "Bandra Post Office", lat: 19.0596, lng: 72.8295, distance: 5.2 },
      {
        name: "Andheri Post Office",
        lat: 19.1136,
        lng: 72.8697,
        distance: 7.6,
      },
      {
        name: "Borivali Post Office",
        lat: 19.2321,
        lng: 72.8576,
        distance: 12.3,
      },
    ],
  },
  "Rajkot Central": {
    lat: 22.3104073,
    lng: 70.8222275,
    postOffices: [
      {
        name: "Rajkot Head Post Office",
        lat: 22.2987175,
        lng: 70.7948356,
        distance: 3.0,
      },
      {
        name: "Bhaktinagar Post Office",
        lat: 22.3093122,
        lng: 70.778893,
        distance: 4.4,
      },
      {
        name: "Junction Post Office",
        lat: 22.3092688,
        lng: 70.7969659,
        distance: 2.5,
      },
      {
        name: "Rajkot Raiyaa Road Post Office",
        lat: 22.2894333,
        lng: 70.7701963,
        distance: 5.7,
      },
      {
        name: "Rajkot Mochi Bazar Sub Post Office",
        lat: 22.3026703,
        lng: 70.8030864,
        distance: 2.1,
      },
    ],
  },
  "Delhi Central": {
    lat: 28.6139,
    lng: 77.209,
    postOffices: [
      { name: "New Delhi GPO", lat: 28.6292, lng: 77.2197, distance: 1.8 },
      {
        name: "Connaught Place Post Office",
        lat: 28.6315,
        lng: 77.2167,
        distance: 2.1,
      },
      {
        name: "Lodhi Road Post Office",
        lat: 28.5918,
        lng: 77.2273,
        distance: 3.5,
      },
      {
        name: "Sarojini Nagar Post Office",
        lat: 28.5776,
        lng: 77.1969,
        distance: 4.7,
      },
      {
        name: "Karol Bagh Post Office",
        lat: 28.6512,
        lng: 77.1913,
        distance: 5.9,
      },
    ],
  },
};

export const getNearbyPostOfficesByLocation = (locationLink) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real application, you would parse the locationLink to determine the actual location
      // For this mock, we'll randomly select a location from our mock data
      const locations = Object.keys(mockLocationData);
      const randomLocation =
        locations[Math.floor(Math.random() * locations.length)];
      const locationData = mockLocationData["Rajkot Central"];

      resolve({
        location: randomLocation,
        lat: locationData.lat,
        lng: locationData.lng,
        postOffices: locationData.postOffices.map((po) => ({
          ...po,
          distance: parseFloat(po.distance.toFixed(1)), // Round to 1 decimal place
        })),
      });
    }, 1500); // Simulating network delay
  });
};
