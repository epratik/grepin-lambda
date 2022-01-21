import "reflect-metadata"
import { container } from 'tsyringe';
import { ConfigManager } from "../../core/common/ConfigManager";
import { CacheManager } from "./CacheManager";
import { AwsHelper } from "./AwsHelper";
import { SQLHelper } from "./SQLHelper";
import { WinstonLogger } from "./WinstonLogger";

import { PreTokenGenerationUseCase } from "../../core/use_cases/PreTokenGenerationUseCase";
import { UserRepository } from "../repositories/UserRepository";
import { PreSignUpUseCase } from "../../core/use_cases/PreSignUpUseCase";

container.registerSingleton("ICacheManager", CacheManager)
container.registerSingleton("IAwsHelper", AwsHelper)
container.registerSingleton("IConfigManager", ConfigManager)
container.registerSingleton("ISQLHelper", SQLHelper)
container.registerSingleton("IUserRepository", UserRepository)
container.registerSingleton("ILogger", WinstonLogger);
container.register("PreTokenGenerationUseCase", PreTokenGenerationUseCase)
container.register("PreSignUpUseCase", PreSignUpUseCase)
export const diContainer = container;
