import { Container } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import QuestionItem from "../components/QuestionItem";

const Unanswared = () => {
	const currentUser = useSelector((state) => state.users.currentUser);
	const allQuestions = useSelector((state) => state.questions.allQuestions);

	const unansweredQuestionMemo = useMemo(() => {
		return Object.values(allQuestions).filter(
			(question) =>
				![...question.optionOne.votes, ...question.optionTwo.votes].includes(
					currentUser.id
				)
		);
	}, [allQuestions]);

	return (
		<Container
			sx={{
				py: 2,
				display: "flex",
				flexDirection: "column",
				gap: 2,
				textAlign: unansweredQuestionMemo.length ? "left" : "center",
			}}
		>
			{unansweredQuestionMemo.length ? (
				unansweredQuestionMemo.map((question) => (
					<QuestionItem key={question.id} {...question} />
				))
			) : (
				<h4>No questions remaining</h4>
			)}
		</Container>
	);
};

export default Unanswared;
