import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { TOKEN_KEY_LOCAL_STORE } from '../application/application.model';
import { IAuthResponse } from './AuthServices';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

export const API_URL = 'http://localhost:8001/api';

const api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

api.interceptors.request.use((config) => {
	console.log('get', api);
	(config.headers as any).Authorization = `Bearer ${localStorage.getItem(TOKEN_KEY_LOCAL_STORE)}`;
	return config;
});

api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true;
			console.log('interceptors', originalRequest);
			try {
				const response = await axios.post<IAuthResponse>(`${API_URL}/refresh`, {}, { withCredentials: true });
				localStorage.setItem(TOKEN_KEY_LOCAL_STORE, response.data.data.accessToken);

				return api.request(originalRequest);
			} catch (e) {
				console.log('NOT AUTH USER');
			}
		}

		throw error;
	},
);

export const axiosBaseQuery =
	(
		{ baseUrl }: { baseUrl: string } = { baseUrl: API_URL },
	): BaseQueryFn<
		{
			url: string;
			method: AxiosRequestConfig['method'];
			data?: AxiosRequestConfig['data'];
			params?: AxiosRequestConfig['params'];
		},
		unknown,
		unknown
	> =>
	async ({ url, method, data, params }) => {
		try {
			const result = await api({ url: baseUrl + url, method, data, params });
			return { data: result.data };
		} catch (axiosError) {
			let err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};

export default api;
