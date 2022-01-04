import winston from 'winston';
import { Constants } from '../../core/common/Constants';
import { IConfigManager } from '../../core/interfaces/IConfigManager';
import { inject, injectable } from "tsyringe";
import { LogDetails } from "../../core/types/model/LogDetails";
import { ILogger } from '../../core/interfaces/ILogger';
import { format } from 'winston';

@injectable()
export class WinstonLogger implements ILogger {

  constructor(@inject("IConfigManager") private configManager: IConfigManager) {
    
  }

  private init = async (): Promise<winston.Logger> => {
    if (!winston.loggers.has(Constants.loggerName)) {
      winston.loggers.add(Constants.loggerName, {
        transports: [
          new winston.transports.Console({
            // level: await this.configManager.getLogLevel,
            level: process.env.LOG_LEVEL,
            format: format.combine(
              format.errors({ stack: true }),
              format.metadata(),
              format.json(),
            ),
          })
        ]
      });
    }
    return winston.loggers.get(Constants.loggerName);
  }

  logError = async (data: LogDetails) => {
    const logger = await this.init();
    logger.error(data);
  }
    
  logInfo = async (data: LogDetails) => {
    const logger = await this.init();
    logger.info(data);
  }
}