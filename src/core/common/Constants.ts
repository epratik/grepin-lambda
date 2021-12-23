export abstract class Constants{
    static paramStoreAPIVersion: string = "2014-11-06"
    static dynamoDBAPIVersion: string = "2012-08-10";
    static cloudWatchAPIVersion: string = "2012-08-10";
    static secretStoreAPIVersion = "2017-10-17";
    static loggerName = "lambdaLogger";
    static separator = "/";
    static projectName = "gp";
    static serviceConfigName = "serviceConfig";

    static getServiceConfigPath(): string {
        return this.separator + this.projectName + this.separator + process.env.NODE_ENV +
            this.separator + this.serviceConfigName
    }
}