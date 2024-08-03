"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Input } from "./ui/input";

const ModificableText = ({
  children,
  className,
  defaultFont,
}: {
  children: ReactNode;
  className: string;
  defaultFont: string | number;
}) => {
  const [CustomFontSize, setCustomFontSize] = useState("inherit");
  const [active, setActive] = useState(false);

  let timeout: NodeJS.Timeout | null = null;

  const handleActive = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    setActive(true);
  };

  const handleNoActive = () => {
    timeout = setTimeout(() => {
      setActive(false);
    }, 100);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        style={{
          boxShadow: active ? "0 0 0 2px hsl(var(--border))" : "",
          fontSize:
            CustomFontSize == "inherit" ? "inherit" : `${CustomFontSize}px`,
        }}
        onMouseOver={handleActive}
        onMouseLeave={handleNoActive}
      >
        {children}
      </div>
      {active && (
        <div className="absolute top-2 right-2">
          <Input
            type="number"
            className="text-primary"
            placeholder="fontSize"
            onFocus={handleActive}
            onMouseOver={handleActive}
            onMouseLeave={handleNoActive}
            onBlur={handleNoActive}
            onChange={(e) => {
              setCustomFontSize(e.target.value);
            }}
            value={CustomFontSize == "inherit" ? defaultFont : CustomFontSize}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default ModificableText;
