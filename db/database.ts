import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "consumed.db";
const SCHEMA_VERSION = 3; // Updated for category-specific attributes

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
async function getSchemaVersion(database: SQLite.SQLiteDatabase): Promise<number> {
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
async function setSchemaVersion(database: SQLite.SQLiteDatabase, version: number) {
  await database.execAsync(`PRAGMA user_version = ${version}`);
}

/**
 * Migrate from version 1 to version 2
 * Moves notes and dateConsumed to consumption_records table
 */
async function migrateToV2(database: SQLite.SQLiteDatabase) {
  console.log("Migrating database to version 2...");

  // Create consumption_records table
  await database.execAsync(`
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

  // Migrate existing records with notes/rating to consumption_records
  const itemsWithData = await database.getAllAsync<{
    id: number;
    notes: string | null;
    rating: number | null;
    dateConsumed: string | null;
  }>(
    "SELECT id, notes, rating, dateConsumed FROM content_items WHERE notes IS NOT NULL OR rating IS NOT NULL OR dateConsumed IS NOT NULL"
  );

  for (const item of itemsWithData) {
    if (item.dateConsumed || item.notes || item.rating) {
      await database.runAsync(
        `INSERT INTO consumption_records (contentItemId, rating, notes, dateConsumed)
         VALUES (?, ?, ?, ?)`,
        [
          item.id,
          item.rating,
          item.notes,
          item.dateConsumed || new Date().toISOString()
        ]
      );
    }
  }

  // Create new content_items table without notes and dateConsumed
  await database.execAsync(`
    CREATE TABLE content_items_new (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'todo',
      creator TEXT,
      year INTEGER,
      rating REAL,
      dateAdded TEXT NOT NULL,
      coverImage TEXT,
      externalId TEXT,
      wordCount INTEGER,
      actors TEXT,
      type TEXT,
      numberOfEpisodes INTEGER,
      CONSTRAINT valid_status CHECK (status IN ('todo', 'done')),
      CONSTRAINT valid_rating CHECK (rating IS NULL OR (rating >= 0 AND rating <= 5))
    );

    INSERT INTO content_items_new (id, title, category, status, creator, year, rating, dateAdded, coverImage, externalId)
    SELECT id, title, category, status, creator, year, rating, dateAdded, coverImage, externalId
    FROM content_items;

    DROP TABLE content_items;
    ALTER TABLE content_items_new RENAME TO content_items;

    CREATE INDEX IF NOT EXISTS idx_status ON content_items(status);
    CREATE INDEX IF NOT EXISTS idx_category ON content_items(category);
    CREATE INDEX IF NOT EXISTS idx_dateAdded ON content_items(dateAdded DESC);
  `);

  console.log("Migration to version 2 complete");
}

/**
 * Migrate from version 2 to version 3
 * Adds category-specific attributes
 */
async function migrateToV3(database: SQLite.SQLiteDatabase) {
  console.log("Migrating database to version 3...");

  // Check which columns need to be added
  const tableInfo = await database.getAllAsync<{ name: string }>(
    "PRAGMA table_info(content_items)"
  );
  const existingColumns = new Set(tableInfo.map((col) => col.name));

  // Add columns only if they don't exist
  if (!existingColumns.has("wordCount")) {
    await database.execAsync("ALTER TABLE content_items ADD COLUMN wordCount INTEGER;");
  }
  if (!existingColumns.has("actors")) {
    await database.execAsync("ALTER TABLE content_items ADD COLUMN actors TEXT;");
  }
  if (!existingColumns.has("type")) {
    await database.execAsync("ALTER TABLE content_items ADD COLUMN type TEXT;");
  }
  if (!existingColumns.has("numberOfEpisodes")) {
    await database.execAsync("ALTER TABLE content_items ADD COLUMN numberOfEpisodes INTEGER;");
  }

  console.log("Migration to version 3 complete");
}

/**
 * Initialize database schema
 */
async function initializeDatabase(database: SQLite.SQLiteDatabase) {
  await database.execAsync("PRAGMA journal_mode = WAL");
  await database.execAsync("PRAGMA foreign_keys = ON");

  const currentVersion = await getSchemaVersion(database);

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
        externalId TEXT,
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
  } else {
    // Existing database - run migrations
    if (currentVersion < 2) {
      await migrateToV2(database);
      await setSchemaVersion(database, 2);
    }

    if (currentVersion < 3) {
      await migrateToV3(database);
      await setSchemaVersion(database, 3);
    }

    // Future migrations would go here
    // if (currentVersion < 4) { await migrateToV4(database); }
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
