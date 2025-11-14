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
 * Content status enum
 */
export enum ContentStatus {
  TODO = "todo",
  DONE = "done",
}

/**
 * Base content item interface with shared attributes
 */
export interface ContentBase {
  id: number;
  title: string;
  category: ContentCategory;
  status: ContentStatus;
  creator?: string; // Author, Director, Host, etc. (label varies by category)
  year?: number;
  rating?: number; // 0-5 stars (denormalized from most recent ConsumptionRecord)
  dateAdded: string; // ISO string for when item was added
  coverImage?: string; // Deprecated: Use cover instead
  cover?: string; // URL to cover image
  externalId?: string; // ID from external API (TMDB, Google Books, etc.)
  link?: string; // URL to external website (e.g., IMDB, Goodreads)
}

/**
 * Book-specific content
 */
export interface Book extends ContentBase {
  category: ContentCategory.BOOK;
  creator?: string; // Author
  wordCount?: number;
}

/**
 * Movie-specific content
 */
export interface Movie extends ContentBase {
  category: ContentCategory.MOVIE;
  creator?: string; // Director
  actors?: string;
  type?: string; // Genre/Type
}

/**
 * TV Show-specific content
 */
export interface TVShow extends ContentBase {
  category: ContentCategory.TV_SHOW;
  creator?: string; // Director
  actors?: string;
  type?: string; // Genre/Type
  numberOfEpisodes?: number;
}

/**
 * Reality Show-specific content
 */
export interface RealityShow extends ContentBase {
  category: ContentCategory.REALITY_SHOW;
  creator?: string; // Host
  actors?: string;
  type?: string; // Genre/Type
  numberOfEpisodes?: number;
}

/**
 * Musical-specific content
 */
export interface Musical extends ContentBase {
  category: ContentCategory.MUSICAL;
  creator?: string; // Director
  actors?: string;
  type?: string; // Genre/Type
}

/**
 * Podcast-specific content
 */
export interface Podcast extends ContentBase {
  category: ContentCategory.PODCAST;
  creator?: string; // Host
  numberOfEpisodes?: number;
}

/**
 * Union type of all content items
 */
export type ContentItem =
  | Book
  | Movie
  | TVShow
  | RealityShow
  | Musical
  | Podcast;

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

/**
 * Helper function to get the creator label based on category
 */
export const getCreatorLabel = (category: ContentCategory): string => {
  switch (category) {
    case ContentCategory.BOOK:
      return "Author";
    case ContentCategory.MOVIE:
    case ContentCategory.TV_SHOW:
    case ContentCategory.MUSICAL:
      return "Director";
    case ContentCategory.REALITY_SHOW:
    case ContentCategory.PODCAST:
      return "Host";
    default:
      return "Creator";
  }
};
