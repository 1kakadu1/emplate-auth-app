import { IUser } from '../types';
import api, { API_URL } from '../services/api';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TOKEN_KEY_LOCAL_STORE, USER_KEY_LOCAL_STORE } from '../application/application.model';

export interface IAuthResponse {
	data: {
		accessToken: string;
		refreshToken: string;
		user: IUser;
		error?: string;
	};
}

export default class AuthServices {
	static async login(email: string, password: string): Promise<IAuthResponse> {
		try {
			const result = await api.post<IAuthResponse>('/login', {
				email,
				password,
			});
			localStorage.setItem(TOKEN_KEY_LOCAL_STORE, result.data.data.accessToken);
			localStorage.setItem(USER_KEY_LOCAL_STORE, JSON.stringify(result.data.data.user));
			return result.data;
		} catch (e: any) {
			const err = (e as AxiosError<any, any>)
			throw err?.response?.data?.data?.error || err.message;
		}
	}

	static async registation(email: string, password: string): Promise<IAuthResponse> {
		try {
			return (await api.post<IAuthResponse>('/registration', { email, password })).data;
		} catch (e: any) {
			const err = (e as AxiosError<any, any>)
			throw err?.response?.data?.data?.error || err.message;
		}
	}

	static async logout(): Promise<AxiosResponse<{ data: string }>> {
		try {
			return await api.post('/logout');
		} catch (e: any) {
			const err = (e as AxiosError<any, any>)
			throw err?.response?.data?.data?.error || err.message;
		}
	}

	static async verifyUser(): Promise<IAuthResponse> {
		try {
			const result = await axios.post<IAuthResponse>(`${API_URL}/refresh`, {}, { withCredentials: true });
			return result.data;
		} catch (e: any) {
			const err = (e as AxiosError<any, any>)
			throw err?.response?.data?.data?.error || err.message;
		}
	}
}
