import React, { useEffect } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import UserForm from "../Components/UserForm";

const UserEdit = () => {
	const navigate = useNavigate();

	const userId = localStorage.getItem("id");
	// const userData = useSelector((state) => state.users.userData);
	// const selectedUser = userData.filter((user) => user.id == updateId);

	/* eslint-disable */
	const selUser = useLoaderData();

	useEffect(() => {
		if (!selUser) {
			navigate(`/home/${userId}`);
		}
	}, [navigate, userId]);
	return (
		<div>
			<UserForm />
		</div>
	);
};

export default UserEdit;

export const getSelectedUser = async ({ params }) => {
	const response = await fetch(`http://localhost:8000/usersdata/${params.updateId}`);
	if (!response.ok) {
		return redirect("/");
	}
	return response;
};
