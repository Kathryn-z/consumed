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
 * Content item interface
 * Represents a single piece of consumed content
 */
export interface ContentItem {
  id: string;
  title: string;
  category: ContentCategory;
  creator?: string; // Author, Director, Producer, etc.
  year?: number;
  notes?: string;
  rating?: number; // 1-5 stars or 1-10 scale
  dateConsumed?: Date;
  coverImage?: string;
  externalId?: string; // ID from external API (TMDB, Google Books, etc.)
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
export type CreateContentInput = Omit<ContentItem, "id" | "dateConsumed"> & {
  dateConsumed?: Date;
};

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
