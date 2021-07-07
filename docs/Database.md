# Database

[Knex](https://knexjs.org/) is used for database connectivity.

Interacting with `knex` from the command line requires some configuration. Therefore some commands are more
easily run using the `scripts` helpers found in `package.json`.

## Migrations

To create a migration:

```
npm run db:migration:create -- migration_name_goes_here
```

To migrate to the latest set of migrations:

```
make migrate-latest
```

Note, this command runs inside the `node-app` Docker container. If running manually, first exec a shell on the 
running container. 
