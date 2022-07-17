import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userAPI from "../utils/userAPI";
import { getUsers } from "./userSlice";

const getQuestions = createAsyncThunk("questions/getQuestions", async () => {
	return await userAPI.getQuestions();
});

const saveQuestionAnswer = createAsyncThunk(
	"questions/saveQuestionAnswer",
	async (answer, thunkAPI) => {
		const data = await userAPI.saveQuestionAnswer(answer);
		await thunkAPI.dispatch(getUsers());

		return data;
	}
);

const saveQuestion = createAsyncThunk(
	"questions/saveQuestion",
	async (question, thunkAPI) => {
		const data = await userAPI.saveQuestion(question);
		await thunkAPI.dispatch(getUsers());

		return data;
	}
);

const initialState = {
	allQuestions: undefined,
	loading: false,
};

const questionSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getQuestions.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getQuestions.fulfilled, (state, action) => {
			state.allQuestions = action.payload;
			state.loading = false;
		});
		builder.addCase(saveQuestionAnswer.fulfilled, (state, action) => {
			const { authedUser, qid, answer } = action.meta.arg;
			state.allQuestions = {
				...state.allQuestions,
				[qid]: {
					...state.allQuestions[qid],
					[answer]: {
						...state.allQuestions[qid][answer],
						votes: state.allQuestions[qid][answer].votes.concat([authedUser]),
					},
				},
			};
		});
		builder.addCase(saveQuestion.fulfilled, (state, action) => {
			state.allQuestions = {
				...state.allQuestions,
				[action.payload.id]: action.payload,
			};
		});
	},
});

const { reducer } = questionSlice;
export { getQuestions, saveQuestionAnswer, saveQuestion };
export default reducer;
