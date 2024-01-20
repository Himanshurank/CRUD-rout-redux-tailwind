import React, { useEffect, useState } from "react";
import UserInput from "./UserInput";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, updateUserAction } from "../store/userAction";
import { userAction } from "../store/user-slice";
// import formBg from "../Assets/formbg.jpg";

const UserForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { updateId } = useParams();
	const usersList = useSelector((state) => state.users.userData);
	const isEditable = useSelector((state) => state.users.isEditable);

	/* eslint-disable */
	const initialState = { name: "", email: "", phone: "", age: "" };
	let selUser = usersList.find((user) => user.id == updateId);
	const [preBtn, setPreBtn] = useState(true);
	const [nextBtn, setNextBtn] = useState(true);
	const [error, setError] = useState({});
	const [user, setUser] = useState(initialState);

	useEffect(() => {
		if (updateId) {
			dispatch(userAction.setEditable(true));
			if (selUser) {
				setUser(selUser);
			}
		}
	}, [dispatch, selUser]);

	const getUserInput = (e) => {
		const { name, value } = e.target;
		setUser((prev) => ({
			...prev,
			[name]: name === "age" ? +value : value,
		}));
	};

	const inputProps = [
		{ name: "name", value: user.name, placeholder: "Enter Name", type: "text", onChange: getUserInput, error: error.name ? error.name : "" },
		{ name: "age", value: user.age, placeholder: "Enter Age", type: "number", onChange: getUserInput, error: error.age ? error.age : "" },
		{ name: "email", value: user.email, placeholder: "Enter E-mail", type: "email", onChange: getUserInput, error: error.email ? error.email : "" },
		{ name: "phone", value: user.phone, placeholder: "Enter Mobile", type: "text", onChange: getUserInput, error: error.phone ? error.phone : "" },
	];

	const addNewUserDetail = (e) => {
		e.preventDefault();

		const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const error = {};
		if (user.name === "") {
			error.name = "Enter Valid Name";
		}
		if (user.age === "" || user.age < 1) {
			error.age = "Enter Valid Age";
		}
		if (user.email === "" || !user.email.match(emailPattern)) {
			error.email = "Enter Valid Email";
		}
		if (user.phone === "" || user.phone.length >= 11 || user.phone.length <= 9 || isNaN(user.phone)) {
			error.phone = "Enter Valid Phone";
		}
		if (Object.keys(error).length > 0) {
			setError(error);
			return;
		}
		const existingUser = usersList.filter((user) => user.email == user.email || user.phone == user.phone);
		if (updateId) {
			existingUser.map((validUser) => {
				if (validUser.id != updateId) {
					if (user.email == validUser.email) {
						error.email = "E-mail Already Added";
					}
					if (user.phone == validUser.phone) {
						error.phone = "Phone Already Added";
					}
				}
			});
			if (Object.keys(error).length > 0) {
				setError(error);
				return;
			}
			selUser = user;
			dispatch(updateUserAction(selUser, updateId));
		} else {
			console.log(existingUser);
			existingUser.map((validUser) => {
				if (user.email === validUser.email) {
					error.email = "E-mail Already Added";
				}
				if (user.phone == validUser.phone) {
					error.phone = "Phone Already Added";
				}
			});
			if (Object.keys(error).length > 0) {
				setError(error);
				return;
			}
			dispatch(addNewUser(user));
		}
		setUser(initialState);
		setError({});
		navigate(`/home/${localStorage.getItem("id")}`);
	};
	const cancelAddUser = () => {
		dispatch(userAction.setEditable(false));
		setUser(initialState);
		navigate(`/home/${localStorage.getItem("id")}`);
	};

	const goPreviousUser = () => {
		const currentIndex = usersList.findIndex((user) => user.id == updateId);
		let count = currentIndex - 1;

		if (count >= 0) {
			navigate(`/edit/${usersList[count].id}`);
			setUser(usersList[count]);
		}
		if (count < 1) {
			setPreBtn(false);
		}
		setNextBtn(true);
	};

	const goNextUser = () => {
		const currentIndex = usersList.findIndex((user) => user.id == updateId);
		let count = currentIndex + 1;

		if (count < usersList.length) {
			navigate(`/edit/${usersList[count].id}`);
			setUser(usersList[count]);
		}
		if (count > usersList.length - 2) {
			setNextBtn(false);
		}

		setPreBtn(true);
	};
	return (
		<div className="formbg bg-cover w-screen h-90vh flex justify-center items-center">
			{isEditable && (
				<>
					{preBtn && (
						<button className="absolute left-4 z-10 text-white  bg-orange-600 py-5 px-2 rounded-md bg-opacity-25 hover:bg-opacity-35 sm:left-32 md:left-29%" type="button" onClick={goPreviousUser}>
							{"<"}
						</button>
					)}
				</>
			)}
			<form onSubmit={addNewUserDetail} className="flex flex-col px-8 justify-between items-center  w-full mx-12 bg-white rounded-lg bg-opacity-5 backdrop-blur-sm  md:w-1/3 md:h-5/6 ">
				<h2 className="text-white text-center m-4 text-3xl font-bold">User Form</h2>
				<div className="flex flex-col text-center md:w-full">
					{inputProps.map((input) => {
						return <UserInput key={input.name} value={input.value} error={input.error} name={input.name} placeholder={input.placeholder} type={input.type} onChange={input.onChange} />;
					})}
				</div>
				{error && <p>{error.user}</p>}
				<div className="flex justify-between mb-4  space-x-2 md:w-full">
					<button type="submit" className="bg-orange-600 py-2 px-6 mt-6  text-white font-bold rounded-lg hover:bg-orange-800 ">
						Save
					</button>
					<button className="bg-orange-600 py-2 px-6 mt-6  text-white font-bold rounded-lg hover:bg-orange-800 " type="button" onClick={cancelAddUser}>
						Cancel
					</button>
				</div>
			</form>
			{isEditable && (
				<>
					{nextBtn && (
						<button className="absolute right-4 z-10 text-white bg-orange-600 py-5 px-2 rounded-md bg-opacity-25 hover:bg-opacity-35 sm:right-36 md:right-29%" type="button" onClick={goNextUser}>
							{">"}
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default UserForm;
