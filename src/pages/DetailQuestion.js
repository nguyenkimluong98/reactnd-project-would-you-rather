import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AnswaredQuestionItem from "../components/AnsweredQuestionItem";

const DetailQuestion = () => {
	const params = useParams();
	const questionId = params.id;
	const allQuestions = useSelector((state) => state.questions.allQuestions);

	const question = allQuestions[questionId];

	return (
		<Container
			sx={{
				py: 2,
				display: "flex",
				flexDirection: "column",
				gap: 2,
			}}
		>
			<AnswaredQuestionItem {...{ ...question, isDetail: true }} />
		</Container>
	);
};

export default DetailQuestion;
