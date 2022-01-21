import "reflect-metadata"
import { inject, injectable } from "tsyringe";
import { PreSignUpTriggerEvent } from 'aws-lambda'
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../types/model/User";

@injectable()
export class PreSignUpUseCase {

    constructor(
        @inject("IUserRepository") private userRepo: IUserRepository,
    ) {
        
    }

    validateAndAddUser = async (event: PreSignUpTriggerEvent)
        : Promise<PreSignUpTriggerEvent> => {
        
        const user: User = {
            firstName: event.request.userAttributes["name"],
            lastName: event.request.userAttributes["family_name"],
            userEmail: event.request.userAttributes["email"]
        }
     
        await this.userRepo.addUser(user);
        return event;
    }
}