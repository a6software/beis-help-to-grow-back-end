import knex from 'knex';
import knexConfig from '../../../database/knex';

const db = knex(knexConfig[process.env.NODE_ENV]);

export default db;
