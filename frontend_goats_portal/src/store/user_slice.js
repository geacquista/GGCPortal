import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserDataService from "../services/UserDataService";

// Declaring the initial state
//  - we actually get initial state from the database so the mock data is commented out
const initialState = [
  // { id: "1", nickname: "Nini", email: "geacquista@gmail.com", password: "123", permissionType: "GGC"},
  // { id: "2", nickname: "Bob", email: "bob@farm.coom", password: "123",permissionType: "FARM"},
  // { id: "3", nickname: "Audrey", email: "audrey@wpi.edu", password: "123", permissionType: "ADMIN"}
];

/**
 * The following thunks fetch user data from the DB using UserDataService class
 * createAsyncThunk(*)  *parameters depend on query type
 * addUser, retrieveUsers, updateUser, deleteUser, deleteAllUsers, findByPermission 
 */

/**
 * [CREATE/ADD] Takes in user details to create new user in db
 * params {email, password, nickname, permissionType}
 * EX. use case in component with __props: this.props.addUser({email, password, nickname, permissionType})
 */

export const addUser = createAsyncThunk(
  "users/create",
  async ({ email, password, nickname, permissionType}) => {
    const res = await UserDataService.create({ email, password, nickname, permissionType});
    return res.data;
  }
);

/**
 * [GET/READ/RETRIEVE] Gets current list of users from the db
 */
export const retrieveUsers = createAsyncThunk(
  "users/retrieve",
  async () => {
    const res = await UserDataService.getAll();
    return res.data;
  }
);

/**
 * params {id}
 * EX. use case in component with __props: this.props.retrieveUser(id) 
*/
export const retrieveUser = createAsyncThunk(
  "orders/read",
  async ({ id }) => {
    const res = await UserDataService.get(id);
    return res.data;
  }
)

/**
 * params {id, data = {....}}
 * EX. use case in component with __props: this.props.updateUser({ id: this.state.currentUser.id, data })
 */
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }) => {
    const res = await UserDataService.update(id, data);
    return res.data;
  }
);

/**
 * params {id}
 * EX. use case in component with __props: this.props.deleteUser({ id: this.state.currentUser.id })
 */
export const deleteUser = createAsyncThunk(
  "users/delete",
  async ({ id }) => {
    await UserDataService.remove(id);
    return { id };
  }
);

export const deleteAllUsers = createAsyncThunk(
  "users/deleteAll",
  async () => {
    const res = await UserDataService.removeAll();
    return res.data;
  }
);


// 
export const findUsersByPermission = createAsyncThunk(
  "users/findByPermission",
  async ({ permissionType }) => {
    const res = await UserDataService.findByPermission(permissionType);
    return res.data;
  }
);

// Creating a slice of the quickstats data defines the state and actions on that data
export const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [addUser.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveUser.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [retrieveUsers.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateUser.fulfilled]: (state, action) => {
      const index = state.findIndex(user => user.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteUser.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllUsers.fulfilled]: (state, action) => {
      return [];
    },
    [findUsersByPermission.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  }
});
  
export default userSlice.reducer;



/**
 * import {
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
  
 */