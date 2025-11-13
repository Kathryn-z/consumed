import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "consumed.db";

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Initialize and open the database
 */
export async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) {
    return db;
  }

  db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  await initializeDatabase(db);
  return db;
}

/**
 * Initialize database schema
 */
async function initializeDatabase(database: SQLite.SQLiteDatabase) {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS content_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'todo',
      creator TEXT,
      year INTEGER,
      notes TEXT,
      rating REAL,
      dateConsumed TEXT,
      dateAdded TEXT NOT NULL,
      coverImage TEXT,
      externalId TEXT,
      CONSTRAINT valid_status CHECK (status IN ('todo', 'done')),
      CONSTRAINT valid_rating CHECK (rating IS NULL OR (rating > 0 AND rating <= 5))
    );

    CREATE INDEX IF NOT EXISTS idx_status ON content_items(status);
    CREATE INDEX IF NOT EXISTS idx_category ON content_items(category);
    CREATE INDEX IF NOT EXISTS idx_dateAdded ON content_items(dateAdded DESC);
  `);
}

/**
 * Get the database instance
 */
export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    return await openDatabase();
  }
  return db;
}

/**
 * Close the database connection
 */
export async function closeDatabase() {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}
