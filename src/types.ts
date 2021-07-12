export type ApplicationEnvironment = 'development' | 'staging' | 'production' | 'test';

export type Email = string;
export type PlainTextPassword = string;
export type HashedPassword = string;

export type JWT = string;
export type EmailVerificationCode = string;

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
  data: {
    errors: BEISValidationError[];
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

export type CreateEmailVerificationCodeSuccessResponse = SuccessResponse & {
  data: {
    email: Email;
  };
};

export type ValidateEmailVerificationCodeSuccessResponse = SuccessResponse & {
  data: {
    email: Email;
  };
};

export type EmailVerificationService = {
  createEmailVerificationCode: (
    email: Email,
  ) => Promise<ErrorResponse | CreateEmailVerificationCodeSuccessResponse>;
  validateEmailVerificationCode: (
    email: Email,
    verificationCode: EmailVerificationCode,
  ) => Promise<ErrorResponse | ValidateEmailVerificationCodeSuccessResponse>;
};

export type CreateUserParameters = {
  email: Email;
  plainTextPassword: PlainTextPassword;
};

export type UserService = {
  createUser: ({
    email,
    plainTextPassword,
  }: CreateUserParameters) => Promise<ErrorResponse | CreateUserSuccessResponse>;

  findUserByEmailAddress: (
    email: Email,
  ) => Promise<ErrorResponse | FindUserByEmailAddressSuccessResponse>;
};

export type JoiValidationError = {
  message: string;
  path: string[];
  type: string;
  context: {
    value: string;
    label: string;
    key: string;
  };
};

export type BEISValidationError = JoiValidationError;

export type GetSoftwareDetailsResponse = SuccessResponse & {
  data: {
    softwareDetails: string;
  };
};

export type SoftwareDetailsService = {
  getSoftwareDetails: () => Promise<ErrorResponse | GetSoftwareDetailsResponse>;
};

export type CreateAccountSuccessResponse = { success: true; data: { email: Email; jwt: JWT } };

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
