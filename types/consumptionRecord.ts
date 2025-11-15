/**
 * Consumption record interface
 * Represents a single viewing/reading/listening of a content item
 * For podcasts, can optionally track individual episodes via episodeId
 */
export interface ConsumptionRecord {
  id: number;
  contentItemId: number; // Foreign key to ContentItem
  episodeId?: number; // Optional: Foreign key to PodcastEpisode (for podcasts)
  rating?: number; // 0-5 stars
  notes?: string;
  dateConsumed: string; // ISO string for when consumed
}

/**
 * Consumption record creation input
 */
export type CreateConsumptionRecordInput = Omit<ConsumptionRecord, "id">;
