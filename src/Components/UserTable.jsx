import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userAction } from "../store/user-slice";

const UserTable = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const adminId = localStorage.getItem("id");

	const usersList = useSelector((state) => state.users.userData);

	/* eslint-disable */
	useEffect(() => {
		if (params.userId !== adminId) {
			navigate(`/home/${adminId}`);
		}
	}, [adminId]);

	const editAction = () => {
		dispatch(userAction.setEditable(true));
	};

	const deleteAction = (id, name) => {
		localStorage.setItem("deleteId", id);
		localStorage.setItem("deleteName", name);
	};

	const renderData = usersList.map((user, index) => {
		return (
			<tr key={user.id}>
				<td className="p-2 ring-1 ring-orange-300 text-center">{index + 1}</td>
				<td className="p-2 ring-1 ring-orange-300 text-center">{user.name}</td>
				<td className="p-2 ring-1 ring-orange-300 text-center">{user.age}</td>
				<td className="p-2 ring-1 ring-orange-300 text-center">{user.email}</td>
				<td className="p-2 ring-1 ring-orange-300 text-center">{user.phone}</td>
				<td className="p-2 ring-1 ring-orange-300 text-center space-x-2">
					<div className="flex justify-center items-center space-x-2">
						<Link to={`/edit/${user.id}`}>
							<button className="bg-green-600 py-1 px-3 rounded-md hover:bg-white hover:text-green-600 font-bold text-sm" type="button" onClick={editAction}>
								Edit
							</button>
						</Link>
						<Link to={`/delete/${user.id}/${user.name}`}>
							<button
								className="py-1 px-3 bg-red-600 rounded-md hover:bg-white hover:text-red-600 font-bold text-sm"
								type="button"
								onClick={() => {
									deleteAction(user.id, user.name);
								}}
							>
								Delete
							</button>
						</Link>
					</div>
				</td>
			</tr>
		);
	});
	return (
		<>
			<div className="flex justify-center m-10 sm:justify-end">
				<Link to="/form" className="bg-orange-600 py-2 px-8 m-2  text-white font-bold rounded-lg hover:bg-orange-800">
					Add User
				</Link>
			</div>
			<div className="w-screen flex justify-center items-start overflow-scroll md:overflow-visible">
				<table className="w-11/12 text-white bg-orange-500 rounded-md overflow-hidden">
					<thead className="text-xl  text-orange-600 ">
						<tr className="bg-orange-300 ">
							<th className="p-2 ring-1 ring-orange-600">ID</th>
							<th className="p-2 ring-1 ring-orange-600">Name</th>
							<th className="p-2 ring-1 ring-orange-600">Age</th>
							<th className="p-2 ring-1 ring-orange-600">E-mail</th>
							<th className="p-2 ring-1 ring-orange-600">Phone</th>
							<th className="p-2 ring-1 ring-orange-600">E/D</th>
						</tr>
					</thead>
					<tbody>{renderData}</tbody>
				</table>
			</div>
		</>
	);
};

export default UserTable;
