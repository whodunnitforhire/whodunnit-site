"use client";

import { Button } from "@/components/ui/button";
import { Home, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BackButton() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link href="/">
      <Button size="sm" variant="outline" onClick={() => setIsLoading(true)}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Home className="h-4 w-4" />
        )}
      </Button>
    </Link>
  );
}
