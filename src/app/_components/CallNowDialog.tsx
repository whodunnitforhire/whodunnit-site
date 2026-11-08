"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { type ReactNode, useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CallNowDialogProps = {
  children: ReactNode;
};

export default function CallNowDialog(props: CallNowDialogProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return props.children;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="flex w-11/12 flex-col items-center rounded-md sm:w-full">
        <DialogHeader>
          <SectionHeader value="contact us" />
        </DialogHeader>
        <div className="flex w-full flex-col items-center gap-3 rounded-md bg-popover p-6">
          <p>{"(410) 549-2722"}</p>
          <Link href="tel:+1-410-549-2722">
            <Button size="lg">Call Now</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
