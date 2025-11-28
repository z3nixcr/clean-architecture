import {LogRepository} from "../../domain/repository/log.repository";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";
import {LogDataSource} from "../../domain/datasources/log.datasource";


export class LogRepositoryImpl implements LogRepository {

    constructor(private readonly logDatasource: LogDataSource) {

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }

    async saveLog(log: LogEntity): Promise<void> {
        await this.logDatasource.saveLog(log);
    }

}