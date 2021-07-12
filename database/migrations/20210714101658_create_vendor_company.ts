import { Knex } from 'knex';
import { TABLE } from '../constants';
import updatedAtTimestampTrigger from '../helpers/updatedAtTimestampTrigger';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE.VENDOR_COMPANY, (table) => {
    table.increments('vendor_id');

    table.string('notification_phone', 50).notNullable();
    table.string('notification_email', 50).notNullable();
    table.string('vendor_company_name', 500).notNullable();
    table.string('website', 50).notNullable();

    table.timestamps(false, true);
    updatedAtTimestampTrigger(knex, TABLE.VENDOR_COMPANY);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE.VENDOR_COMPANY);
}
