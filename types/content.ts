/**
 * Content category enum
 * Add new categories here as the app grows
 */
export enum ContentCategory {
  BOOK = "Book",
  MOVIE = "Movie",
  TV_SHOW = "TV Show",
  REALITY_SHOW = "Reality Show",
  MUSICAL = "Musical",
  PODCAST = "Podcast",
}

/**
 * Array of all available categories for iteration
 */
export const CATEGORIES = Object.values(ContentCategory);

/**
 * Type for category values
 */
export type Category = ContentCategory;

/**
 * Content status enum
 */
export enum ContentStatus {
  TODO = "todo",
  DONE = "done",
}

/**
 * Content item interface
 * Represents a single piece of content (book, movie, etc.)
 */
export interface ContentItem {
  id: number;
  title: string;
  category: ContentCategory;
  status: ContentStatus;
  creator?: string; // Author, Director, Producer, etc.
  year?: number;
  rating?: number; // 0-5 stars (denormalized from most recent ConsumptionRecord)
  dateAdded: string; // ISO string for when item was added
  coverImage?: string;
  externalId?: string; // ID from external API (TMDB, Google Books, etc.)
}

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
 * Search filter interface
 */
export interface SearchFilter {
  query: string;
  category?: ContentCategory;
}

/**
 * Content creation input
 */
export type CreateContentInput = Omit<ContentItem, "id" | "dateAdded">;

/**
 * Consumption record creation input
 */
export type CreateConsumptionRecordInput = Omit<ConsumptionRecord, "id">;

/**
 * Helper function to get category display name
 */
export const getCategoryDisplayName = (category: ContentCategory): string => {
  return category;
};

/**
 * Helper function to validate category
 */
export const isValidCategory = (value: string): value is ContentCategory => {
  return Object.values(ContentCategory).includes(value as ContentCategory);
};
