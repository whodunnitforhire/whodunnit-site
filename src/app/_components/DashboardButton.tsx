"use client";

import { Button } from "@/components/ui/button";
import { ShieldEllipsis } from "lucide-react";
import { useEffect, useState } from "react";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

export default function DashboardButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { user, permissions } = useKindeBrowserClient();
  const hasAccess = user && permissions.permissions.includes("access:dashboard")

  if (!mounted || !hasAccess) {
    return null
  }

  return (
    <Link href="/dashboard">
      <Button
        size="sm"
        className="space-x-2 text-destructive hover:text-destructive"
        variant="ghost"
      >
        <ShieldEllipsis className="h-4 w-4" />
        <span className="hidden sm:inline">Dashboard</span>
      </Button>
    </Link>
  );
}