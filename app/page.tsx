'use client';

import { JSX } from 'react';
import { ThumbnailOptions } from '@/components/ThumbnailOptions';
import { ThumbnailResult } from '@/components/ThumbnailResult';
import { ThumbnailForm } from '@/components/ThumbnailForm';
import { useThumbnail } from './hooks/useThumbnail';

/**
 * HomePage is the main component that renders the thumbnail generator interface.
 * It includes a form to input the target URL, options for customizing the image,
 * and a section to display the result.
 *
 * @returns {JSX.Element} Full thumbnail generator UI.
 */
export default function HomePage(): JSX.Element {
  const state = useThumbnail();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background text-center">
      <div className="w-full max-w-3xl space-y-10">
        <header>
          <h1 className="text-4xl font-extrabold">Thumbnail Generator</h1>
          <p className="text-muted-foreground mt-2">
            Enter a website URL and customize the thumbnail's size, quality, and format.
          </p>
        </header>

        <ThumbnailForm {...state} />
        <ThumbnailOptions {...state} />
        <ThumbnailResult {...state} />
      </div>
    </main>
  );
}