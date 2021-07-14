import { Knex } from 'knex';

export const updatedAtTimestampTrigger = async (knex: Knex, tableName: string) => {
  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_modified_column()
    RETURNS TRIGGER AS $$
    BEGIN
       IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN
          NEW.updated_at = now(); 
          RETURN NEW;
       ELSE
          RETURN OLD;
       END IF;
    END;
    $$ language 'plpgsql';
  `);

  await knex.raw(`
    CREATE TRIGGER update_modtime_${tableName}
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();
  `);
};

export default updatedAtTimestampTrigger;
