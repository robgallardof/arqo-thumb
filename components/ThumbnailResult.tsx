"use client";

import { JSX } from "react";
import CopyButton from "./CopyButton";

/**
 * Displays the generated thumbnail and offers download/copy options.
 *
 * @param props - The base64 image string and selected format.
 * @returns {JSX.Element | null} Thumbnail preview and actions.
 */
export const ThumbnailResult = ({
  imageBase64,
  format,
}: {
  imageBase64: string | null;
  format: string;
}): JSX.Element | null => {
  if (!imageBase64) return null;

  return (
    <section className="space-y-4">
      <img
        src={imageBase64}
        alt="Generated Thumbnail"
        className="rounded-lg border shadow-lg max-w-full mx-auto transition hover:scale-105 duration-300"
      />
      <div className="flex flex-wrap justify-center gap-4">
        <CopyButton text={imageBase64} />
        <a
          href={imageBase64}
          download={`thumbnail.${format}`}
          className="px-4 py-2 rounded-md border text-sm bg-primary text-white hover:bg-primary/90 transition"
        >
          Download .{format}
        </a>
      </div>
    </section>
  );
};
