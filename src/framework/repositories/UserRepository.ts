import { ISQLHelper } from "../../core/interfaces/ISQLHelper";
import { inject, injectable } from "tsyringe";
import { Constants } from "../../core/common/Constants";
import { IUserRepository } from "../../core/interfaces/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {
    constructor(@inject('ISQLHelper') private dbHelper: ISQLHelper) {
        
    }

    getUserId = async (emailAddress: string): Promise<number> => {
        const res = await this.dbHelper.callFunction(Constants.fnGetUserId, [emailAddress]);
        return res[0] as number;
    }
}