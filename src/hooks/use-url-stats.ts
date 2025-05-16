"use client";

import { useState, useEffect } from "react";
import { getUrlStats } from "@/lib/api";
import type { UrlStats } from "@/lib/types";

export function useUrlStats(shortCode: string | null) {
  const [stats, setStats] = useState<UrlStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shortCode) return;

    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await getUrlStats(shortCode);
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch URL stats");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [shortCode]);

  const refreshStats = async () => {
    if (!shortCode) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await getUrlStats(shortCode);
      setStats(data);
    } catch (err: any) {
      setError(err.message || "Failed to refresh URL stats");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stats,
    isLoading,
    error,
    refreshStats,
  };
}