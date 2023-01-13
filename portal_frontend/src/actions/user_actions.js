import { ADD_USER, RETRIEVE_USERS } from "./actionTypes";
import UserDataService from "../services/UserDataService.js";

export const addUser = (email, password, nickname, permissionType) => async (dispatch) => {
  try {
    const res = await UserDataService.create({ email, password, nickname, permissionType});

    dispatch({
      type: ADD_USER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveUsers = () => async (dispatch) => {
    try {
      const res = await UserDataService.getAll();
  
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };