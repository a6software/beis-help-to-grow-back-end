export type ApplicationEnvironment = 'development' | 'staging' | 'production' | 'test';

export type Email = string;
export type PlainTextPassword = string;
export type HashedPassword = string;

export type JWT = string;

export type UserDetailsPublic = {
  email: Email;
};

export type UserDetailsFromApi = {
  email: Email;
  password: HashedPassword;
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

export type FindUserByEmailAddressSuccessResponse = SuccessResponse & {
  data: {
    user: UserDetailsFromApi;
  };
};

export type UserService = {
  createUser: (
    email: Email,
    plainTextPassword: string,
  ) => Promise<ErrorResponse | CreateUserSuccessResponse>;

  findUserByEmailAddress: (
    email: Email,
  ) => Promise<ErrorResponse | FindUserByEmailAddressSuccessResponse>;
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

export type GetSoftwareDetailsResponse = SuccessResponse & {
  data: {
    softwareDetails: string;
  };
};

export type SoftwareDetailsService = {
  getSoftwareDetails: () => Promise<ErrorResponse | GetSoftwareDetailsResponse>;
};

export type SignInSuccessResponse = SuccessResponse & {
  data: {
    token: JWT;
    user: {
      email: Email;
    };
  };
};

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export default {};
