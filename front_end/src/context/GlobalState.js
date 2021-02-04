import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import initialState from "./InitialState";

import {
  addImage,
  deleteImage,
  loadImages,
  login,
  logout,
  register,
} from "./ContextFunctions";

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        images: state.images,
        isAuthenticated: state.isAuthenticated,
        addImage: addImage(dispatch),
        loadImages: loadImages(dispatch),
        deleteImage: deleteImage(dispatch),
        login: login(dispatch),
        register: register(dispatch),
        logout: logout(dispatch),
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
