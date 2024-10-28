import * as winston from 'winston';
import { ConsoleLogger } from '@nestjs/common';

const lokiTransport = new winston.transports.Http({
    level: 'info',
    host: 'http://loki:3100', // Loki URL
    path: '/loki/api/v1/push',
    headers: { 'Content-type': 'application/json' },
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        lokiTransport,
    ],
});

/**
 * Using ApplicationLogger we decouple application itself and logger library
 * e.g. now we use Winston as logger library and loki as transport
 * But later we can switch to another logging library without any changes in application structure
 */
export class ApplicationLogger extends ConsoleLogger {
    log(message: string) {
        logger.info(message);
    }
    error(message: string, trace: string) {
        logger.error(message, { trace });
    }
    warn(message: string) {
        logger.warn(message);
    }
}
