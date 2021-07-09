import knex from 'knex';
import path from 'path';
import connection from '../../../../src/lib/database/connection';
import { ApplicationEnvironment, KnexConnectionConfig } from '../../../../src/types';

jest.mock('knex');

const baseConfig: KnexConnectionConfig = {
  client: 'pg',
  connection: {
    database: undefined,
    host: undefined,
    password: undefined,
    port: 5432,
    user: undefined,
  },
  debug: false,
  migrations: {
    directory: path.join(__dirname, '/../../../../', 'database', 'migrations'),
    tableName: 'migrations',
  },
  pool: {
    max: 10,
    min: 2,
  },
  seeds: {
    directory: path.join(__dirname, '/../../../../', 'database', 'seeds'),
  },
};

describe('lib/database/connection', () => {
  [
    { environment: 'invalid value', expectedConfig: undefined },
    {
      environment: 'development',
      expectedConfig: baseConfig,
    },
  ].forEach(({ environment, expectedConfig }) => {
    it('should call knex with the expected config', () => {
      connection(environment as ApplicationEnvironment);

      expect(knex).toHaveBeenCalledWith(expectedConfig);
    });
  });

  it('should have a valid default', () => {
    connection();
    // process.env.NODE_ENV = test by default.
    expect(knex).toHaveBeenCalledWith({
      ...baseConfig,
      client: 'sqlite3',
      connection: {
        filename: 'file:memDb1?mode=memory&cache=shared',
      },
      pool: {
        ...baseConfig.pool,
        min: 1,
        max: 1,
      },
      useNullAsDefault: true,
    });
  });
});
