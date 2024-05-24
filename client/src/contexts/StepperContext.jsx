import React, { createContext, useState } from 'react';

export const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    title: '',
    description: '',
    streetAddress: '',
    city: '',
    photos: [],
    price: 0,
    cleaningFees: 0,
    guests: 0,
    bedrooms: 0,
    bathrooms: 0,
    beds: 0,
    amenities: {
      wifi: false,
      pool: false,
      tv: false,
      washer: false,
      park: false,
      kitchen: false,
      desk: false,
      pets: false,
    },
  });

  const updateUserData = (data) => {
    setUserData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <StepperContext.Provider value={{ userData, updateUserData }}>
      {children}
    </StepperContext.Provider>
  );
};
