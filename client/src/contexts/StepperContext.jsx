import { createContext, useState } from 'react';

export const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    title: '',
    description: '',
    streetAddress: '',
    city: '',
    guests: 0,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    amenities: {},
    photos: [],
    price: 0
  });

  return (
    <StepperContext.Provider value={{ userData, setUserData }}>
      {children}
    </StepperContext.Provider>
  );
};
