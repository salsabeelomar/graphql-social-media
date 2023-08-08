import { WinstonLogger } from '../logger/winston.logger';

export const CheckExisting = (condition: any, error: any, msg: string) => {
  const logger = new WinstonLogger();
  if (!condition) {
    logger.error(error, msg);
    throw new error(msg);
  }
  return true;
};
