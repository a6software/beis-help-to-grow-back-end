export type ApplicationEnvironment = 'development' | 'staging' | 'production' | 'test';

export type Email = string;

export type KnexPostgresConfig = KnexCommonConnectionConfig & {
  client: 'pg';
  connection: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
};

export type KnexSqliteConfig = KnexCommonConnectionConfig & {
  client: 'sqlite3';
  connection: {
    filename: 'file:memDb1?mode=memory';
  };
  useNullAsDefault: true;
};

type KnexCommonConnectionConfig = {
  debug: boolean;
  migrations: {
    tableName: 'migrations';
    directory: string;
  };
  pool: { min: number; max: number };
  seeds?: {
    directory: string;
  };
};

export type KnexConnectionConfig = KnexPostgresConfig | KnexSqliteConfig;

export type KnexConfig = { [key: string]: KnexConnectionConfig };

export type ValidationError = {
  message: string;
  path: string[];
  type: string;
  context: {
    value: string;
    invalids: string[];
    label: string;
    key: string;
  };
};
