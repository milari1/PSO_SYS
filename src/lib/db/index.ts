import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Create the database connection
// The DATABASE_URL env var will be set when Neon is connected
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Please connect your Neon database and add the connection string to .env.local"
    );
  }
  return url;
};

// Lazy initialization - only connect when actually needed
let _db: ReturnType<typeof drizzle> | null = null;

export const getDb = () => {
  if (!_db) {
    const sql = neon(getDatabaseUrl());
    _db = drizzle(sql, { schema });
  }
  return _db;
};

export { schema };
