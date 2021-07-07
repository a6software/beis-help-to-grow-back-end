export default {
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    debug: process.env.DB_DATABASE_DEBUG || 'false',
    pool: {
      min: Number(process.env.DB_POOL_MIN || 2),
      max: Number(process.env.DB_POOL_MAX || 10),
    },
  },
  security: {
    authentication: {
      saltRounds: Number(process.env.SECURITY_AUTHENTICATION_SALT_ROUNDS || 10),
    },
  },
  server: {
    port: Number(process.env.PORT || 3000),
  },
};
