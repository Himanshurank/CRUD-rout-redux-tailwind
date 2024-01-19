import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
	name: "admin",
	initialState: {
		isSecure: false,
	},

	reducers: {
		adminUser: (state, action) => {
			state.isSecure = true;
		},
		logout: (state) => {
			state.isSecure = false;
		},
	},
});

export const adminAction = adminSlice.actions;

export default adminSlice.reducer;
