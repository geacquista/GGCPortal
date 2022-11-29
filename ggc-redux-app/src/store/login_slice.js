import {
    LOGIN,
    LOGINPROCESSING,
  } from "..actions/actionTypes";
  
  export const reducer = (state = {}, action) => {
    switch (action.type) {
      case LOGIN:
        return { ...state, loggedIn: true };
        break;

      case LOGINPROCESSING:
        return { ...state, loginProcessing: true };
        break;

      default:
        return state;
    }
  };
  