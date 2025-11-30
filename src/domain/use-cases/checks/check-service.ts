import {LogRepository} from "../../repository/log.repository";
import {LogEntity, LogSeverityLevel} from "../../entities/log.entity";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type FailureCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback?: SuccessCallback,
        private readonly failureCallback?: FailureCallback
    ) {}

    async execute(url: string): Promise<boolean> {
        const origin: string = 'check-service.ts'
        try {
            const request = await fetch(url);
            if (!request.ok) {
                throw new Error(`Failed to check service: ${url}`);
            }
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Service ${url} working`,
                origin,
            })
            await this.logRepository.saveLog(log)
            this.successCallback && this.successCallback();
            return true;
        } catch (error) {
            const errorMessage: string = `${url} not working. ${error}`;
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: errorMessage,
                origin,
            });
            await this.logRepository.saveLog(log)
            this.failureCallback && this.failureCallback(errorMessage);
            return false;
        }
    }
}