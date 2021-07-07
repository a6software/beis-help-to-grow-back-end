import config from '../src/config';
import { KnexConfig } from '../src/types';

const knexConfig: KnexConfig = {
  development: {
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
  },
  staging: {
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
  },
  production: {
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
  },
};

export default knexConfig;
