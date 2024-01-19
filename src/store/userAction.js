import { userAction } from "./user-slice";

export const addNewUser = (data) => {
	return async (dispatch) => {
		const response = await fetch("http://localhost:8000/usersdata", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const resData = await response.json();
		dispatch(userAction.addUserData(resData));
	};
};
export const updateUserAction = (data, id) => {
	return async (dispatch) => {
		const response = await fetch(`http://localhost:8000/usersdata/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const resData = await response.json();
		dispatch(userAction.updateUser(resData));
	};
};

export const deleteUserData = (id) => {
	return async (dispatch) => {
		const response = await fetch(`http://localhost:8000/usersdata/${id}`, {
			method: "DELETE",
		});
		const resData = await response.json();
		dispatch(userAction.deleteUser(resData));
	};
};
