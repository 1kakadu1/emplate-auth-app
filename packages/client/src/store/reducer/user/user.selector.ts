import { createSelector } from '@reduxjs/toolkit';
import { USER_KEY } from './user.const';
import { IUserState } from './user.model';

export const userSelector = (state: any): IUserState => state[USER_KEY];

export const isAuth = createSelector(userSelector, ({ isAuth }) => isAuth);
export const user = createSelector(userSelector, ({ user }) => user);
export const isLoading = createSelector(userSelector, ({ isLoading }) => isLoading);
export const error = createSelector(userSelector, ({ error }) => error);

export const toUserSelector = {
	user,
	isAuth,
	error,
	isLoading,
};
