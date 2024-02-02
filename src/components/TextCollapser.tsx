"use client";

import { useState } from "react";

type TextCollapserProps = {
  value: string;
  maxChars: number;
};

export default function TextCollapser(props: TextCollapserProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const showReadMoreButton = props.value.length > props.maxChars;

  function toggleExpand() {
    setIsCollapsed(() => !isCollapsed);
  }

  return (
    <p>
      {(isCollapsed && showReadMoreButton) ? `${props.value.substring(0, props.maxChars)}... ` : `${props.value} `}
      {showReadMoreButton && (
        <span onClick={toggleExpand} className="cursor-pointer hover:underline text-primary whitespace-nowrap">
          {isCollapsed ? "Read more" : "Show less"}
        </span>
      )}
    </p>
  );
}
