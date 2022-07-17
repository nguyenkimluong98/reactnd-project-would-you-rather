import { Container } from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import AnswaredQuestionItem from "../components/AnsweredQuestionItem";

const Answered = () => {
	const currentUser = useSelector((state) => state.users.currentUser);
	const allQuestions = useSelector((state) => state.questions.allQuestions);

	const answeredQuestionMemo = useMemo(() => {
		return Object.values(allQuestions).filter((question) =>
			[...question.optionOne.votes, ...question.optionTwo.votes].includes(
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
				textAlign: answeredQuestionMemo.length ? "left" : "center",
			}}
		>
			{answeredQuestionMemo.length ? (
				answeredQuestionMemo.map((question) => (
					<AnswaredQuestionItem key={question.id} {...question} />
				))
			) : (
				<h4>No questions remaining</h4>
			)}
		</Container>
	);
};

export default Answered;
