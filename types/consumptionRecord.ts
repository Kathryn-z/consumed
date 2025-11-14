/**
 * Consumption record interface
 * Represents a single viewing/reading/listening of a content item
 */
export interface ConsumptionRecord {
  id: number;
  contentItemId: number; // Foreign key to ContentItem
  rating?: number; // 0-5 stars
  notes?: string;
  dateConsumed: string; // ISO string for when consumed
}

/**
 * Consumption record creation input
 */
export type CreateConsumptionRecordInput = Omit<ConsumptionRecord, "id">;
