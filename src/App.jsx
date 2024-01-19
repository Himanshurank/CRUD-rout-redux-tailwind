import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LoginSignUpForm, { getAdmin } from "./Components/LoginSingUpForm";
import UserEdit, { getSelectedUser } from "./Pages/UserEdit";
import ForgotPassword from "./Pages/ForgotPassword";
import DeleteUser from "./Pages/DeleteUser";
import LandingPage from "./Pages/LandingPage";
import UserTable from "./Components/UserTable";
import AdminAuthCheck, { getUserData } from "./utils/AdminAuthCheck";
import UserFormPage from "./Pages/UserFormPage";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements([
			<Route path="/" element={<LandingPage />}>
				<Route path="*" element={<Navigate to="/login" />} />,
				<Route path="/login" element={<LoginSignUpForm />} action={getAdmin} />,
				<Route path="/forgot" element={<ForgotPassword />} />,
				<Route element={<AdminAuthCheck />} loader={getUserData}>
					<Route path="/home/:userId" element={<UserTable />} />,
					<Route path="/form" element={<UserFormPage />} />,
					<Route path="/edit/:updateId" element={<UserEdit />} loader={getSelectedUser} />,
					<Route path="/delete/:id/:name" element={<DeleteUser />} />,
				</Route>
			</Route>,
		])
	);
	return <RouterProvider router={router} />;
}

export default App;
