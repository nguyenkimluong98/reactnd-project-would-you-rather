import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import questionSlice from "../slices/questionSlice";
import logger from "../middlewares/logger";

const store = configureStore({
	reducer: {
		users: userSlice,
		questions: questionSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
