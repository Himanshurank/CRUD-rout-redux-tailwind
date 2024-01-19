import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import adminSlice from "./admin-slice";

const store = configureStore({
	reducer: {
		login: adminSlice,
		users: userSlice,
	},
});

export default store;
