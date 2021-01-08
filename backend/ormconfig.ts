import { ConnectionOptions } from 'typeorm';

import 'dotenv/config';

const config: ConnectionOptions = {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": 5432,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_DATABASE,
  "migrations": ["./src/database/migrations/*.ts"],
  "entities": ["./src/models/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}

export = config;