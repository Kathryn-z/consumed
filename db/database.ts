import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "consumed.db";
const SCHEMA_VERSION = 8; // Current schema version

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
 * Migrate database from version 6 to version 7
 * Restructures content types: Book, TV/Movie, Podcast, Drama
 * Adds new fields for Douban API compatibility
 */
async function migrateToV7(database: SQLite.SQLiteDatabase) {
  console.log("Running migration to V7...");

  // Add new columns for restructured schema
  const columnsToAdd = [
    // ContentBase fields
    { name: "images", type: "TEXT" },
    { name: "pubdates", type: "TEXT" },

    // Book fields
    { name: "author", type: "TEXT" },
    { name: "tags", type: "TEXT" },

    // TVMovie fields
    { name: "subtype", type: "TEXT" },
    { name: "mobileUrl", type: "TEXT" },
    { name: "directors", type: "TEXT" },
    { name: "casts", type: "TEXT" },
    { name: "genres", type: "TEXT" },
    { name: "seasonsCount", type: "INTEGER" },
    { name: "currentSeason", type: "INTEGER" },
    { name: "episodesCount", type: "INTEGER" },
    { name: "countries", type: "TEXT" },

    // Drama fields (shares directors and casts with TVMovie)
    { name: "performers", type: "TEXT" },
    { name: "venue", type: "TEXT" },
    { name: "duration", type: "INTEGER" },
  ];

  for (const col of columnsToAdd) {
    await addColumnIfNotExists(database, col.name, col.type);
  }

  // Migrate data from old columns to new ones
  console.log("Migrating data from old columns to new columns...");

  // Migrate cover/coverImage to images
  await database.execAsync(`
    UPDATE content_items
    SET images = COALESCE(cover, coverImage)
    WHERE images IS NULL AND (cover IS NOT NULL OR coverImage IS NOT NULL)
  `);

  // Migrate creator to author for Books
  await database.execAsync(`
    UPDATE content_items
    SET author = creator
    WHERE category = 'Book' AND author IS NULL AND creator IS NOT NULL
  `);

  // Migrate numberOfEpisodes to episodesCount
  await database.execAsync(`
    UPDATE content_items
    SET episodesCount = numberOfEpisodes
    WHERE episodesCount IS NULL AND numberOfEpisodes IS NOT NULL
  `);

  console.log("Migration to V7 complete!");
}

/**
 * Migrate database from version 7 to version 8
 * Renames creator field to hosts for Podcast and directors for Drama
 */
async function migrateToV8(database: SQLite.SQLiteDatabase) {
  console.log("Running migration to V8...");

  // Add hosts column for Podcast
  await addColumnIfNotExists(database, "hosts", "TEXT");

  // Migrate creator to hosts for Podcasts
  await database.execAsync(`
    UPDATE content_items
    SET hosts = creator
    WHERE category = 'Podcast' AND hosts IS NULL AND creator IS NOT NULL
  `);

  // Migrate creator to directors for Drama
  await database.execAsync(`
    UPDATE content_items
    SET directors = creator
    WHERE category = 'Drama' AND directors IS NULL AND creator IS NOT NULL
  `);

  console.log("Migration to V8 complete!");
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
    if (currentVersion < 7) {
      await migrateToV7(database);
    }
    if (currentVersion < 8) {
      await migrateToV8(database);
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
