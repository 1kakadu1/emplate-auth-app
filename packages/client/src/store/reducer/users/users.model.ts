import { IUser } from "../../../types";

export interface IUsersState {
  users: IUser[];
  userCurrent?: IUser;
  isLoading: boolean;
  error?: string;
  filters:{
    limit?: number;
    offset?: number;
    orderBy?: "desc" | "asc"
  }
}
