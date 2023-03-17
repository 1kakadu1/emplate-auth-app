import { IUserState } from "./user.model";

export const USER_KEY = 'stateUser';

export const initialStateUser: IUserState = {
    isAuth: false,
    user: undefined,
    isLoading: false,
}