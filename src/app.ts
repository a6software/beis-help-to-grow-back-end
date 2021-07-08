import bodyParser from 'body-parser';
import express, { Express } from 'express';
import pinoHttp from 'pino-http';
import requestIdGenerator from './lib/request-id-generator';
import initRootRouter from './routes';
import userService from './service/user.service';
import { Knex } from 'knex';

export default function initApp(db: Knex): Express {
  const app = express();

  app.use(
    pinoHttp({
      genReqId: () => requestIdGenerator(),
    }),
  );

  app.use(bodyParser.json());
  app.use(initRootRouter(userService(db)));

  return app;
}
