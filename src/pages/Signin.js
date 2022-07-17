import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	LinearProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { authorizedUser, getUsers } from "../slices/userSlice";
import { getQuestions } from "../slices/questionSlice";

const Signin = () => {
	const [userId, setUserId] = useState("");
	const [error, setError] = useState(false);

	const dispatch = useDispatch();

	const users = useSelector((state) => state.users);
	const questions = useSelector((state) => state.questions);

	useEffect(() => {
		if (!users.allUsers) {
			dispatch(getUsers());
		}

		if (!questions.allQuestions) {
			dispatch(getQuestions());
		}
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!userId) {
			return setError(true);
		}

		dispatch(authorizedUser(userId));
	};

	const handleChange = (event) => {
		setUserId(event.target.value);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<FormControl sx={{ mt: 1, minWidth: 400 }} disabled={users.loading}>
					<InputLabel id="account-label">Choose your account</InputLabel>
					<Select
						value={userId}
						onChange={handleChange}
						labelId="account-label"
						id="account-select"
						fullWidth
						label="Choose your account"
						error={error}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{users.allUsers &&
							Object.values(users.allUsers).map((user) => (
								<MenuItem key={user.id} value={user.id}>
									<b>{user.name}</b>
								</MenuItem>
							))}
					</Select>
					{error && <FormHelperText>Please select an account</FormHelperText>}
					<Button
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						onClick={handleSubmit}
						disabled={users.loading}
						color="error"
					>
						Sign In
					</Button>
					{(users.loading || questions.loading) && (
						<LinearProgress color="error" />
					)}
				</FormControl>
			</Box>
		</Container>
	);
};

export default Signin;
