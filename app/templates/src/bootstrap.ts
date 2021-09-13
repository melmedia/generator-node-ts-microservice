import 'reflect-metadata';
import 'source-map-support/register';
import * as util from 'util';

function padDatePart(str: number) {
  return (`0${str}`).slice(-2);
}

function consoleErrorTimestamp(message: any) {
  const now = new Date();
  console.error(
    /* tslint:disable:max-line-length */
    `${now.getFullYear()}-${padDatePart(now.getMonth() + 1)}-${padDatePart(now.getDate())} ${padDatePart(now.getHours())}:${padDatePart(now.getMinutes())}:${padDatePart(now.getSeconds())}`,
    /* tslint:enable:max-line-length */
    message,
  );
}

process.on('unhandledRejection', (err) => {
  let message = err;
  if (!(message instanceof Error)) {
    message = new Error(`Promise rejected with value: ${util.inspect(err)}`);
  }
  consoleErrorTimestamp(message);
});

process.on('uncaughtException', (err) => {
  consoleErrorTimestamp(err);
});

if (!process.env.PABLO_ENV) {
  throw new Error('Environment variable PABLO_ENV is not set');
}
