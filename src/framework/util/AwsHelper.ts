import { IAwsHelper } from '../../core/interfaces/IAwsHelper'
import AWS from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import { Constants } from '../../core/common/Constants';

export class AwsHelper implements IAwsHelper {

    async sendMail(emailRequest: SendEmailRequest): Promise<boolean> {
        const ses: AWS.SES = new AWS.SES();
        const result = await ses.sendEmail(emailRequest).promise();
        return true;
    }
   
    async getEnvParameters(path: string): Promise<AWS.SSM.ParameterList> {
       
        const ssm = new AWS.SSM({ apiVersion: Constants.paramStoreAPIVersion });

        try {
            const params: AWS.SSM.GetParametersByPathRequest = {
                Path: path,
                Recursive: true,
                NextToken: undefined
            };

            return await this.getParametersByPath(undefined, ssm, params);
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * Recursively fetch pages of parameters. AWS gives 10 at once.
     * @param nextToken will be defined if there are more then 10 parameters.
     * @returns 
     */
    private async getParametersByPath(nextToken: string | undefined, ssm: AWS.SSM,
        params: AWS.SSM.GetParametersByPathRequest): Promise<AWS.SSM.ParameterList> {
        
        const fetchedParams: AWS.SSM.ParameterList = [];
        const promise = await ssm.getParametersByPath(params).promise();
        
        fetchedParams.push(...promise.Parameters!);

        if (promise.NextToken) {
            params.NextToken = promise.NextToken;
            fetchedParams.push(...await this.getParametersByPath(promise.NextToken, ssm, params));
        }
        else
            return promise.Parameters!;
        
        return fetchedParams;
    }

    /**
* get secrets JSON. contains db credentials.
* @param path 
* @returns 
*/
    async getSingleSecret(path: string): Promise<AWS.SecretsManager.GetSecretValueResponse> {
        const sm = new AWS.SecretsManager({ apiVersion: Constants.secretStoreAPIVersion });
        
        try {
            const params: AWS.SecretsManager.GetSecretValueRequest = {
                SecretId: Constants.getServiceConfigPath()
            };
        
            return await sm.getSecretValue(params).promise();
        }
        catch (err) {
            throw err;
        }
    }

    /**
 * Returns parameter that matches the parameter.
 * @param path full path of parameter
 * @returns 
 */
    async getSingleParameter(path: string): Promise<AWS.SSM.Parameter | undefined> {
       
        const ssm = new AWS.SSM({ apiVersion: Constants.paramStoreAPIVersion });
    
        const params: AWS.SSM.GetParameterRequest = {
            Name: path
        };
    
        const result = await ssm.getParameter(params).promise();
        return result.Parameter
    }
}

