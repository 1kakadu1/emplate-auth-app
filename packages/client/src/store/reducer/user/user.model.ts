export interface IUserData{
    email: string;
    name: string;
    id: number;
}

export interface IUserState{
    user?:IUserData;
    isAuth: boolean;
    isLoading: boolean;
    error?: string;
}