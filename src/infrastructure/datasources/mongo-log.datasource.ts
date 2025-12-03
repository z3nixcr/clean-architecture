import {LogDataSource} from "../../domain/datasources/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";
import {Promise} from "mongoose";
import {LogModel} from "../../data/mongo";


export class MongoLogDataSource implements LogDataSource {

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({level: severityLevel})
        return logs.map(LogEntity.fromObject) // ~ mongoLo => LogEntity.fromObject(mongoLo)
    }

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('Mongo Log created successfully: ',newLog.id);
    }

}