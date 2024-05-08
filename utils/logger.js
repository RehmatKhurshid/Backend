import winston, {format} from 'winston';

const {combine, timestamp, prettyPrint } = format

export const logger = winston.createLogger({
  level: 'info',
  format:  combine(
  timestamp(),
  prettyPrint()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
