import { createSelector } from '@reduxjs/toolkit';
import { createFeatureSelector } from '../../../utils/store.utils';
import { USER_KEY } from './user.const';
import { IUserState } from './user.model';

export const userSelector = createFeatureSelector<IUserState>(USER_KEY);

const isAuth = createSelector(userSelector, ({ isAuth }) => isAuth);
const user = createSelector(userSelector, ({ user }) => user);
const isLoading = createSelector(userSelector, ({ isLoading }) => isLoading);
const error = createSelector(userSelector, ({ error }) => error);

export const toUserSelector = {
	user,
	isAuth,
	error,
	isLoading,
};
