import { IUser } from "../types";
import api from "../services/api";

export default class UserServices {
    static async getUserByID(id: string): Promise<IUser>{
        try{
            const result = await api.get("/user/"+id);
            return result.data.data.user;
        }catch(e: any){
            throw e.response.data.error;
        }
    }
}