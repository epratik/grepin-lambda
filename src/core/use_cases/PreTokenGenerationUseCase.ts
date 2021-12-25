import "reflect-metadata"
import { inject, injectable } from "tsyringe";
import { PreTokenGenerationTriggerEvent } from 'aws-lambda'
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
export class PreTokenGenerationUseCase {

    constructor(
        @inject("IUserRepository") private userRepo: IUserRepository) {
        
    }

    addClaimsToToken = async (event: PreTokenGenerationTriggerEvent)
        : Promise<PreTokenGenerationTriggerEvent> => {
        
        const userId = await this.userRepo.getUserId(event.request.userAttributes['email']);

        event.response = {
            claimsOverrideDetails: {
                claimsToAddOrOverride: {
                    userId: userId.toString()
                },
            }
        }

        return event;
    }
}