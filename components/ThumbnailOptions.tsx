'use client';

import { JSX } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUPPORTED_FORMATS } from "@/lib/thumbnail-config";

/**
 * Type for supported image formats.
 */
export type SupportedFormat = 'webp' | 'jpeg' | 'png';

/**
 * Props for configuring thumbnail generation.
 */
export interface ThumbnailOptionsProps {
  /** Width in pixels for the thumbnail image */
  width: number;
  /** Updates the thumbnail width */
  setWidth: (value: number) => void;

  /** Height in pixels for the thumbnail image */
  height: number;
  /** Updates the thumbnail height */
  setHeight: (value: number) => void;

  /** Quality of the output image (1-100) */
  quality: number;
  /** Updates the image quality */
  setQuality: (value: number) => void;

  /** Output image format */
  format: SupportedFormat;
  /** Updates the image format */
  setFormat: (value: SupportedFormat) => void;
}

/**
 * Renders input fields for thumbnail size, quality, and format selection.
 *
 * @param props - Configuration props for thumbnail generation
 * @returns {JSX.Element} A responsive form section for thumbnail options
 */
export const ThumbnailOptions = ({
  width,
  setWidth,
  height,
  setHeight,
  quality,
  setQuality,
  format,
  setFormat,
}: ThumbnailOptionsProps): JSX.Element => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {/* Width input */}
      <div className="space-y-2">
        <Label htmlFor="width">Width</Label>
        <Input
          id="width"
          type="number"
          min={1}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </div>

      {/* Height input */}
      <div className="space-y-2">
        <Label htmlFor="height">Height</Label>
        <Input
          id="height"
          type="number"
          min={1}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </div>

      {/* Quality input */}
      <div className="space-y-2">
        <Label htmlFor="quality">Quality</Label>
        <Input
          id="quality"
          type="number"
          min={1}
          max={100}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
        />
      </div>

      {/* Format select */}
      <div className="space-y-2">
        <Label htmlFor="format">Format</Label>
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger id="format">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_FORMATS.map((f) => (
              <SelectItem key={f} value={f}>
                {f.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};