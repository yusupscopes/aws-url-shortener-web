import { getOriginalUrl } from "@/lib/actions";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redirecting...",
  description: "You are being redirected to the original URL",
};

export default async function RedirectPage({
  params,
}: {
  params: { code: string };
}) {
  try {
    const { originalUrl } = await getOriginalUrl(params.code);
    redirect(originalUrl);
  } catch (error) {
    // If URL not found, redirect to 404 page
    redirect("/404");
  }

  // This is a fallback in case redirect doesn't work
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Redirecting...</h1>
      <p className="text-muted-foreground">
        You are being redirected to the original URL.
      </p>
    </div>
  );
}
