import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import LeaderBoardItem from "../components/LeaderBoardItem";

const LeaderBoard = () => {
	const allUsers = useSelector((state) => state.users.allUsers);

	return (
		<Grid container spacing={2} sx={{ py: 2 }}>
			{allUsers &&
				Object.values(allUsers).map((user) => (
					<Grid key={user.id} item xs={6}>
						<LeaderBoardItem {...user} />
					</Grid>
				))}
		</Grid>
	);
};

export default LeaderBoard;
