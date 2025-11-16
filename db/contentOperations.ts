import { ContentItem, ContentStatus, ContentCategory, CreateContentInput } from "@/types/content";
import { getDatabase } from "./database";

/**
 * Create a new content item
 */
export async function createContentItem(input: CreateContentInput): Promise<ContentItem> {
  const db = await getDatabase();
  const dateAdded = new Date().toISOString();
  const inputAny = input as any;

  const result = await db.runAsync(
    `INSERT INTO content_items (
      title, category, status, year, rating, dateAdded, externalId, link,
      images, pubdates,
      author, wordCount, tags,
      subtype, mobileUrl, directors, casts, genres, seasonsCount, currentSeason, episodesCount, countries,
      performers, venue, duration,
      hosts, feedUrl,
      creator, coverImage, cover, actors, type, numberOfEpisodes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.title,
      input.category,
      input.status,
      input.year || null,
      input.rating || null,
      dateAdded,
      input.externalId || null,
      input.link || null,
      // ContentBase
      input.images || null,
      input.pubdates || null,
      // Book
      inputAny.author || null,
      inputAny.wordCount || null,
      inputAny.tags || null,
      // TVMovie & Drama (shared)
      inputAny.subtype || null,
      inputAny.mobileUrl || null,
      inputAny.directors || null,
      inputAny.casts || null,
      inputAny.genres || null,
      inputAny.seasonsCount || null,
      inputAny.currentSeason || null,
      inputAny.episodesCount || null,
      inputAny.countries || null,
      // Drama
      inputAny.performers || null,
      inputAny.venue || null,
      inputAny.duration || null,
      // Podcast
      inputAny.hosts || null,
      inputAny.feedUrl || null,
      // Legacy
      inputAny.creator || null,
      inputAny.coverImage || null,
      inputAny.cover || null,
      inputAny.actors || null,
      inputAny.type || null,
      inputAny.numberOfEpisodes || null,
    ]
  );

  return {
    id: result.lastInsertRowId,
    ...input,
    dateAdded,
  } as ContentItem;
}

/**
 * Get all content items with optional filtering
 */
export async function getAllContentItems(
  status?: ContentStatus,
  category?: ContentCategory
): Promise<ContentItem[]> {
  const db = await getDatabase();
  let query = "SELECT * FROM content_items WHERE 1=1";
  const params: any[] = [];

  if (status) {
    query += " AND status = ?";
    params.push(status);
  }

  if (category) {
    query += " AND category = ?";
    params.push(category);
  }

  query += " ORDER BY dateAdded DESC";

  const rows = await db.getAllAsync<ContentItem>(query, params);
  return rows;
}

/**
 * Get a single content item by ID
 */
export async function getContentItemById(id: number): Promise<ContentItem | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<ContentItem>(
    "SELECT * FROM content_items WHERE id = ?",
    [id]
  );
  return row || null;
}

/**
 * Update a content item
 */
export async function updateContentItem(
  id: number,
  updates: Partial<Omit<ContentItem, "id" | "dateAdded">>
): Promise<ContentItem | null> {
  const db = await getDatabase();
  const fields: string[] = [];
  const values: any[] = [];

  // Build dynamic update query
  Object.entries(updates).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value === undefined ? null : value);
  });

  if (fields.length === 0) {
    return getContentItemById(id);
  }

  values.push(id);

  await db.runAsync(
    `UPDATE content_items SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  return getContentItemById(id);
}

/**
 * Delete a content item
 */
export async function deleteContentItem(id: number): Promise<boolean> {
  const db = await getDatabase();
  const result = await db.runAsync("DELETE FROM content_items WHERE id = ?", [id]);
  return result.changes > 0;
}

/**
 * Find existing content item by title, category, and subtype
 * Used to check for duplicates before creating new content
 */
export async function findExistingContentItem(
  title: string,
  category: ContentCategory,
  subtype?: string
): Promise<ContentItem | null> {
  const db = await getDatabase();

  let query = "SELECT * FROM content_items WHERE LOWER(title) = LOWER(?) AND category = ?";
  const params: any[] = [title.trim(), category];

  // Add subtype check for TV/Movie and Drama categories
  if (subtype && (category === ContentCategory.TV_MOVIE || category === ContentCategory.DRAMA)) {
    query += " AND subtype = ?";
    params.push(subtype);
  }

  query += " LIMIT 1";

  const row = await db.getFirstAsync<ContentItem>(query, params);
  return row || null;
}

/**
 * Search content items by title or creator
 */
export async function searchContentItems(
  query: string,
  status?: ContentStatus,
  category?: ContentCategory
): Promise<ContentItem[]> {
  const db = await getDatabase();
  let sql = `SELECT * FROM content_items
             WHERE (title LIKE ? OR creator LIKE ? OR author LIKE ? OR hosts LIKE ? OR directors LIKE ?)`;
  const params: any[] = [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`];

  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  sql += " ORDER BY dateAdded DESC";

  const rows = await db.getAllAsync<ContentItem>(sql, params);
  return rows;
}

/**
 * Mark content item as done
 */
export async function markContentAsDone(id: number): Promise<ContentItem | null> {
  return updateContentItem(id, {
    status: ContentStatus.DONE,
  });
}

/**
 * Mark content item as todo
 */
export async function markContentAsTodo(id: number): Promise<ContentItem | null> {
  return updateContentItem(id, {
    status: ContentStatus.TODO,
  });
}

/**
 * Get content items count by status
 */
export async function getContentItemsCount(status?: ContentStatus): Promise<number> {
  const db = await getDatabase();
  let query = "SELECT COUNT(*) as count FROM content_items";
  const params: any[] = [];

  if (status) {
    query += " WHERE status = ?";
    params.push(status);
  }

  const result = await db.getFirstAsync<{ count: number }>(query, params);
  return result?.count || 0;
}
