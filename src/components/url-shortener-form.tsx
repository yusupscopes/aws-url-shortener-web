"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Copy, Check, QrCode, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn, getQrCodeUrl } from "@/lib/utils";
import { useUrlShortener } from "@/hooks/use-url-shortener";

export default function UrlShortenerForm() {
  const [url, setUrl] = useState("");
  const [expireOption, setExpireOption] = useState<"never" | "preset" | "custom">("never");
  const [expireDays, setExpireDays] = useState<number | undefined>(undefined);
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  
  const { shortenUrl, isLoading, result, error } = useUrlShortener();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      toast.error("Please enter a valid URL");
      return;
    }

    try {
      // Calculate expiration days based on selection
      let daysToExpire: number | undefined = undefined;
      
      if (expireOption === "preset") {
        daysToExpire = expireDays;
      } else if (expireOption === "custom" && customDate) {
        const diffTime = customDate.getTime() - new Date().getTime();
        daysToExpire = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
      
      await shortenUrl(url, daysToExpire);
      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error("Failed to shorten URL. Please try again.");
    }
  };

  // Handle expiration option change
  const handleExpirationChange = (value: string) => {
    setExpireOption(value as "never" | "preset" | "custom");
    
    if (value === "never") {
      setExpireDays(undefined);
      setCustomDate(undefined);
    } else if (value === "preset" && !expireDays) {
      setExpireDays(7); // Default to 7 days
    }
  };

  // Handle preset days selection
  const handlePresetDaysChange = (days: number) => {
    setExpireDays(days);
  };

  // Copy shortened URL to clipboard
  const copyToClipboard = () => {
    if (result?.shortUrl) {
      navigator.clipboard.writeText(result.shortUrl);
      setCopied(true);
      toast.success("Copied to clipboard!");
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  // View QR code
  const viewQrCode = () => {
    if (result?.shortUrl) {
      const qrCodeUrl = getQrCodeUrl(result.shortUrl);
      window.open(qrCodeUrl, "_blank");
    }
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
        
        <div className="space-y-2">
          <Label>Link expiration</Label>
          <RadioGroup
            value={expireOption}
            onValueChange={handleExpirationChange}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="never" id="never" />
              <Label htmlFor="never" className="font-normal">Never expire</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="preset" id="preset" />
              <Label htmlFor="preset" className="font-normal">Expire after</Label>
              {expireOption === "preset" && (
                <div className="flex gap-2 ml-2">
                  {[1, 7, 30, 90].map((days) => (
                    <Button
                      key={days}
                      type="button"
                      size="sm"
                      variant={expireDays === days ? "default" : "outline"}
                      className="h-7 px-2"
                      onClick={() => handlePresetDaysChange(days)}
                    >
                      {days} {days === 1 ? "day" : "days"}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom" className="font-normal">Custom date</Label>
              {expireOption === "custom" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "ml-2 w-[160px] justify-start text-left font-normal",
                        !customDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {customDate ? format(customDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={customDate}
                      onSelect={setCustomDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </RadioGroup>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Shortening..." : "Shorten URL"}
        </Button>
      </form>

      {error && (
        <div className="rounded-lg border border-destructive p-4 text-destructive">
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-lg border p-4 space-y-3">
          <div className="space-y-1">
            <Label>Your shortened URL</Label>
            <div className="flex items-center gap-2">
              <Input value={result.shortUrl} readOnly />
              <Button
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
            <Button variant="outline" size="sm" className="w-full" onClick={() => window.open(result.shortUrl, "_blank")}>
              Open
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.href = `/stats/${result.shortCode}`}>
              View Stats
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}