import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "consumed.db";
const SCHEMA_VERSION = 6; // Current schema version

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
 * Get current schema version
 */
async function getSchemaVersion(
  database: SQLite.SQLiteDatabase
): Promise<number> {
  try {
    const result = await database.getFirstAsync<{ user_version: number }>(
      "PRAGMA user_version"
    );
    return result?.user_version || 0;
  } catch {
    return 0;
  }
}

/**
 * Set schema version
 */
async function setSchemaVersion(
  database: SQLite.SQLiteDatabase,
  version: number
) {
  await database.execAsync(`PRAGMA user_version = ${version}`);
}

/**
 * Migrate database from version 1 to version 2
 * Adds category-specific columns: cover, link, wordCount, actors, type, numberOfEpisodes
 */
async function migrateToV2(database: SQLite.SQLiteDatabase) {
  console.log("Running migration to V4...");

  // Get existing columns
  const columns = await database.getAllAsync<{ name: string }>(
    "PRAGMA table_info(content_items)"
  );
  const existingColumns = new Set(columns.map((col) => col.name));
  console.log("Existing columns:", Array.from(existingColumns));

  // Add missing columns
  const columnsToAdd = [
    { name: "cover", type: "TEXT" },
    { name: "link", type: "TEXT" },
    { name: "wordCount", type: "INTEGER" },
    { name: "actors", type: "TEXT" },
    { name: "type", type: "TEXT" },
    { name: "numberOfEpisodes", type: "INTEGER" },
  ];

  for (const col of columnsToAdd) {
    if (!existingColumns.has(col.name)) {
      console.log(`Adding column: ${col.name}`);
      await database.execAsync(
        `ALTER TABLE content_items ADD COLUMN ${col.name} ${col.type}`
      );
    } else {
      console.log(`Column ${col.name} already exists`);
    }
  }

  console.log("Migration complete!");
}

/**
 * Initialize database schema
 */
async function initializeDatabase(database: SQLite.SQLiteDatabase) {
  await database.execAsync("PRAGMA journal_mode = WAL");
  await database.execAsync("PRAGMA foreign_keys = ON");

  const currentVersion = await getSchemaVersion(database);
  console.log(
    `Current database version: ${currentVersion}, Target version: ${SCHEMA_VERSION}`
  );

  if (currentVersion === 0) {
    // Fresh install - create all tables at current version
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS content_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'todo',
        creator TEXT,
        year INTEGER,
        rating REAL,
        dateAdded TEXT NOT NULL,
        coverImage TEXT,
        cover TEXT,
        externalId TEXT,
        link TEXT,
        wordCount INTEGER,
        actors TEXT,
        type TEXT,
        numberOfEpisodes INTEGER,
        CONSTRAINT valid_status CHECK (status IN ('todo', 'done')),
        CONSTRAINT valid_rating CHECK (rating IS NULL OR (rating >= 0 AND rating <= 5))
      );

      CREATE INDEX IF NOT EXISTS idx_status ON content_items(status);
      CREATE INDEX IF NOT EXISTS idx_category ON content_items(category);
      CREATE INDEX IF NOT EXISTS idx_dateAdded ON content_items(dateAdded DESC);

      CREATE TABLE IF NOT EXISTS consumption_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contentItemId INTEGER NOT NULL,
        rating REAL,
        notes TEXT,
        dateConsumed TEXT NOT NULL,
        CONSTRAINT fk_content_item
          FOREIGN KEY (contentItemId)
          REFERENCES content_items(id)
          ON DELETE CASCADE,
        CONSTRAINT valid_rating CHECK (rating IS NULL OR (rating >= 0 AND rating <= 5))
      );

      CREATE INDEX IF NOT EXISTS idx_consumption_content_item ON consumption_records(contentItemId);
      CREATE INDEX IF NOT EXISTS idx_consumption_date ON consumption_records(dateConsumed DESC);
    `);

    await setSchemaVersion(database, SCHEMA_VERSION);
  } else if (currentVersion < SCHEMA_VERSION) {
    // Run migrations
    if (currentVersion < 6) {
      await migrateToV2(database);
      await setSchemaVersion(database, 6);
    }
  }
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
