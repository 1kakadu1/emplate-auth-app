import { createSelector } from "@reduxjs/toolkit";
import { createFeatureSelector } from "../../../utils/store.utils";
import { USERS_KEY } from "./users.const";
import { IUsersState } from "./users.model";

export const usersSelector = createFeatureSelector<IUsersState>(USERS_KEY);

const users = createSelector(usersSelector, ({ users }) => users);
const isLoading = createSelector(usersSelector, ({ isLoading }) => isLoading);
const error = createSelector(usersSelector, ({ error }) => error);

export const toUserSelector = {
  users,
  error,
  isLoading,
};
