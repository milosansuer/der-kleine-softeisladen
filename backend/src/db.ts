import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (db) {
    return db;
  }

  const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../database.sqlite');

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  return db;
}
