import { useState } from 'react';
import {
  normalizeUrl,
  blobToBase64,
  generateQueryParams,
} from '@/lib/thumbnail-utils';
import { DEFAULT_THUMBNAIL_CONFIG } from '@/lib/thumbnail-config';
import { SUPPORTED_FORMATS } from '@/lib/thumbnail-config';

/**
 * Type for supported image formats.
 */
type Format = typeof SUPPORTED_FORMATS[number];

/**
 * Custom hook to manage the state and logic for generating website thumbnails.
 *
 * @returns An object containing state variables and the submission handler.
 */
export const useThumbnail = () => {
  const [url, setUrl] = useState<string>('');
  const [width, setWidth] = useState<number>(DEFAULT_THUMBNAIL_CONFIG.width);
  const [height, setHeight] = useState<number>(DEFAULT_THUMBNAIL_CONFIG.height);
  const [quality, setQuality] = useState<number>(DEFAULT_THUMBNAIL_CONFIG.quality);
  const [format, setFormat] = useState<Format>(DEFAULT_THUMBNAIL_CONFIG.format);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Validates the input URL, sends a request to the API,
   * and updates the thumbnail image state.
   *
   * @returns {Promise<void>}
   */
  const handleSubmit = async (): Promise<void> => {
    const normalized = normalizeUrl(url);
    if (!normalized) {
      setErrorMessage('Invalid URL');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setImageBase64(null);

    const query = generateQueryParams({
      url: normalized,
      width,
      height,
      quality,
      format,
    });

    try {
      const res = await fetch(`/api/thumbnail?${query}`);
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('image/')) {
        throw new Error();
      }

      const blob = await res.blob();
      const base64 = await blobToBase64(blob);
      setImageBase64(base64);
    } catch {
      setErrorMessage('Failed to generate thumbnail.');
    } finally {
      setLoading(false);
    }
  };

  return {
    url,
    setUrl,
    width,
    setWidth,
    height,
    setHeight,
    quality,
    setQuality,
    format,
    setFormat,
    imageBase64,
    errorMessage,
    loading,
    handleSubmit,
  };
};