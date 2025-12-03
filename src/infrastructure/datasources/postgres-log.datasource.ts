import {LogDataSource} from "../../domain/datasources/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";
import {Promise} from "mongoose";
import {prisma} from "../../lib/prisma";
import {SeverityLevel} from "../../generated/prisma/enums";

const LEVELS_MAP = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDataSource implements LogDataSource {
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const prismaLogs = await prisma.logModel.findMany({})
        return prismaLogs.map(LogEntity.fromObject)
    }

    async saveLog(log: LogEntity): Promise<void> {
        const { level, ...rest } = log;
        const newLog = await prisma.logModel.create({
            data: {
                level: LEVELS_MAP[level],
                ...rest,
            },
            select: {
                id: true
            }
        })
        console.log('Postgres Log created successfully: ',newLog.id);
    }
}