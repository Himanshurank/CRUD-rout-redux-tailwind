import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "users",
	initialState: {
		userData: [],
		isEditable: false,
	},
	reducers: {
		readUserData: (state, action) => {
			state.userData = action.payload;
		},
		addUserData: (state, action) => {
			state.userData.push(action.payload);
		},
		setEditable: (state, action) => {
			state.isEditable = action.payload;
		},
		updateUser: (state, action) => {
			const updateIndex = state.userData.findIndex((user) => user.id === action.payload.id);
			state.userData[updateIndex] = action.payload;
		},
		deleteUser: (state, action) => {
			const removedUserData = state.userData.filter((user) => user !== action.payload);
			state.userData = removedUserData;
		},
	},
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
