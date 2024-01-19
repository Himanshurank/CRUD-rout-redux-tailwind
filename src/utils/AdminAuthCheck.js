import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLoaderData } from "react-router";
import { userAction } from "../store/user-slice";

const AdminAuthCheck = () => {
	const isAdmin = localStorage.getItem("id");
	const dispatch = useDispatch();
	const data = useLoaderData();
	const userData = useSelector((state) => state.users.userData);
	useEffect(() => {
		if (userData.length === 0) {
			dispatch(userAction.readUserData(data));
		}
	}, [userData, data, dispatch]);
	return isAdmin ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AdminAuthCheck;

export const getUserData = async () => {
	const response = await fetch(`http://localhost:8000/usersdata`);
	return response;
};
