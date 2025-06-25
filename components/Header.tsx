'use client';

import { JSX } from 'react';

/**
 * Header component with sticky positioning and optional tools.
 *
 * @returns {JSX.Element}
 */
export default function Header(): JSX.Element {
  return (
    <header className="w-full sticky top-0 z-50 bg-background/80 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-end border-b">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold tracking-wide">arqo-thumb</span>
      </div>
    </header>
  );
}