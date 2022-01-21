import "reflect-metadata"
import { diContainer } from "../framework/util/DIRegister";
import { PreSignUpTriggerEvent, PreSignUpTriggerHandler } from 'aws-lambda'
import { PreSignUpUseCase } from "../core/use_cases/PreSignUpUseCase";
import { ILogger } from "../core/interfaces/ILogger";
import { Constants } from "../core/common/Constants";

export const handler: PreSignUpTriggerHandler = async (event: PreSignUpTriggerEvent, context, callback) => {

    context.callbackWaitsForEmptyEventLoop = false;//sends the response right away instead of waiting for event loop to run.
    
    const logger: ILogger = diContainer.resolve("ILogger");
    const preSignUpUseCase: PreSignUpUseCase = diContainer.resolve("PreSignUpUseCase");
    try {
        callback(null, await preSignUpUseCase.validateAndAddUser(event))
    }
    catch (err: any) {
        await logger.logError({ source: event.triggerSource, message: err });
        throw new Error(Constants.internalServerError);
    }
}