// app/api/thumbnail/route.ts
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = req.nextUrl;
  const rawUrl = searchParams.get("url");
  const width = searchParams.get("width");
  const height = searchParams.get("height");
  const quality = searchParams.get("quality") || "80";
  const format = searchParams.get("format") || "webp";
  const base64 = searchParams.get("base64") === "true";

  const parsedUrl = rawUrl?.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  try {
    new URL(parsedUrl);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const executablePath = await chromium.executablePath();

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: true,
      defaultViewport: { width: 1920, height: 1080 },
    });

    const page = await browser.newPage();
    await page.goto(parsedUrl, { waitUntil: "networkidle2", timeout: 15000 });

    const screenshot = (await page.screenshot()) as Buffer;
    await browser.close();

    let transformer = sharp(screenshot);

    if (width || height) {
      transformer = transformer.resize(
        width ? parseInt(width) : null,
        height ? parseInt(height) : null,
        {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        }
      );
    }

    const fmt = format.toLowerCase();
    const q = parseInt(quality);
    let buffer: Buffer;
    let mime: string;

    switch (fmt) {
      case "jpeg":
      case "jpg":
        buffer = await transformer.jpeg({ quality: q }).toBuffer();
        mime = "image/jpeg";
        break;
      case "png":
        buffer = await transformer.png({ quality: q }).toBuffer();
        mime = "image/png";
        break;
      default:
        buffer = await transformer.webp({ quality: q }).toBuffer();
        mime = "image/webp";
        break;
    }

    if (base64) {
      return NextResponse.json({
        base64: `data:${mime};base64,${buffer.toString("base64")}`,
      });
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": mime,
        "Content-Disposition": `inline; filename="thumbnail.${fmt}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Thumbnail generation failed",
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
