"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, SquareUserRound } from "lucide-react";

export default function NavOptions(props: { email: string } & ButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...props}>
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex gap-2 overflow-hidden">
          <SquareUserRound className="h-5 w-5" />
          <span className="max-w-32 overflow-hidden text-ellipsis whitespace-nowrap">
            {props.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Ends the Cloudflare Access session (only exists behind Access, so it 404s locally). */}
        <DropdownMenuItem asChild>
          <a href="/cdn-cgi/access/logout">Logout</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
