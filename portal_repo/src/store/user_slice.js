import { createSlice } from '@reduxjs/toolkit';

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
});
  
export const { userAdded, userUpdated } = userSlice.actions;
  
export default userSlice.reducer;
