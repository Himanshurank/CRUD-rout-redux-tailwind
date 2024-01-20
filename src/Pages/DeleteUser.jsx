import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { deleteUserData } from "../store/userAction";

const DeleteUser = () => {
	const { name, id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const deleteId = localStorage.getItem("deleteId");
	const deleteName = localStorage.getItem("deleteName");
	/*eslint-disable */
	useEffect(() => {
		if (id !== deleteId || name !== deleteName) {
			navigate(`/delete/${deleteId}/${deleteName}`);
		}
	}, [navigate, deleteId, deleteName]);

	const deleteUser = () => {
		dispatch(deleteUserData(id));
		navigate(`/home/${localStorage.getItem("id")}`);
	};

	const cancelDelete = () => {
		navigate(`/home/${localStorage.getItem("id")}`);
		localStorage.removeItem("deleteId");
		localStorage.removeItem("deleteName");
	};
	return (
		<div className="h-90vh w-screen flex justify-around items-center">
			<div className="h-1/3 w-11/12 flex flex-col justify-around items-center bg-orange-600 bg-opacity-40 rounded-lg md:w-1/2">
				<h1 className="text-white text-xl font-bold sm:text-3xl">Are Your Sure Delete This User?</h1>
				<div>
					<h2 className="text-white text-lg sm:text-2xl">
						Name: <span className="text-orange-400 font-bold">{name}</span>
					</h2>
				</div>
				<div className="w-full flex justify-evenly ">
					<button className="bg-orange-600 py-2 px-8 text-white font-bold rounded-lg hover:bg-orange-800" type="button" onClick={cancelDelete}>
						Cancel
					</button>
					<button className="bg-orange-600 py-2 px-8 text-white font-bold rounded-lg hover:bg-orange-800" type="button" onClick={deleteUser}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteUser;
