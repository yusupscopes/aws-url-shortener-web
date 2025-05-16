"use client";

import { useState, useEffect } from "react";
import type { UrlHistoryItem } from "@/lib/types";

export function useHistory() {
  const [history, setHistory] = useState<UrlHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHistory = () => {
      try {
        const savedHistory = localStorage.getItem("urlHistory");
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error("Failed to load history", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only run in browser environment
    if (typeof window !== "undefined") {
      loadHistory();
    } else {
      setIsLoading(false);
    }
  }, []);

  const clearHistory = () => {
    try {
      localStorage.removeItem("urlHistory");
      setHistory([]);
    } catch (error) {
      console.error("Failed to clear history", error);
    }
  };

  const removeFromHistory = (shortCode: string) => {
    try {
      const updatedHistory = history.filter(item => item.shortCode !== shortCode);
      localStorage.setItem("urlHistory", JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (error) {
      console.error("Failed to remove from history", error);
    }
  };

  return {
    history,
    isLoading,
    clearHistory,
    removeFromHistory,
  };
}