"use client";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
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
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogContent className="flex flex-col items-center w-11/12 sm:w-full rounded-md">
        <DialogHeader>
          <SectionHeader value="contact us" />
        </DialogHeader>
        <div className="flex flex-col items-center bg-popover gap-3 p-6 w-full rounded-md">
          <p>{"(410) 549-2722"}</p>
          <Link href="tel:+1-410-549-2722">
            <Button size="lg">Call Now</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
