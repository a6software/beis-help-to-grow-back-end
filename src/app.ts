import express from 'express';
import pinoHttp from 'pino-http';
import config from './config';
import requestIdGenerator from './lib/request-id-generator';

const app = express();
app.use(
  pinoHttp({
    genReqId: () => requestIdGenerator(),
  }),
);

app.get('/', (req, res) => {
  res.json({
    hello: 'world',
    envVar: process.env.EXAMPLE,
  });
});

app.listen(config.server.port, () => {
  console.log(`⚡ ️[server]: Server is running at https://localhost:${config.server.port}`);
  console.debug(
    `⚠️  [server]: The public port may be different - see 'docker-compose.yaml' if running in local dev.`,
  );
});
