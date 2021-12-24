export interface IUserRepository{
    getUserId(emailAddress: string): Promise<number>;
}