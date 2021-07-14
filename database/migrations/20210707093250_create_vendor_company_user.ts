import { Knex } from 'knex';
import { TABLE } from '../constants';
import updatedAtTimestampTrigger from '../helpers/updatedAtTimestampTrigger';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE.VENDOR_COMPANY_USER, (table) => {
    table.increments('user_id');
    table.string('email', 500).unique().notNullable();
    table.string('password', 255).notNullable();

    table.timestamps(false, true);
    updatedAtTimestampTrigger(knex, TABLE.VENDOR_COMPANY_USER);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE.VENDOR_COMPANY_USER);
}
