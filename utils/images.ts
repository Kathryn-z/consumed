/**
 * Get the appropriate image URL from a content item
 * Tries new images field first, falls back to legacy fields
 */
export const getImageUrl = (item: any): string | undefined => {
  // Try new images field (JSON string)
  if (item.images) {
    try {
      const imagesObj = JSON.parse(item.images);
      return imagesObj.large || imagesObj.medium || imagesObj.small;
    } catch {
      // If not JSON, treat as plain URL
      return item.images;
    }
  }

  // Fall back to legacy fields
  return item.cover || item.coverImage;
};
