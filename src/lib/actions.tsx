"use server";

import { nanoid } from "nanoid";

// In a real application, this would connect to a database
const urlMap = new Map<string, string>();

export async function shortenUrl(originalUrl: string) {
  try {
    // Validate URL
    new URL(originalUrl);

    // Generate a short code
    const shortCode = nanoid(7);

    // In a real app, store this in a database
    urlMap.set(shortCode, originalUrl);

    // Return the shortened URL
    // In production, this would use your actual domain
    const shortUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || "https://liqo.vercel.app"
    }/s/${shortCode}`;

    return { shortUrl, success: true };
  } catch (error) {
    console.error("Error shortening URL:", error);
    throw new Error("Failed to shorten URL");
  }
}

export async function getOriginalUrl(shortCode: string) {
  const originalUrl = urlMap.get(shortCode);

  if (!originalUrl) {
    throw new Error("URL not found");
  }

  return { originalUrl, success: true };
}
