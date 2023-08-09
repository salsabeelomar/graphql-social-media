import { WinstonLogger } from '../logger/winston.logger';

export const CheckExisting = (
  condition: any,
  CustomError: any,
  message: string,
) => {
  const logger = new WinstonLogger();

  if (!condition) {
    logger.error(` Check Existing ${message}`, CustomError);
    throw new CustomError(message);
  } else return true;
};
