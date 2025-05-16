"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Check, QrCode } from "lucide-react";
import ExpirationPicker from "./expiration-picker";
import { shortenUrl } from "@/lib/api";

export default function ShortenUrlForm() {
  const [url, setUrl] = useState("");
  const [expireInDays, setExpireInDays] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      setIsLoading(true);
      const result = await shortenUrl(url, expireInDays || undefined);
      setShortUrl(result.shortUrl);

      // Save to history in local storage
      saveToHistory(result);

      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error("Failed to shorten URL. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToHistory = (urlData: any) => {
    try {
      const history = JSON.parse(localStorage.getItem("urlHistory") || "[]");
      const newHistory = [urlData, ...history].slice(0, 50); // Keep only the last 50 items
      localStorage.setItem("urlHistory", JSON.stringify(newHistory));
    } catch (error) {
      console.error("Failed to save to history", error);
    }
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("Copied to clipboard!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const viewQrCode = () => {
    // Implement QR code functionality
    toast.info("QR code functionality coming soon!");
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Enter your long URL</Label>
          <Input
            id="url"
            placeholder="https://example.com/very/long/url/that/needs/shortening"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <ExpirationPicker value={expireInDays} onChange={setExpireInDays} />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Shortening..." : "Shorten URL"}
        </Button>
      </form>

      {shortUrl && (
        <div className="rounded-lg border p-4 space-y-3">
          <div className="space-y-1">
            <Label>Your shortened URL</Label>
            <div className="flex items-center gap-2">
              <Input value={shortUrl} readOnly />
              <Button
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={viewQrCode}
                title="View QR code"
              >
                <QrCode className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => window.open(shortUrl, "_blank")}
            >
              Open
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() =>
                (window.location.href = `/stats/${shortUrl.split("/").pop()}`)
              }
            >
              View Stats
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
