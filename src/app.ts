import 'dotenv/config'
import {Server} from "./presentation/server";
import {envs} from "./config/plugins/envs.plugin";
import {LogModel, MongoDatabase} from "./data/mongo";
import {LogSeverityLevel} from "./domain/entities/log.entity";
import {prisma} from "./lib/prisma";



(async () => {
    await main()
})()

async function main() {

    await MongoDatabase.connect({
        mongoUrl    : envs.MONGO_URL,
        dbName      : envs.MONGO_DB_NAME
    })

    Server.start()
}