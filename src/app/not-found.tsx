import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-muted p-3">
          <LinkIcon className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The link you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/" className="mt-8">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
