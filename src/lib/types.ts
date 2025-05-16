/**
 * Interface for a short URL
 */
export interface ShortUrl {
  shortUrl: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  expiresAt?: string;
}

/**
 * Interface for URL statistics
 */
export interface UrlStats extends ShortUrl {
  clicks: number;
  clicksData?: {
    date: string;
    count: number;
  }[];
}

/**
 * Interface for URL history item (stored in local storage)
 */
export interface UrlHistoryItem extends ShortUrl {
  lastAccessed?: string;
}

/**
 * Interface for API error
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}