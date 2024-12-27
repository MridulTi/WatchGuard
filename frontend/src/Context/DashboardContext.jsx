import React, { createContext, useContext, useState } from 'react';
import { Camera } from '../assets/Camera';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [cameraVisibility, setCameraVisibility] = useState(Camera);
  const [Alert,setAlert]=useState(false)
  const [loggedIn,setLoggedIn]=useState(false)
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const toggleCameraVisibility = (slug) => {
    setCameraVisibility((prevVisibility) =>
      prevVisibility.map((camera) =>
        camera.slugs === slug ? { ...camera, isVisible: !camera.isVisible } : camera
      )
    );
  };
  const handleAlert=()=>{
    setAlert(true)
  }

  return (
    <DashboardContext.Provider value={{ 
      cameraVisibility, toggleCameraVisibility ,
      handleAlert,Alert,
      loggedIn,setLoggedIn,
      user, setUser,
      accessToken, setAccessToken
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
