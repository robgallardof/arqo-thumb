/**
 * Normalizes a raw user input URL into a valid format.
 *
 * @param {string} raw - Raw input from the user.
 * @returns {string} - Normalized and valid URL, or empty string if invalid.
 */
export const normalizeUrl = (raw: string): string => {
  try {
    const trimmed = raw.trim();
    const fullUrl = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    new URL(fullUrl);
    return fullUrl;
  } catch {
    return '';
  }
};

/**
 * Converts a Blob to a base64-encoded string.
 *
 * @param {Blob} blob - Image blob from fetch.
 * @returns {Promise<string>} - Base64 string.
 */
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) resolve(reader.result as string);
      else reject(new Error('Conversion failed'));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Generates URL query params string for the thumbnail API.
 *
 * @param {object} options - Parameters to serialize.
 * @returns {string} - Query string.
 */
export const generateQueryParams = (options: {
  url: string;
  width: number;
  height: number;
  quality: number;
  format: string;
}): string => {
  return new URLSearchParams({
    url: options.url,
    width: options.width.toString(),
    height: options.height.toString(),
    quality: options.quality.toString(),
    format: options.format
  }).toString();
};