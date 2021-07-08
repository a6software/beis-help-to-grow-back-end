export type ApplicationEnvironment = 'development' | 'staging' | 'production' | 'test';

export type Email = string;

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
    filename: 'file:memDb1?mode=memory&cache=shared';
  };
  useNullAsDefault: true;
};

export type KnexConnectionConfig = KnexPostgresConfig | KnexSqliteConfig;

export type KnexConfig = { [key: string]: KnexConnectionConfig };

export type ErrorResponse = {
  success: false;
  error: {
    msg: string;
  };
};

export type SuccessResponse = {
  success: true;
};

export type CreateUserSuccessResponse = SuccessResponse & {
  data: {
    email: Email;
  };
};

export type UserService = {
  createUser: (
    email: Email,
    plainTextPassword: string,
  ) => Promise<ErrorResponse | CreateUserSuccessResponse>;
};

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
