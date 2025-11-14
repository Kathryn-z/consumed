import { ContentCategory } from "./content";

/**
 * Search filter interface
 */
export interface SearchFilter {
  query: string;
  category?: ContentCategory;
}
