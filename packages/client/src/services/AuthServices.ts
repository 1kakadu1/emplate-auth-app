import { IUser } from "../types";
import api, { API_URL } from "../services/api";
import axios, { AxiosResponse } from "axios";
import {
  TOKEN_KEY_LOCAL_STORE,
  USER_KEY_LOCAL_STORE,
} from "../application/application.model";

export interface IAuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: IUser;
    error?: string;
  };
}

export default class AuthServices {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    try {
      const result = await api.post<IAuthResponse>("/login", {
        email,
        password,
      });
      localStorage.setItem(TOKEN_KEY_LOCAL_STORE, result.data.data.accessToken);
      localStorage.setItem(
        USER_KEY_LOCAL_STORE,
        JSON.stringify(result.data.data.user)
      );
      return result;
    } catch (e: any) {
      return e.response.data;
    }
  }

  static async registation(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return api.post<IAuthResponse>("/registration", { email, password });
  }

  static async logout(): Promise<AxiosResponse<{ data: string }>> {
    try {
      return api.post("/logout");
    } catch (e: any) {
      throw e.response.data.error;
    }
  }

  static async verifyUser(): Promise<AxiosResponse<IAuthResponse>> {
    try {
      return axios.post<IAuthResponse>(
        `${API_URL}/refresh`,
        {},
        { withCredentials: true }
      );
    } catch (e: any) {
      throw e.response.data.error;
    }
  }
}
