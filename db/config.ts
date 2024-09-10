// db/config.ts
import { defineDb, defineTable, column } from 'astro:db';

const Users = defineTable({
  columns: {
    first_name: column.text(),
    last_name: column.text(),
    email: column.text(),
    password: column.text(),
  },
});

export default defineDb({
  tables: {
    Users,
  },
});

