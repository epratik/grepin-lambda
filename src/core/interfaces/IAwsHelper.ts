import AWS from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';

export interface IAwsHelper {
    sendMail(request: SendEmailRequest): Promise<boolean>;
    getEnvParameters(path: string): Promise<AWS.SSM.ParameterList>;
    getSingleParameter(path: string): Promise<AWS.SSM.Parameter | undefined>;
    getSingleSecret(path: string): Promise<AWS.SecretsManager.GetSecretValueResponse>
}