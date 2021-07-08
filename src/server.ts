import config from './config';
import app from './app';
import connection from './lib/database/connection';

const db = connection();

app(db).listen(config.server.port, () => {
  console.log(`⚡ ️[server]: Server is running at https://localhost:${config.server.port}`);
  console.debug(
    `⚠️  [server]: The public port may be different - see 'docker-compose.yaml' if running in local dev.`,
  );
});
