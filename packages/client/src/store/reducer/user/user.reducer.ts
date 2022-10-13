import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOKEN_KEY_LOCAL_STORE, USER_KEY_LOCAL_STORE } from '../../../application/application.model';
import AuthServices from '../../../services/AuthServices';
import UserServices from '../../../services/UserServices';
import { IUser } from '../../../types';
import { USER_KEY } from './user.const';
import { IUserData, IUserState } from './user.model';

export const fetchVerifyUser = createAsyncThunk(USER_KEY + '/fetchVerifyUser', async () => {
	const response = await AuthServices.verifyUser();
	localStorage.setItem(TOKEN_KEY_LOCAL_STORE, response.data.accessToken);
	return response.data.user;
});

export const fetchUserByID = createAsyncThunk(USER_KEY + '/fetchUserByID', async (id: string) => {
	const response = await UserServices.getUserByID(id);
	return response;
});

export const fetchLogoutUser = createAsyncThunk(USER_KEY + '/fetchLogoutUser', async () => {
	try {
		const response = await AuthServices.logout();
		localStorage.removeItem(TOKEN_KEY_LOCAL_STORE);
		localStorage.removeItem(USER_KEY_LOCAL_STORE);
		return response.data.data;
	} catch (e: any) {
		return e.response.data;
	}
});

const setUser = (state: IUserState, { payload }: { payload: { user: IUserData } }) => {
	state.isAuth = true;
	state.user = payload.user;
	state.isLoading = false;
};

const setUserError = (state: IUserState, { payload }: { payload: string }) => {
	state.error = payload === '' ? undefined : payload;
};

export const userSlice = createSlice({
	name: USER_KEY,
	initialState: {
		isAuth: false,
		user: undefined,
		isLoading: false,
	},
	reducers: {
		setUser,
		setUserError,
	},
	extraReducers: {
		[fetchVerifyUser.fulfilled.type]: (state: IUserState, { payload }: { payload: IUser }) => {
			state.isAuth = true;
			state.user = payload;
			state.isLoading = false;
		},
		[fetchVerifyUser.pending.type]: (state: IUserState) => {
			state.isLoading = true;
			state.error = '';
		},
		[fetchVerifyUser.rejected.type]: (state: IUserState, { error }: { error: { message: string } }) => {
			state.error = error.message;
			state.isLoading = false;
		},
		[fetchLogoutUser.fulfilled.type]: (state: IUserState) => {
			state.isAuth = false;
			state.user = undefined;
		},
		[fetchLogoutUser.pending.type]: (state: IUserState) => {
			state.error = '';
		},
		[fetchLogoutUser.rejected.type]: (state: IUserState, { error }: { error: { message: string } }) => {
			state.error = error.message;
		},

		[fetchUserByID.fulfilled.type]: (state: IUserState, { payload }: { payload: IUser }) => {
			state.user = payload;
		},
		[fetchUserByID.pending.type]: (state: IUserState) => {
			state.error = '';
		},
		[fetchUserByID.rejected.type]: (state: IUserState, { error }: { error: { message: string } }) => {
			state.error = error.message;
		},
	},
});

export const toUserAction = userSlice.actions;
