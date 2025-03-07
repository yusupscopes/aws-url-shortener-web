"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Copy, Loader2 } from "lucide-react"
import { shortenUrl } from "@/lib/actions"

export default function UrlShortenerForm() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!url) {
      setError("Please enter a URL")
      return
    }

    try {
      setIsLoading(true)
      const result = await shortenUrl(url)
      setShortUrl(result.shortUrl)
      setUrl("")
    } catch (err) {
      setError("Failed to shorten URL. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    toast.success("Copied to clipboard", {
      description: "The shortened URL has been copied to your clipboard.",
    })
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="url"
          placeholder="https://example.com/very-long-url-that-needs-shortening"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full"
          disabled={isLoading}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Shortening...
            </>
          ) : (
            "Shorten URL"
          )}
        </Button>
      </form>

      {shortUrl && (
        <div className="rounded-lg border bg-muted p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium break-all">{shortUrl}</p>
            <Button size="sm" variant="ghost" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

