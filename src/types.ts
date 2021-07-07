type KnexConnectionConfig = {
  client: 'pg';
  connection: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
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

export type KnexConfig = { [key: string]: KnexConnectionConfig };
