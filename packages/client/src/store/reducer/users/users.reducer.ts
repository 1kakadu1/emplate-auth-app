import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types";
import { USERS_KEY } from "./users.const";
import { IUsersState } from "./users.model";


const setUsers = (
  state: IUsersState,
  { payload }: { payload: { user: IUser[] } }
) => {
  state.users = payload.user;
  state.isLoading = false;
};

export const usersSlice = createSlice({
  name: USERS_KEY,
  initialState: {
    users: [],
    isLoading: false,
    filters: {}
  },
  reducers: {
    setUsers,
  },
  extraReducers: {
    
  },
});

export const toUsersAction = usersSlice.actions;
