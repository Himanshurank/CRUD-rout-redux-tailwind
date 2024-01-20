import React, { useEffect, useState } from "react";
import UserInput from "./UserInput";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import loginImg from "../Assets/loginimg.png";

const LoginSignUpForm = () => {
	const navigate = useNavigate();

	const inputInitialState = { username: "", email: "", password: "" };
	const isAdmin = localStorage.getItem("id");

	const [user, setUser] = useState(inputInitialState);
	const [isLogin, setIsLogin] = useState(true);
	const [error, setError] = useState({});

	useEffect(() => {
		if (isAdmin) {
			navigate(`/home/${isAdmin}`);
		} else {
			navigate("/login");
		}
	}, [navigate, isAdmin]);

	const getInputsDetail = (e) => {
		const { name, value } = e.target;
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const loginInputProperties = [
		{ name: "email", placeholder: "Enter Email", value: user.email, type: "text", onChange: getInputsDetail, error: error.email ? error.email : "" },
		{ name: "password", placeholder: "Enter Password", value: user.password, type: "password", onChange: getInputsDetail, error: error.password ? error.password : "" },
	];
	const signUpInputProperties = [
		{ name: "username", placeholder: "Enter Username", value: user.username, type: "text", onChange: getInputsDetail, error: error.username ? error.username : "" },
		{ name: "email", placeholder: "Enter Email", value: user.email, type: "text", onChange: getInputsDetail, error: error.email ? error.email : "" },
		{ name: "password", placeholder: "Enter Password", value: user.password, type: "password", onChange: getInputsDetail, error: error.password ? error.password : "" },
	];

	const formSubmit = async (e) => {
		e.preventDefault();
		/* eslint-disable */
		const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const validUser = await getAdmin(user);
		const error = {};
		if (isAdmin) {
			setError({ alreadylogin: "You Are Already Login" });
			navigate(`/home/${isAdmin}`);
			return;
		}
		if (user.email === "" || !user.email.match(emailPattern)) {
			error.email = "Enter Valid Email";
		}
		if (user.password === "") {
			error.password = "Enter Valid Password";
		}
		if (isLogin === false) {
			if (user.username === "") {
				error.username = "Enter Valid Username";
			}
			if (validUser.length > 0) {
				error.existing = "User Already Registered";
				setUser(inputInitialState);
			}
		} else {
			if (validUser.length > 0) {
				localStorage.setItem("id", validUser[0].id);
				localStorage.setItem("username", validUser[0].username);
				navigate(`/home/${validUser[0].id}`);
			} else {
				if (user.email !== "" && user.password !== "") {
					error.login = "Invalid User";
				}
			}
		}
		if (error) {
			setError(error);
			return;
		}

		setUser(inputInitialState);
		setIsLogin(true);
		setError({});
	};

	const cancelBtn = () => {
		setIsLogin(!isLogin);
		setError({});
		setUser(inputInitialState);
	};

	const reset = () => {
		setUser(inputInitialState);
		setError({});
	};

	return (
		<div className="flex justify-center items-center h-90vh w-screen ">
			<div className="flex flex-col justify-center items-center h-full sm:flex-row">
				<div className=" flex justify-center items-center sm:w-1/2 md:w-2/6">
					<img src={loginImg} className="w-1/2 sm:w-full" alt="" />
				</div>
				<div className="mx-4 h-2/3 w-full  flex justify-center items-center sm:w-1/2 md:w-2/6 md:mx-24">
					<form onSubmit={(e) => formSubmit(e)} className="flex flex-col  h-full w-10/12">
						<h2 className="text-center  bg-orange-600 py-2 text-white text-xl rounded-md my-3 font-bold md:py-4 md:text-3xl md:my-5">{isLogin ? "Login" : "Create New Account"}</h2>
						{isLogin && loginInputProperties.map((input) => <UserInput key={input.name} error={input.error} name={input.name} value={input.value} placeholder={input.placeholder} type={input.type} onChange={input.onChange} />)}
						{!isLogin && (
							<>
								{signUpInputProperties.map((input) => (
									<UserInput key={input.name} error={input.error} name={input.name} value={input.value} placeholder={input.placeholder} type={input.type} onChange={input.onChange} />
								))}
							</>
						)}
						{error.login && <p className="text-sm font-semibold py-1 mx-3 text-red-500">{error.login}</p>}
						{error.existing && <p className="text-sm font-semibold py-1 mx-3 text-red-500">{error.existing}</p>}
						{error.alreadylogin && <p className="text-sm font-semibold py-1 mx-3 text-red-500">{error.alreadylogin}</p>}

						<div className="flex justify-center items-center space-x-3 ">
							<button className="bg-orange-600 py-1 px-3 mt-3 w-4/5 text-white font-bold rounded-lg hover:bg-orange-800 md:my-2 md:py-2 " type="submit">
								{isLogin ? "Login" : "Sign Up"}
							</button>
							{!isLogin && (
								<button className="bg-orange-600 py-1 px-3 mt-3 w-4/5 text-white font-bold rounded-lg hover:bg-orange-800 md:my-2 md:py-2" type="button" onClick={reset}>
									Reset
								</button>
							)}
						</div>
						{isLogin && (
							<>
								<div className="text-center text-purple-800 font-bold my-1 hover:text-purple-900">
									<Link to={"/forgot"}>Forgot Password</Link>
								</div>
							</>
						)}
						<hr className="p-1px mt-3 bg-orange-300" />
						<div className="flex justify-center items-center">
							<button className=" bg-orange-600 py-1 px-3 mt-4 w-4/5 text-white font-bold rounded-lg hover:bg-orange-800 md:my-2 md:py-2" type="button" onClick={cancelBtn}>
								{isLogin ? "Create New Account" : "Login Page"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginSignUpForm;

export const getAdmin = async (logininput) => {
	const { username, email, password } = logininput;
	if (!username) {
		const response = await fetch(`http://localhost:8000/loginUsers?email=${email}&password=${password}`);
		const resData = await response.json();
		return resData;
	} else {
		const response = await fetch(`http://localhost:8000/loginUsers?email=${email}`);
		const resData = await response.json();
		return resData;
	}
};
