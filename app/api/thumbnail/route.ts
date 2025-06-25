import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import sharp from "sharp";
import { existsSync } from "fs";
import { platform } from "os";

/**
 * API endpoint that captures a website screenshot using a 1920x1080 viewport,
 * then resizes the output to the desired width and height and returns it as an image or base64.
 *
 * @param {NextRequest} req - The incoming request object from Next.js.
 * @returns {Promise<NextResponse>} The response containing the image or base64 string.
 *
 * @example
 * /api/thumbnail?url=https://firmmo.org&width=400&height=300&format=jpeg&base64=true
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const rawUrl = req.nextUrl.searchParams.get("url");
  const resizeWidth = parseInt(req.nextUrl.searchParams.get("width") || "0", 10);
  const resizeHeight = parseInt(req.nextUrl.searchParams.get("height") || "0", 10);
  const quality = parseInt(req.nextUrl.searchParams.get("quality") || "80", 10);
  const format = (req.nextUrl.searchParams.get("format") || "webp").toLowerCase();
  const asBase64 = req.nextUrl.searchParams.get("base64") === "true";

  const url = rawUrl?.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const executablePath = resolveChromeExecutablePath();

    const browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: "networkidle2", timeout: 15000 });

    const screenshot = (await page.screenshot({ fullPage: false })) as Buffer;
    await browser.close();

    let transformer = sharp(screenshot);

    // Resize image exactly to requested dimensions
    if (resizeWidth > 0 && resizeHeight > 0) {
      transformer = transformer.resize(resizeWidth, resizeHeight, { fit: "fill" });
    } else if (resizeWidth > 0 || resizeHeight > 0) {
      transformer = transformer.resize(resizeWidth || null, resizeHeight || null, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      });
    }

    let imageBuffer: Buffer;
    let mime: string;
    let ext: string;

    switch (format) {
      case "jpeg":
      case "jpg":
        imageBuffer = await transformer.jpeg({ quality }).toBuffer();
        mime = "image/jpeg";
        ext = "jpeg";
        break;
      case "png":
        imageBuffer = await transformer.png({ quality }).toBuffer();
        mime = "image/png";
        ext = "png";
        break;
      case "webp":
      default:
        imageBuffer = await transformer.webp({ quality }).toBuffer();
        mime = "image/webp";
        ext = "webp";
        break;
    }

    if (asBase64) {
      const base64 = `data:${mime};base64,${imageBuffer.toString("base64")}`;
      return NextResponse.json({ base64 }, { status: 200 });
    }

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": mime,
        "Content-Disposition": `inline; filename="thumbnail.${ext}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Failed to generate thumbnail", message: err.message },
      { status: 500 }
    );
  }
}

/**
 * Detects and returns the local Chrome/Chromium executable path depending on the OS.
 *
 * @returns {string | undefined} The resolved path to the Chrome executable.
 */
function resolveChromeExecutablePath(): string | undefined {
  const os = platform();

  if (os === "win32") {
    const paths = [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    ];
    return paths.find(existsSync);
  }

  if (os === "darwin") {
    const path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    return existsSync(path) ? path : undefined;
  }

  if (os === "linux") {
    const paths = [
      "/usr/bin/google-chrome",
      "/usr/bin/chromium-browser",
      "/usr/bin/chromium",
    ];
    return paths.find(existsSync);
  }

  return undefined;
}