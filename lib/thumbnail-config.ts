/**
 * Default values for the thumbnail generator settings.
 */
export const DEFAULT_THUMBNAIL_CONFIG = {
  width: 800,
  height: 600,
  quality: 80,
  format: 'webp'
} as const;

/**
 * Supported image formats.
 */
export const SUPPORTED_FORMATS = ['webp', 'jpeg', 'png'] as const;