import { LogDetails } from "../types/model/LogDetails";

export interface ILogger {
    logError(data: LogDetails): void;
    logInfo(data: LogDetails): void;
}