"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Home, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ReturnToSiteButton(props: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link href="/">
      <Button className={"space-x-2 " + props.className} {...props} onClick={() => setIsLoading(true)}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Home className="h-4 w-4" />
        )}
        <span>Return to site</span>
      </Button>
    </Link>
  );
}
