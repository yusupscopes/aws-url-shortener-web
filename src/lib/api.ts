// API base URL - replace with your actual API URL in .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.liqo.url";

/**
 * Interface for the request to create a short URL
 */
export interface ShortenUrlRequest {
  url: string;
  expire_in_days?: number;
}

/**
 * Interface for the response when creating a short URL
 */
export interface ShortenUrlResponse {
  short_url: string;
}

/**
 * Interface for URL statistics
 */
export interface UrlStatsResponse {
  original_url: string;
  created_at: string;
  expiration: number;
  click_count: number;
}

/**
 * Error response from the API
 */
export interface ApiErrorResponse {
  message: string;
  code?: string;
  status?: number;
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

/**
 * Handle API response and extract data or throw appropriate error
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: ApiErrorResponse = {
      message: "An unknown error occurred",
    };

    try {
      errorData = await response.json();
    } catch (e) {
      // If parsing fails, use status text
      errorData.message = response.statusText;
    }

    throw new ApiError(errorData.message, errorData.code, response.status);
  }

  return await response.json();
}

/**
 * Create a short URL
 */
export async function shortenUrl(
  url: string,
  expireInDays?: number
): Promise<ShortenUrlResponse> {
  const payload: ShortenUrlRequest = {
    url,
    expire_in_days: expireInDays,
  };

  const response = await fetch(`${API_URL}/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<ShortenUrlResponse>(response);
}

/**
 * Get statistics for a short URL
 */
export async function getUrlStats(
  shortCode: string
): Promise<UrlStatsResponse> {
  const response = await fetch(`${API_URL}/stats/${shortCode}`);
  return handleResponse<UrlStatsResponse>(response);
}

/**
 * Get the original URL from a short code (server-side only)
 */
export async function getOriginalUrl(
  shortCode: string
): Promise<{ originalUrl: string }> {
  const response = await fetch(`${API_URL}/${shortCode}`);
  return handleResponse<{ originalUrl: string }>(response);
}
