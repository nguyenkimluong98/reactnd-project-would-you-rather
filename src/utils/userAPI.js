import {
	_getUsers,
	_getQuestions,
	_saveQuestion,
	_saveQuestionAnswer,
} from "./_DATA";

export const getUsers = async () => {
	return await _getUsers();
};

export const getQuestions = async () => {
	return await _getQuestions();
};

export const saveQuestion = async (question) => {
	return await _saveQuestion(question);
};

export const saveQuestionAnswer = async (answer) => {
	return await _saveQuestionAnswer(answer);
};
