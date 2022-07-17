import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	Fab,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";
import AddIcon from "@mui/icons-material/Add";
import { unauthorizedUser } from "../slices/userSlice";
import { useState } from "react";
import ModalAddQuestion from "../components/ModalAddQuestion";
import { saveQuestion } from "../slices/questionSlice";

const pages = [
	{ title: "Leaderboard", path: "/" },
	{ title: "Unanswered Questions", path: "/unanswered" },
	{ title: "Answered Questions", path: "/answered" },
];

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState("Leaderboard");
	const [openModalQuestion, setOpenModalQuestion] = useState(false);

	const users = useSelector((state) => state.users);

	const handleClickPage = (page) => {
		setCurrentPage(page.title);
		navigate(page.path);
	};

	const logout = () => {
		dispatch(unauthorizedUser());
	};

	const createQuestion = async (options) => {
		await dispatch(
			saveQuestion({
				optionOneText: options.optionOne,
				optionTwoText: options.optionTwo,
				author: users.currentUser.id,
			})
		);
		setOpenModalQuestion(false);
		setCurrentPage("Unanswered Questions");
		navigate("/unanswered");
	};

	if (!users.currentUser) return null;

	return (
		<Container>
			<CssBaseline />
			<AppBar position="sticky" color="secondary">
				<Container>
					<Toolbar disableGutters>
						<StarRateSharpIcon
							sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
						/>
						<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							WYR
						</Typography>
						<Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
							{pages.map((page) => (
								<Button
									key={page.title}
									onClick={() => handleClickPage(page)}
									sx={{
										mx: 2,
										color: "white",
										display: "block",
										border: currentPage === page.title ? 1 : 0,
										borderColor: "white",
									}}
									// variant="contained"
									color="warning"
								>
									{page.title}
								</Button>
							))}
						</Box>
						<Box
							sx={{
								flexGrow: 0,
								display: {
									md: "flex",
									justifyContent: "center",
									alignItems: "center",
								},
							}}
						>
							<Typography variant="span" color="InfoText">
								{users.currentUser.name}
							</Typography>
							<IconButton sx={{ p: 0, mx: 2 }}>
								<Avatar alt="Remy Sharp" src={users.currentUser.avatarURL} />
							</IconButton>
							<Button onClick={logout} color="error" variant="contained">
								Logout
							</Button>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<div style={{ height: "100%" }}>
				<Outlet />
			</div>
			<Fab
				color="secondary"
				aria-label="add"
				sx={{ position: "fixed", right: 250, bottom: 50 }}
				onClick={() => setOpenModalQuestion(true)}
			>
				<AddIcon />
			</Fab>
			<ModalAddQuestion
				onClose={() => setOpenModalQuestion(false)}
				onSubmit={createQuestion}
				open={openModalQuestion}
			/>
		</Container>
	);
};

export default Home;
