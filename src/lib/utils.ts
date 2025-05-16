import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "Never";
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Format a URL for display (truncate if too long)
 */
export function formatUrl(url: string, maxLength = 50): string {
  if (url.length <= maxLength) return url;
  
  return url.substring(0, maxLength) + "...";
}

/**
 * Calculate time remaining until expiration
 */
export function getTimeRemaining(expiresAt: string | undefined): string {
  if (!expiresAt) return "Never expires";
  
  const now = new Date();
  const expiration = new Date(expiresAt);
  const diffTime = expiration.getTime() - now.getTime();
  
  if (diffTime <= 0) return "Expired";
  
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} remaining`;
  }
  
  return `${diffHours} hour${diffHours !== 1 ? "s" : ""} remaining`;
}

/**
 * Generate a QR code URL for a given short URL
 */
export function getQrCodeUrl(shortUrl: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shortUrl)}`;
}

/**
 * Save a URL to local storage history
 */
export function saveToHistory(urlData: any): void {
  try {
    const history = JSON.parse(localStorage.getItem("urlHistory") || "[]");
    const newHistory = [urlData, ...history].slice(0, 50); // Keep only the last 50 items
    localStorage.setItem("urlHistory", JSON.stringify(newHistory));
  } catch (error) {
    console.error("Failed to save to history", error);
  }
}