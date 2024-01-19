import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const LandingPage = () => {
	const navigate = useNavigate();
	const userId = localStorage.getItem("id");
	useEffect(() => {
		if (!userId) {
			navigate("/login");
		}
	}, [navigate, userId]);

	return (
		<>
			<Navbar />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default LandingPage;
