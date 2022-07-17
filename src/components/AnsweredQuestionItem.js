import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AnswaredQuestionItem = (props) => {
	const { author, timestamp, optionOne, optionTwo, isDetail, id } = props;
	const users = useSelector((state) => state.users);
	const navigate = useNavigate();

	const numberVoteOne = optionOne.votes.length;
	const numberVoteTwo = optionTwo.votes.length;

	const percentageOne = (numberVoteOne / (numberVoteOne + numberVoteTwo)) * 100;
	const percentageTwo = 100 - percentageOne;

	let choosedText =
		numberVoteOne > numberVoteTwo ? optionOne.text : optionTwo.text;

	const detailPoll = () => {
		return (
			<div>
				<Typography component="div" variant="h5">
					Result:
				</Typography>
				<Typography component="div" variant="h6">
					{optionOne.text}:
				</Typography>
				<Typography variant="subtitle2" color="text.secondary" component="li">
					Votes: {numberVoteOne}
				</Typography>
				<Typography variant="subtitle2" color="text.secondary" component="li">
					Percentage: {percentageOne}%
				</Typography>
				<Typography component="div" variant="h6">
					{optionTwo.text}:
				</Typography>
				<Typography variant="subtitle2" color="text.secondary" component="li">
					Votes: {numberVoteTwo}
				</Typography>
				<Typography variant="subtitle2" color="text.secondary" component="li">
					Percentage: {percentageTwo}%
				</Typography>
			</div>
		);
	};

	return (
		<Card>
			<Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
				<Typography component="div" variant="h6">
					{users.allUsers[author].name} asked:
				</Typography>
				<Box sx={{ display: "flex" }}>
					<Box sx={{ display: "flex", flex: 3 }}>
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
								<Typography
									variant="subtitle1"
									color="text.secondary"
									component="div"
								>
									Choosed:
								</Typography>
								<Typography
									variant="subtitle1"
									color="text.secondary"
									component="div"
								>
									<b>{choosedText}</b>
								</Typography>
								{!isDetail && (
									<Button
										onClick={() => {
											navigate(`/question/${id}`);
										}}
										color="error"
										variant="contained"
										sx={{ mt: 1.5 }}
									>
										View poll
									</Button>
								)}
							</CardContent>
						</Box>
						{isDetail && <Box sx={{ ml: 20, mt: 2 }}>{detailPoll()}</Box>}
					</Box>
				</Box>
			</Box>
		</Card>
	);
};

export default AnswaredQuestionItem;
