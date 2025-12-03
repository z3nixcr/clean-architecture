import {CronService} from "./cron/cron.service";
import {CheckService} from "../domain/use-cases/checks/check-service";
import {LogRepositoryImpl} from "../infrastructure/repositories/log.repository.impl";
import {FileSystemDatasource} from "../infrastructure/datasources/file-system.datasource";
import {EmailService} from "./email/email.service";
import {MongoLogDataSource} from "../infrastructure/datasources/mongo-log.datasource";
import {PostgresLogDataSource} from "../infrastructure/datasources/postgres-log.datasource";
import {CheckAllServices} from "../domain/use-cases/checks/check-all-services";

// const logRepository = new LogRepositoryImpl(
//     // new FileSystemDatasource(),
//     // new MongoLogDataSource(),
//     new PostgresLogDataSource()
// )
// const emailService = new EmailService();

// Check All Services Test
const fsRepo = new LogRepositoryImpl(new FileSystemDatasource());
const mongoRepo = new LogRepositoryImpl(new MongoLogDataSource());
const postgresRepo = new LogRepositoryImpl(new PostgresLogDataSource());

export class  Server {

    static start() {
        console.log("Starting server...");

        // Send email
        // emailService.sendEmailWithFileSystemLogs([
        //     'zenoviondong@gmail.com',
        //     'zenoviondong@outlook.es'
        // ])

        // CronService.createJob('*/5 * * * * *', () => {
        //     const url = "https://bing.com";
        //     new CheckAllServices([fsRepo, mongoRepo, postgresRepo])
        //         .execute(url).then(success => {
        //             success
        //                 ? console.log(`${url} working!`)
        //                 : console.error(`${url} not working!`);
        //         }
        //     )
        //     // new CheckService().execute("http://localhost:3000");
        // })

    }

}