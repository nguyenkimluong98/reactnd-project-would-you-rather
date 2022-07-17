import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const LeaderBoardItem = (props) => {
	const { avatarURL, answers, questions, name } = props;

	return (
		<Card>
			<Box sx={{ display: "flex", p: 1 }}>
				<CardMedia
					component="img"
					sx={{ width: 150, height: 150, borderRadius: "50%", mr: 2 }}
					image={avatarURL}
					alt={name}
					title={name}
				/>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<CardContent sx={{ flex: "1 0 auto" }}>
						<Typography component="div" variant="h5">
							{name}
						</Typography>
						<Typography
							variant="subtitle1"
							color="text.secondary"
							component="div"
						>
							Created Questions: {questions.length}
						</Typography>
						<Typography
							variant="subtitle1"
							color="text.secondary"
							component="div"
						>
							Answered Questions: {Object.keys(answers).length}
						</Typography>
						<Typography variant="h6" color="text.secondary" component="h6">
							<b>Total: {questions.length + Object.keys(answers).length}</b>
						</Typography>
					</CardContent>
				</Box>
			</Box>
		</Card>
	);
};

export default LeaderBoardItem;
