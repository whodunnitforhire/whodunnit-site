"use client";

import { Separator } from "@/components/ui/separator";

export default function AboutTabContent() {
  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex gap-4">
        <h1 className="text-3xl font-medium">About</h1>
      </div>
      <Separator />
      <div></div>
    </div>
  );
}
