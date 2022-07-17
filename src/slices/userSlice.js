import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userAPI from "../utils/userAPI";

const getUsers = createAsyncThunk("users/getUsers", async () => {
	return await userAPI.getUsers();
});

const initialState = {
	allUsers: undefined,
	currentUser: undefined,
	loading: false,
};

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		authorizedUser: (state, action) => {
			state.currentUser = state.allUsers[action.payload];
		},
		unauthorizedUser: (state, action) => {
			state.currentUser = undefined;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUsers.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.allUsers = action.payload;
			state.loading = false;
		});
	},
});

const { actions, reducer } = userSlice;

export { getUsers };
export const { authorizedUser, unauthorizedUser } = actions;
export default reducer;
