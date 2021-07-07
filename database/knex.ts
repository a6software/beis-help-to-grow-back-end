import config from '../src/config';
import { KnexConfig, KnexConnectionConfig } from '../src/types';

const basePgConfig: KnexConnectionConfig = {
  client: 'pg',
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
  },
  debug: config.db.debug === 'true',
  migrations: {
    tableName: 'migrations',
    directory: __dirname + '/migrations',
  },
  pool: { min: config.db.pool.min, max: config.db.pool.max },
  seeds: {
    directory: __dirname + '/seeds',
  },
};

const knexConfig: KnexConfig = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: 'file:memDb1?mode=memory',
    },
    debug: config.db.debug === 'true',
    migrations: {
      tableName: 'migrations',
      directory: __dirname + '/migrations',
    },
    pool: { min: config.db.pool.min, max: config.db.pool.max },
    seeds: {
      directory: __dirname + '/seeds',
    },
    useNullAsDefault: true,
  },
  development: basePgConfig,
  staging: basePgConfig,
  production: {
    client: 'pg',
    connection: {
      host: config.db.host,
      port: config.db.port,
      user: config.db.username,
      password: config.db.password,
      database: config.db.database,
    },
    debug: false,
    migrations: {
      tableName: 'migrations',
      directory: __dirname + '/migrations',
    },
    pool: { min: config.db.pool.min, max: config.db.pool.max },
  },
};

export default knexConfig;
