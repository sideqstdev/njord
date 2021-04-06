import { PrismaClient } from "@prisma/client";
import LoggingService from "../services/logging.service";

export const client = new PrismaClient()

export const clientConnect = async() => { // hides logging logic behind function
    try{
        await client.$connect();
        LoggingService.info(`Connected client successfully`)
    }
    catch(err){
        LoggingService.error(`Client connection error: ${err}`)
    }
}

export const clientDisconnect = async() => {
    try{
        await client.$disconnect();
        LoggingService.info(`Disconnected client successfully`)
    }
    catch(err){
        // rare case issues
        LoggingService.error(`Client error whilst disconnecting: ${err}`)
    }
}