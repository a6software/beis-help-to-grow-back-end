import { Knex } from 'knex';
import { TABLE } from '../constants';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE.USERS, (table) => {
    table.increments('user_id');
    table.string('email', 255).unique().notNullable();
    table.string('password', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE.USERS);
}
