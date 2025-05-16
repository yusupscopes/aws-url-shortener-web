"use server";

import { cookies } from "next/headers";
import { getOriginalUrl as fetchOriginalUrl } from "./api";

/**
 * Server action to get the original URL and handle redirects
 * This is used by the redirect page to fetch the original URL
 */
export async function getOriginalUrl(shortCode: string): Promise<{ originalUrl: string }> {
  try {
    // Track the visit in cookies for history (optional)
    const urlHistory = cookies().get("urlHistory")?.value;
    if (urlHistory) {
      try {
        const history = JSON.parse(urlHistory);
        // Update history with last accessed time
        // Implementation details would go here
      } catch (e) {
        // Handle parsing error
        console.error("Error parsing URL history cookie:", e);
      }
    }

    // Get the original URL from the API
    return await fetchOriginalUrl(shortCode);
  } catch (error) {
    console.error("Error in getOriginalUrl action:", error);
    throw error;
  }
}