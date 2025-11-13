import { ContentItem, ContentStatus, ContentCategory, CreateContentInput } from "@/types/content";
import { getDatabase } from "./database";

/**
 * Create a new content item
 */
export async function createContentItem(input: CreateContentInput): Promise<ContentItem> {
  const db = await getDatabase();
  const dateAdded = new Date().toISOString();

  const result = await db.runAsync(
    `INSERT INTO content_items (title, category, status, creator, year, notes, rating, dateConsumed, dateAdded, coverImage, externalId)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.title,
      input.category,
      input.status,
      input.creator || null,
      input.year || null,
      input.notes || null,
      input.rating || null,
      input.dateConsumed || null,
      dateAdded,
      input.coverImage || null,
      input.externalId || null,
    ]
  );

  return {
    id: result.lastInsertRowId,
    ...input,
    dateAdded,
  };
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
 * Search content items by title or creator
 */
export async function searchContentItems(
  query: string,
  status?: ContentStatus,
  category?: ContentCategory
): Promise<ContentItem[]> {
  const db = await getDatabase();
  let sql = `SELECT * FROM content_items
             WHERE (title LIKE ? OR creator LIKE ?)`;
  const params: any[] = [`%${query}%`, `%${query}%`];

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
    dateConsumed: new Date().toISOString(),
  });
}

/**
 * Mark content item as todo
 */
export async function markContentAsTodo(id: number): Promise<ContentItem | null> {
  return updateContentItem(id, {
    status: ContentStatus.TODO,
    dateConsumed: undefined,
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
