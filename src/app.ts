import bodyParser from 'body-parser';
import express from 'express';
import pinoHttp from 'pino-http';
import config from './config';
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

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.server.port, () => {
    console.log(`⚡ ️[server]: Server is running at https://localhost:${config.server.port}`);
    console.debug(
      `⚠️  [server]: The public port may be different - see 'docker-compose.yaml' if running in local dev.`,
    );
  });
}

export default app;
