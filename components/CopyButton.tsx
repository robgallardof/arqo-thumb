"use client";

import { JSX, useState } from "react";
import copy from "copy-to-clipboard";
import { Button } from "@/components/ui/button";

/**
 * CopyButton component to copy provided text to clipboard.
 *
 * @param text - The string to copy.
 * @returns {JSX.Element}
 */
export default function CopyButton({ text }: { text: string }): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button onClick={handleCopy} variant="outline" className="mt-2">
      {copied ? "Copied!" : "Copy Base64"}
    </Button>
  );
}
