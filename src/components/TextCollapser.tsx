"use client";

import { useState } from "react";

type TextCollapserProps = {
  value: string;
  maxChars: number;
  className?: string;
};

export default function TextCollapser(props: TextCollapserProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const buffer = 75;
  const effectiveMaxChars = props.maxChars - buffer;

  const showReadMoreButton = props.value.length > effectiveMaxChars + buffer;

  function toggleExpand() {
    setIsCollapsed(() => !isCollapsed);
  }

  return (
    <p className={props.className}>
      {(isCollapsed && showReadMoreButton) ? `${props.value.substring(0, effectiveMaxChars)}... ` : `${props.value} `}
      {showReadMoreButton && (
        <span onClick={toggleExpand} className="cursor-pointer hover:underline text-primary whitespace-nowrap">
          {isCollapsed ? "Read more" : "Show less"}
        </span>
      )}
    </p>
  );
}
