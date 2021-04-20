import { join } from "path";
import LoggingService from "../services/logging.service";
import { buildSchema } from "type-graphql";
import { dev } from "./globals";
import { authChecker } from "./authcheck/authchecker";

const resolvers = join(__dirname + "/../resolvers/") + "**/*.resolver"
LoggingService.info(`Resolvers located @ ${resolvers}`)

export const createSchema = () => buildSchema({
    resolvers: [
        `${resolvers}.js`, `${resolvers}.ts`
    ],
    authChecker: authChecker,
    skipCheck: dev ? false : true,
    validate: true,
    emitSchemaFile: true,
})