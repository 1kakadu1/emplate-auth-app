import { IUserData } from "../store/reducer/user/user.model";
export const USER_KEY_LOCAL_STORE = "USER_STORE";
export const TOKEN_KEY_LOCAL_STORE = "TOKEN_JWT";
export enum RoutsPath {
	init = '/',
	home = '/home',
	login = "/login",
	profile = "/profile",
	registration = "/registration",
	not_found = "/404"
}

export interface IRouteItem {
	name: string;
	icon?: JSX.Element;
	private: boolean;
	element: JSX.Element;
	location: RoutsPath;
	path: string;
	exact?: boolean
	isMenu?: boolean;
}

export interface IApplicationRoute {
	user?: IUserData;
	isAuth: boolean;
}

