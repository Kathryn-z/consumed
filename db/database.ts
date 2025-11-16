import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "consumed.db";
const SCHEMA_VERSION = 10; // Current schema version

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
 * Helper function to safely add a column if it doesn't exist
 */
async function addColumnIfNotExists(
  database: SQLite.SQLiteDatabase,
  columnName: string,
  columnType: string
) {
  const columns = await database.getAllAsync<{ name: string }>(
    "PRAGMA table_info(content_items)"
  );
  const existingColumns = new Set(columns.map((col) => col.name));

  if (!existingColumns.has(columnName)) {
    console.log(`Adding column: ${columnName}`);
    await database.execAsync(
      `ALTER TABLE content_items ADD COLUMN ${columnName} ${columnType}`
    );
  } else {
    console.log(`Column ${columnName} already exists, skipping`);
  }
}

/**
 * Migrate database from version 9 to version 10
 * Creates podcast_episodes table and adds episodeId to consumption_records
 */
async function migrateToV10(database: SQLite.SQLiteDatabase) {
  console.log("Running migration to V10...");

  // Create podcast_episodes table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS podcast_episodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      podcastId INTEGER NOT NULL,
      episodeNumber INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      releaseDate TEXT,
      durationMillis INTEGER,
      dateAdded TEXT NOT NULL,
      CONSTRAINT fk_podcast
        FOREIGN KEY (podcastId)
        REFERENCES content_items(id)
        ON DELETE CASCADE
    );
  `);

  // Create index for faster lookups
  await database.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_podcast_episodes_podcast ON podcast_episodes(podcastId);
  `);

  // Add episodeId column to consumption_records
  const columns = await database.getAllAsync<{ name: string }>(
    "PRAGMA table_info(consumption_records)"
  );
  const existingColumns = new Set(columns.map((col) => col.name));

  if (!existingColumns.has("episodeId")) {
    console.log("Adding episodeId column to consumption_records");
    await database.execAsync(`
      ALTER TABLE consumption_records ADD COLUMN episodeId INTEGER REFERENCES podcast_episodes(id) ON DELETE SET NULL
    `);
  } else {
    console.log(
      "Column episodeId already exists in consumption_records, skipping"
    );
  }

  console.log("Migration to V10 complete!");
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
        year INTEGER,
        rating REAL,
        dateAdded TEXT NOT NULL,
        externalId TEXT,
        link TEXT,

        -- ContentBase fields
        images TEXT,
        pubdates TEXT,

        -- Book fields
        author TEXT,
        wordCount INTEGER,
        tags TEXT,

        -- TVMovie fields
        subtype TEXT,
        mobileUrl TEXT,
        directors TEXT,
        casts TEXT,
        genres TEXT,
        seasonsCount INTEGER,
        currentSeason INTEGER,
        episodesCount INTEGER,
        countries TEXT,

        -- Drama fields (shares directors and casts with TVMovie)
        performers TEXT,
        venue TEXT,
        duration INTEGER,

        -- Podcast fields
        hosts TEXT,
        feedUrl TEXT,

        -- Legacy fields (for backward compatibility)
        creator TEXT,
        coverImage TEXT,
        cover TEXT,
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
        episodeId INTEGER,
        rating REAL,
        notes TEXT,
        dateConsumed TEXT NOT NULL,
        CONSTRAINT fk_content_item
          FOREIGN KEY (contentItemId)
          REFERENCES content_items(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_episode
          FOREIGN KEY (episodeId)
          REFERENCES podcast_episodes(id)
          ON DELETE SET NULL,
        CONSTRAINT valid_rating CHECK (rating IS NULL OR (rating >= 0 AND rating <= 5))
      );

      CREATE INDEX IF NOT EXISTS idx_consumption_content_item ON consumption_records(contentItemId);
      CREATE INDEX IF NOT EXISTS idx_consumption_date ON consumption_records(dateConsumed DESC);

      CREATE TABLE IF NOT EXISTS podcast_episodes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        podcastId INTEGER NOT NULL,
        episodeNumber INTEGER,
        title TEXT NOT NULL,
        description TEXT,
        releaseDate TEXT,
        durationMillis INTEGER,
        dateAdded TEXT NOT NULL,
        CONSTRAINT fk_podcast
          FOREIGN KEY (podcastId)
          REFERENCES content_items(id)
          ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_podcast_episodes_podcast ON podcast_episodes(podcastId);
    `);

    await setSchemaVersion(database, SCHEMA_VERSION);
  } else if (currentVersion < SCHEMA_VERSION) {
    if (currentVersion < 10) {
      await migrateToV10(database);
    }
    await setSchemaVersion(database, SCHEMA_VERSION);
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
