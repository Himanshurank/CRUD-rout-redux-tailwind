import React, { useState } from "react";
import UserInput from "../Components/UserInput";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateAdminAction } from "../store/adminAction";
import loginImg from "../Assets/loginimg.png";

const ForgotPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const inputInitialState = { email: "", password: "", confirmpassword: "" };
	const [user, setUser] = useState(inputInitialState);
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [error, setError] = useState({});

	const getInputsDetail = (e) => {
		const { name, value } = e.target;
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const forgotEmailProperties = [{ name: "email", placeholder: "Enter Email", value: user.email, type: "text", onChange: getInputsDetail, error: error.email ? error.email : "" }];

	const forgotPasswordProperties = [
		{ name: "password", placeholder: "Enter Password", value: user.password, type: "password", onChange: getInputsDetail, error: error.password ? error.password : "" },
		{ name: "confirmpassword", placeholder: "Re-Enter Password", value: user.confirmpassword, type: "password", onChange: getInputsDetail, error: error.confirmpassword ? error.confirmpassword : "" },
	];

	const formSubmit = async (e) => {
		e.preventDefault();
		/*eslint-disable*/
		const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const error = {};
		if (user.email === "" || !user.email.match(emailPattern)) {
			error.email = "Enter Valid E-mail";
		}

		setError(error);
		if (error.email || error.password) {
			return;
		}
		const validUser = await getAdminEmail(user);

		if (isEmailValid === false) {
			if (validUser.length > 0) {
				setIsEmailValid(true);
			} else {
				setError({ valid: "User Not Registered" });
				return;
			}
		}
		if (isEmailValid === true) {
			if (user.password === "") {
				setError({ password: "Enter Valid Password" });
				return;
			}
			if (user.password !== user.confirmpassword) {
				setError({ confirmpassword: "Password Not Match" });
				return;
			}
			validUser[0].password = user.password;
			dispatch(updateAdminAction(validUser[0], validUser[0].id));
			setUser(inputInitialState);
			navigate("/");
		}
		setError({});
	};

	const reset = () => {
		setIsEmailValid(false);
		setUser(inputInitialState);
		setError({});
	};

	return (
		<div className="flex flex-col justify-center items-center h-90vh w-screen sm:flex-row ">
			<div className=" flex justify-center items-center sm:w-1/2 md:w-1/3">
				<img src={loginImg} className="w-1/2 sm:w-full" alt="" />
			</div>
			<div className="mx-4 w-11/12 h-2/3  flex justify-center items-center sm:w-1/2 md:w-2/6 md:mx-24">
				<form onSubmit={(e) => formSubmit(e)} className="flex flex-col justify-between w-full px-4 ">
					<h2 className="text-center  bg-orange-600 py-2 text-white text-xl rounded-md my-3 font-bold md:py-4 md:text-3xl md:my-5 ">Forgot Password</h2>

					{forgotEmailProperties.map((input) => (
						<UserInput key={input.name} error={input.error} name={input.name} value={input.value} placeholder={input.placeholder} type={input.type} onChange={input.onChange} />
					))}
					{isEmailValid && forgotPasswordProperties.map((input) => <UserInput key={input.name} error={input.error} name={input.name} value={input.value} placeholder={input.placeholder} type={input.type} onChange={input.onChange} />)}

					{error.valid && <p className="text-sm font-semibold py-1 mx-3 text-red-500">{error.valid}</p>}
					<div className="space-x-4 flex ">
						<button className="bg-orange-600 py-1 px-3 mt-3 w-4/5 text-white font-bold rounded-lg hover:bg-orange-800 md:my-2 md:py-2" type="submit">
							{isEmailValid ? "Change Password" : "Check Email"}
						</button>
						<button className="bg-orange-600 py-1 px-3 mt-3 w-4/5 text-white font-bold rounded-lg hover:bg-orange-800 md:my-2 md:py-2" type="button" onClick={reset}>
							Reset
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;

export const getAdminEmail = async (input) => {
	const { email } = input;
	const response = await fetch(`http://localhost:8000/loginUsers?email=${email}`);
	const resData = await response.json();
	return resData;
};
