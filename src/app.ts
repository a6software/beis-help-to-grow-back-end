import bodyParser from 'body-parser';
import express from 'express';
import pinoHttp from 'pino-http';
import requestIdGenerator from './lib/request-id-generator';
import routes from './routes';

const app = express();

app.use(
  pinoHttp({
    genReqId: () => requestIdGenerator(),
  }),
);

app.use(bodyParser.json());
app.use(routes);

export default app;
