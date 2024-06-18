import React, { useEffect, useState } from "react";

const ModificableText = ({ children, className, defaultFont }) => {
  const [CustomFontSize, setCustomFontSize] = useState("inherit");
  const [active, setActive] = useState(false);

  let timeout = null;

  const handleActive = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    setActive(true);
  };

  const handleNoActive = () => {
    timeout = setTimeout(() => {
      setActive(false);
    }, 1000);
  };

  useEffect(() => {}, []);

  return (
    <div className={`relative ${className}`}>
      <div
        style={{
          boxShadow: active ? "0 0 0 1px gray" : "",
          fontSize:
            CustomFontSize == "inherit" ? "inherit" : `${CustomFontSize}px`,
        }}
        onMouseOver={handleActive}
        onMouseLeave={handleNoActive}
      >
        {children}
      </div>
      {active && (
        <span className="absolute bottom-full right-0">
          <input
            type="number"
            className="bg-black border border-border text-white"
            placeholder="fontSize"
            onFocus={handleActive}
            onBlur={handleNoActive}
            onChange={(e) => {
              setCustomFontSize(e.target.value);
            }}
            value={CustomFontSize == "inherit" ? defaultFont : CustomFontSize}
          />{" "}
        </span>
      )}
    </div>
  );
};

export default ModificableText;
