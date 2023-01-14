import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserDataService from "../services/UserDataService";


const UserStatus = {
	GGC: 1,
	FARM: 2,
	ADMIN: 3
}
// fetch the orders to update createAsyncThunk, ?

// Declaring the initial state to define the structure
const initialState = [
  // actually, get initial state from the database
  { id: "1", name: "Nini", email: "geacquista@gmail.com", permissionType: UserStatus.ADMIN},
  { id: "2", name: "Bob", email: "bob@farm.coom", permissionType: UserStatus.FARM},
  { id: "3", name: "Audrey", email: "audrey@wpi.edu", permissionType: UserStatus.GGC}
];

export const addUser = createAsyncThunk(
  "users/create",
  async ({ email, password, nickname, permissionType}) => {
    const res = await UserDataService.create({ email, password, nickname, permissionType});
    return res.data;
  }
);

export const retrieveUsers = createAsyncThunk(
  "users/retrieve",
  async () => {
    const res = await UserDataService.getAll();
    return res.data;
  }
);


// Creating a slice of the quickstats data defines the state and actions on that data
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded(state, action) {
        state.push(action.payload);
      },
    userUpdated(state, action) {
    const { id, name, email, permissionType } = action.payload;
    const existingUser = state.find((user) => user.id === id);
        if (existingUser) {
            existingUser.name = name;
            existingUser.email = email;
            existingUser.permissionType = permissionType;
        }
    },
  },
  extraReducers: {
    [addUser.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveUsers.fulfilled]: (state, action) => {
      return [...action.payload];
    }
  }
});
  
// export const { userAdded, userUpdated } = userSlice.actions;
  
export default userSlice.reducer;
