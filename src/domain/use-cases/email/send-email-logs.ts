import {LogEntity, LogSeverityLevel} from "../../entities/log.entity";
import {EmailService} from "../../../presentation/email/email.service";
import {LogRepository} from "../../repository/log.repository";


interface SendEmailLogsUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendEmailLogsUseCase {

    private readonly origin = 'send-email-logs.ts';

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) {}

    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sent = this.emailService.sendEmailWithFileSystemLogs(to)
            if (!sent) {
                throw new Error('Email log not sent');
            }
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Log email sent',
                origin: this.origin,
            })
            await this.logRepository.saveLog(log)
            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Log not sent',
                origin: this.origin,
            })
            await this.logRepository.saveLog(log)
            return false;
        }
    }

}