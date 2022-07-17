import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	FormControl,
	FormControlLabel,
	FormLabel,
	LinearProgress,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { saveQuestionAnswer } from "../slices/questionSlice";

const QuestionItem = (props) => {
	const { author, timestamp, optionOne, optionTwo, id } = props;

	const [openPoll, setOpenPoll] = useState(false);
	const [submiting, setSubmiting] = useState(false);
	const [answer, setAnswer] = useState("");

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users);

	const onSelectAnswerChange = (e) => {
		setAnswer(e.target.value);
	};

	const onSubmit = () => {
		setSubmiting(true);
		dispatch(
			saveQuestionAnswer({ authedUser: users.currentUser.id, qid: id, answer })
		);
	};

	return (
		<Card>
			<Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
				<Typography component="div" variant="h6">
					{users.allUsers[author].name} asked:
				</Typography>

				<Box sx={{ display: "flex" }}>
					<Box sx={{ display: "flex", flex: 1 }}>
						<CardMedia
							component="img"
							sx={{
								width: 150,
								height: 150,
								borderRadius: "50%",
								mr: 2,
								mt: 2,
							}}
							image={users.allUsers[author].avatarURL}
							alt={users.allUsers[author].name}
							title={users.allUsers[author].name}
						/>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<CardContent sx={{ flex: "1 0 auto" }}>
								<Typography
									variant="subtitle2"
									color="text.secondary"
									component="div"
								>
									Created at: {new Date(timestamp).toLocaleString("en-US")}
								</Typography>
								<Typography component="div" variant="h6">
									Would you rather...
								</Typography>
								<div>
									<b>- {optionOne.text}</b>
								</div>
								<div>or</div>
								<div>
									<b>- {optionTwo.text}</b>
								</div>
								<Button
									onClick={() => {
										setOpenPoll(!openPoll);
										setAnswer("");
									}}
									color="error"
									variant={openPoll ? "outlined" : "contained"}
									sx={{ mt: 1.5 }}
								>
									{openPoll ? "Hide poll" : "View poll"}
								</Button>
							</CardContent>
						</Box>
					</Box>
					<Box sx={{ display: "flex", flex: 1, margin: 2 }}>
						{openPoll && (
							<FormControl sx={{ minWidth: 420, textAlign: "center" }}>
								<FormLabel id="options-label">
									<b>{optionOne.text}</b> or <b>{optionTwo.text}</b>?
								</FormLabel>
								<RadioGroup
									aria-labelledby="options-label"
									onChange={onSelectAnswerChange}
								>
									<FormControlLabel
										value="optionOne"
										control={<Radio />}
										label={optionOne.text}
									/>
									<FormControlLabel
										value="optionTwo"
										control={<Radio />}
										label={optionTwo.text}
									/>
								</RadioGroup>
								<Button
									color="primary"
									variant="contained"
									sx={{ mt: 3.8 }}
									disabled={!answer || submiting}
									onClick={onSubmit}
								>
									Submit
								</Button>
								{submiting && <LinearProgress />}
							</FormControl>
						)}
					</Box>
				</Box>
			</Box>
		</Card>
	);
};

export default QuestionItem;
