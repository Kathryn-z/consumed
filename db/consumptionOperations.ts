import {
  ConsumptionRecord,
  CreateConsumptionRecordInput,
} from "@/types/consumptionRecord";
import { updateContentItem } from "./contentOperations";
import { getDatabase } from "./database";

/**
 * Create a new consumption record
 * Also updates the ContentItem's rating to match the new record
 */
export async function createConsumptionRecord(
  input: CreateConsumptionRecordInput
): Promise<ConsumptionRecord> {
  const db = await getDatabase();

  const result = await db.runAsync(
    `INSERT INTO consumption_records (contentItemId, rating, notes, dateConsumed)
     VALUES (?, ?, ?, ?)`,
    [
      input.contentItemId,
      input.rating || null,
      input.notes || null,
      input.dateConsumed,
    ]
  );

  // Update the ContentItem's rating to match the most recent consumption
  if (input.rating !== undefined) {
    await updateContentItem(input.contentItemId, { rating: input.rating });
  }

  return {
    id: result.lastInsertRowId,
    ...input,
  };
}

/**
 * Get all consumption records for a content item
 * Ordered by dateConsumed descending (most recent first)
 */
export async function getConsumptionRecordsByContentId(
  contentItemId: number
): Promise<ConsumptionRecord[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<ConsumptionRecord>(
    "SELECT * FROM consumption_records WHERE contentItemId = ? ORDER BY dateConsumed DESC",
    [contentItemId]
  );
  return rows;
}

/**
 * Get a single consumption record by ID
 */
export async function getConsumptionRecordById(
  id: number
): Promise<ConsumptionRecord | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<ConsumptionRecord>(
    "SELECT * FROM consumption_records WHERE id = ?",
    [id]
  );
  return row || null;
}

/**
 * Update a consumption record
 * If rating is updated, also updates the ContentItem's rating if this is the most recent record
 */
export async function updateConsumptionRecord(
  id: number,
  updates: Partial<Omit<ConsumptionRecord, "id" | "contentItemId">>
): Promise<ConsumptionRecord | null> {
  const db = await getDatabase();
  const fields: string[] = [];
  const values: any[] = [];

  // Build dynamic update query
  Object.entries(updates).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value === undefined ? null : value);
  });

  if (fields.length === 0) {
    return getConsumptionRecordById(id);
  }

  values.push(id);

  await db.runAsync(
    `UPDATE consumption_records SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  const record = await getConsumptionRecordById(id);

  // If rating was updated and this is the most recent record, update ContentItem
  if (record && updates.rating !== undefined) {
    const mostRecentRecord = await getMostRecentConsumptionRecord(
      record.contentItemId
    );
    if (mostRecentRecord?.id === record.id) {
      await updateContentItem(record.contentItemId, { rating: updates.rating });
    }
  }

  return record;
}

/**
 * Delete a consumption record
 * If this was the most recent record, updates ContentItem's rating to the next most recent
 */
export async function deleteConsumptionRecord(id: number): Promise<boolean> {
  const db = await getDatabase();

  // Get the record before deleting to know which ContentItem to update
  const record = await getConsumptionRecordById(id);
  if (!record) return false;

  const contentItemId = record.contentItemId;
  const wasMostRecent =
    (await getMostRecentConsumptionRecord(contentItemId))?.id === id;

  const result = await db.runAsync(
    "DELETE FROM consumption_records WHERE id = ?",
    [id]
  );

  // If we deleted the most recent record, update ContentItem's rating
  if (result.changes > 0 && wasMostRecent) {
    const newMostRecent = await getMostRecentConsumptionRecord(contentItemId);
    await updateContentItem(contentItemId, { rating: newMostRecent?.rating });
  }

  return result.changes > 0;
}

/**
 * Get the most recent consumption record for a content item
 */
export async function getMostRecentConsumptionRecord(
  contentItemId: number
): Promise<ConsumptionRecord | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<ConsumptionRecord>(
    "SELECT * FROM consumption_records WHERE contentItemId = ? ORDER BY dateConsumed DESC LIMIT 1",
    [contentItemId]
  );
  return row || null;
}

/**
 * Get consumption count for a content item
 */
export async function getConsumptionCount(
  contentItemId: number
): Promise<number> {
  const db = await getDatabase();
  const result = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM consumption_records WHERE contentItemId = ?",
    [contentItemId]
  );
  return result?.count || 0;
}

/**
 * Get all consumption records across all content items
 * Useful for statistics and history views
 */
export async function getAllConsumptionRecords(): Promise<ConsumptionRecord[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<ConsumptionRecord>(
    "SELECT * FROM consumption_records ORDER BY dateConsumed DESC"
  );
  return rows;
}

/**
 * Get consumption records only for content items marked as "done"
 * Joins with content_items table to filter by status
 */
export async function getConsumptionRecordsForDoneContent(): Promise<ConsumptionRecord[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<ConsumptionRecord>(
    `SELECT cr.* FROM consumption_records cr
     INNER JOIN content_items ci ON cr.contentItemId = ci.id
     WHERE ci.status = 'done'
     ORDER BY cr.dateConsumed DESC`
  );
  return rows;
}
