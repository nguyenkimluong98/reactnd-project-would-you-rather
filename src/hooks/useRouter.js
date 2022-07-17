import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Answered from "../pages/Answered";
import Unanswered from "../pages/Unanswered";
import LeaderBoard from "../pages/LeaderBoard";

const RouterProvider = () => {
	const navigate = useNavigate();
	const users = useSelector((state) => state.users);

	useEffect(() => {
		if (!users.currentUser) {
			navigate("/signin");
		} else {
			navigate("/");
		}
	}, [users.currentUser]);

	return (
		<Routes>
			<Route path={"/"} element={<Home />}>
				<Route path="/" element={<LeaderBoard />} />
				<Route path="/answered" element={<Answered />} />
				<Route path="/unanswered" element={<Unanswered />} />
			</Route>
			<Route path="/signin" element={<Signin />} />
		</Routes>
	);
};

export default RouterProvider;
