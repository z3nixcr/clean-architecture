import * as fs from "node:fs";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";
import {LogDataSource} from "../../domain/datasources/log.datasource";


export class FileSystemDatasource implements LogDataSource {

    private readonly logPath = './logs'
    private readonly allLogsPath = './logs/logs-all.log'
    private readonly mediumLogsPath = './logs/logs-medium.log'
    private readonly highLogsPath = './logs/logs-high.log'

    constructor() {
        this.createLogsFiles()
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(path => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
        })
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content   = fs.readFileSync(path, 'utf8');
        if (content === '') return []
        return content.split('\n').map(LogEntity.fromJson);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low   : return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium: return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high  : return this.getLogsFromFile(this.highLogsPath);
            default: throw new Error(`${severityLevel} severity level not implemented`);
        }
    }

    async saveLog(log: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(log)}\n`

        fs.appendFileSync(this.allLogsPath, logAsJson);
        if (log.level === LogSeverityLevel.low) return;
        if (log.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
    }


}