import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminAction } from "../store/admin-slice";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAdmin = localStorage.getItem("id");
	const adminName = localStorage.getItem("username");

	const logout = () => {
		dispatch(adminAction.logout());
		localStorage.removeItem("id");
		localStorage.removeItem("username");
		navigate("/login");
	};
	return (
		<div className="bg-orange-600 h-16 flex items-center ">
			<div className="w-screen flex flex-col justify-between items-center sm:flex-row ">
				<Link to={isAdmin ? `/home/${localStorage.getItem("id")}` : "/login"} className="text-white text-xl font-bold mx-6 sm:w-full sm:text-4xl">
					Hi. {adminName ? adminName : ""}
				</Link>
				<ul className="flex justify-around text-white text-lg font-bold  w-full sm:justify-end sm:space-x-16 sm:mr-16 sm:text-xl">
					{isAdmin && (
						<li>
							<Link to={`/home/${localStorage.getItem("id")}`}>Home</Link>
						</li>
					)}

					{isAdmin && (
						<li>
							<button type="button" onClick={logout}>
								Logout
							</button>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
