import { User } from "../types/model/User";

export interface IUserRepository{
    getUserId(emailAddress: string): Promise<number>;
    addUser(user: User): Promise<void>;
}