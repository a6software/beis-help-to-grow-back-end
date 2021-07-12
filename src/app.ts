import bodyParser from 'body-parser';
import express, { Express } from 'express';
import pinoHttp from 'pino-http';
import { Knex } from 'knex';
import requestIdGenerator from './lib/request-id-generator';
import initRootRouter from './routes';
import userService from './service/user.service';
import softwareDetailsService from './service/software-details.service';
import emailVerificationService from './service/email-verification.service';

export default function initApp(db: Knex): Express {
  const app = express();

  app.use(
    pinoHttp({
      genReqId: () => requestIdGenerator(),
    }),
  );

  app.use(bodyParser.json());
  app.use(
    initRootRouter(emailVerificationService(db), userService(db), softwareDetailsService(db)),
  );

  return app;
}
