/**
 * Content category enum
 * Add new categories here as the app grows
 */
export enum ContentCategory {
  BOOK = "Book",
  TV_MOVIE = "TV/Movie",
  PODCAST = "Podcast",
  DRAMA = "Drama",
}

/**
 * TV/Movie subtype enum
 */
export enum TVMovieSubtype {
  TV = "TV",
  MOVIE = "Movie",
}

/**
 * Drama subtype enum
 */
export enum DramaSubtype {
  MUSICAL = "Musical",
  PLAY = "Play",
  DANCE = "Dance",
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
  year?: number;
  rating?: number; // 0-5 stars (denormalized from most recent ConsumptionRecord)
  dateAdded: string; // ISO string for when item was added
  images?: string; // JSON string of image URLs (for Douban: {small, medium, large})
  externalId?: string; // ID from external API (Douban, TMDB, Google Books, etc.)
  link?: string; // URL to external website
  pubdates?: string; // JSON string of publication dates array
}

/**
 * Book-specific content
 */
export interface Book extends ContentBase {
  category: ContentCategory.BOOK;
  author?: string;
  wordCount?: number;
  tags?: string; // JSON string of tags array
}

/**
 * TV/Movie content (from Douban API)
 * Field names follow Douban API convention
 */
export interface TVMovie extends ContentBase {
  category: ContentCategory.TV_MOVIE;
  subtype: TVMovieSubtype; // Required: TV or Movie
  mobileUrl?: string; // Douban mobile URL
  directors?: string; // JSON string of director objects
  casts?: string; // JSON string of cast objects
  genres?: string; // JSON string of genres array
  seasonsCount?: number;
  currentSeason?: number;
  episodesCount?: number; // For TV shows
  countries?: string; // JSON string of countries array
}

/**
 * Podcast-specific content
 */
export interface Podcast extends ContentBase {
  category: ContentCategory.PODCAST;
  hosts?: string; // JSON string of hosts array
  episodesCount?: number;
}

/**
 * Drama content (Musical, Play, Dance)
 */
export interface Drama extends ContentBase {
  category: ContentCategory.DRAMA;
  subtype: DramaSubtype; // Required: Musical, Play, or Dance
  directors?: string; // JSON string of directors array
  casts?: string; // JSON string of cast array
  performers?: string; // Actors/Dancers (legacy/additional performers)
  venue?: string; // Theater/Performance venue
  duration?: number; // Duration in minutes
}

/**
 * Union type of all content items
 */
export type ContentItem = Book | TVMovie | Podcast | Drama;

/**
 * Content creation input
 */
export type CreateContentInput = Omit<ContentItem, "id" | "dateAdded">;

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
