import { Knex } from 'knex';
import { TABLE } from '../constants';
import updatedAtTimestampTrigger from '../helpers/updatedAtTimestampTrigger';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE.EMAIL_VERIFICATION_CODE, (table) => {
    table.string('email', 500).notNullable().primary();

    table.string('verification_code', 50).notNullable();

    table.timestamp('sent_at').defaultTo(knex.fn.now());

    table.timestamps(false, true);
    updatedAtTimestampTrigger(knex, TABLE.EMAIL_VERIFICATION_CODE);

    table.index('email', 'verification_code');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE.EMAIL_VERIFICATION_CODE);
}
