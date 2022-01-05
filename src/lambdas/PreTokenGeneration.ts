import "reflect-metadata"
import { diContainer } from "../framework/util/DIRegister";
import { PreTokenGenerationTriggerHandler, PreTokenGenerationTriggerEvent } from 'aws-lambda'
import { PreTokenGenerationUseCase } from "../core/use_cases/PreTokenGenerationUseCase";
import { ILogger } from "../core/interfaces/ILogger";

export const handler: PreTokenGenerationTriggerHandler = async (event: PreTokenGenerationTriggerEvent, context, callback) => {

    //Don't wait for the event loop to be empty, freeze process after callback is executed.
    context.callbackWaitsForEmptyEventLoop = false;
    
    const logger: ILogger = diContainer.resolve("ILogger");
    const preTokenGenUseCase: PreTokenGenerationUseCase = diContainer.resolve("PreTokenGenerationUseCase");

    if (event.triggerSource === "TokenGeneration_HostedAuth" || event.triggerSource === "TokenGeneration_RefreshTokens" ||
        event.triggerSource === "TokenGeneration_NewPasswordChallenge") {
        try {
            callback(null, await preTokenGenUseCase.addClaimsToToken(event))
        }
        catch (err) {
            await logger.logError({ source: event.triggerSource, message: JSON.stringify(err) });
        }
    }
    else
        callback(null, event);
}