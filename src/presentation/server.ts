import {CronService} from "./cron/cron.service";
import {CheckService} from "../domain/use-cases/checks/check-service";
import {LogRepositoryImpl} from "../infrastructure/repositories/log.repository.impl";
import {FileSystemDatasource} from "../infrastructure/datasources/file-system.datasource";
import {envs} from "../config/plugins/envs.plugin";
import {EmailService} from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

export class  Server {

    static start() {
        console.log("Starting server...");

        // Send email
        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLogs([
        //     'zenoviondong@gmail.com',
        //     'zenoviondong@outlook.es'
        // ])

        // CronService.createJob('*/5 * * * * *', () => {
        //     const url = "https://google.com"
        //     new CheckService(
        //         fileSystemLogRepository,
        //     ).execute(url).then(() => console.log(`${url} is working!`))
        //     // new CheckService().execute("http://localhost:3000");
        // })

    }

}