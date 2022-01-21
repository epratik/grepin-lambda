import { ISQLHelper } from "../../core/interfaces/ISQLHelper";
import { inject, injectable } from "tsyringe";
import { Constants } from "../../core/common/Constants";
import { IUserRepository } from "../../core/interfaces/IUserRepository";
import { User } from "../../core/types/model/User";

@injectable()
export class UserRepository implements IUserRepository {
    constructor(@inject('ISQLHelper') private dbHelper: ISQLHelper) {
        
    }

    getUserId = async (emailAddress: string): Promise<number> => {
        const res = await this.dbHelper.callFunction(Constants.fnGetUserId, [emailAddress]);
        const item = res[0];
        return item[Object.keys(item)[0]] as number;
    }

    addUser = async (user: User): Promise<void> => {
        await this.dbHelper.callProcedure(Constants.spCreateUser, [user.firstName, user.lastName ? user.lastName : null, user.userEmail]);
    }
}