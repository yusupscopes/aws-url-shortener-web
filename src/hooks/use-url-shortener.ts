"use client";

import { useState } from "react";
import { shortenUrl as apiShortenUrl } from "@/lib/api";
import { saveToHistory } from "@/lib/utils";
import type { ShortUrl } from "@/lib/types";

export function useUrlShortener() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ShortUrl | null>(null);

  const shortenUrl = async (url: string, expireInDays?: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await apiShortenUrl(url, expireInDays);
      setResult(data);
      
      // Save to history
      saveToHistory(data);
      
      return data;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to shorten URL";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    shortenUrl,
    isLoading,
    error,
    result,
    reset,
  };
}