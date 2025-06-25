import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { JSX } from "react";

/**
 * Main UI font – Poppins
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/**
 * Mono font for code blocks – Geist Mono
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Thumbnail Generator",
    template: "%s | Thumbnail Generator",
  },
  description: "Free online tool to generate website thumbnails in seconds.",
  authors: [
    { name: "Roberto Gallardo", url: "https://robertogallardo.dev" },
    { name: "Arqo", url: "https://arqo.dev" },
  ],
  creator: "Roberto Gallardo",
  publisher: "Arqo",
  applicationName: "Thumbnail Generator",
  generator: "Next.js",
  metadataBase: new URL("https://thumbnail.arqo.dev"),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Thumbnail Generator",
    description: "Free and easy thumbnail generator for any website.",
    url: "https://thumbnail.arqo.dev",
    siteName: "Thumbnail Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thumbnail Generator",
    description: "Generate clean thumbnails for any URL instantly.",
    creator: "@arqodev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en" className={`${poppins.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}