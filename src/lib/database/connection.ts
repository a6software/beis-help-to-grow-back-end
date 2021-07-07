import knex from 'knex';
import knexConfig from '../../../database/knex';
import { ApplicationEnvironment } from '../../types';

const db = (environment: ApplicationEnvironment = process.env.NODE_ENV as ApplicationEnvironment) =>
  knex(knexConfig[environment]);

export default db;
