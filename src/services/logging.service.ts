import {Logger, createLogger, transports, format} from 'winston'
import { dev } from '../lib/globals'

const LoggingService: Logger = createLogger({
    level: dev ? `debug` : `info`,
    exitOnError: false,
    transports: [
        new transports.Console({
            format: format.combine(
                format.errors({stack: true}),
                format.colorize(),
                format.simple(),
            )
        }),
        new transports.File({
            filename: `log/error.log`, level: `error`,
        }),
        new transports.File({
            filename: `log/warn.log`, level: `warn`,
        }),
        new transports.File({
            filename: `log/console.log`
        })
    ]
})

export default LoggingService