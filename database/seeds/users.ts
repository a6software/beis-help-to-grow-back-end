import { Knex } from 'knex';
import { TABLE } from '../constants';
import { hashPassword } from '../../src/lib/security/authentication';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE.USERS).del();

  // Inserts seed entries
  await knex(TABLE.USERS).insert([
    { email: 'boris@example.com', password: await hashPassword('johnson') },
    {
      email: 'first.last@example.com',
      password: await hashPassword(
        'c#fDbLOtI%H$KPZm&B7cJUw3R3dgXM5f6Fln8n3lJ5ussZiKnxKJfoO!WzN%6Q',
      ),
    },
  ]);
}
