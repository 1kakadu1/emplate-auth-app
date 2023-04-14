import { IUser } from '../types';
import api from '../services/api';
import { AxiosError } from 'axios';

export default class UserServices {
	static async getUserByID(id: string): Promise<IUser> {
		try {
			const result = await api.get('/users/' + id);
			return result.data.data.user;
		} catch (e: unknown) {
			const err = (e as AxiosError<any, any>)
			throw err?.response?.data?.data?.error || err.message;
		}
	}
}
