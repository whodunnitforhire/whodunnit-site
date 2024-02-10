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
import { useTheme } from "next-themes";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function NavOptions(props: { email: string } & ButtonProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...props}>
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex gap-2 overflow-hidden">
          <SquareUserRound className="h-5 w-5" />
          <span className="max-w-32 overflow-hidden overflow-ellipsis whitespace-nowrap">
            {props.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutLink postLogoutRedirectURL="/">
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </LogoutLink>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
