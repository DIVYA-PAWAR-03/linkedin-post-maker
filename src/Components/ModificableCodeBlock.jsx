import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";
const ModificableCodeBlock = ({ children, codeLang, defaultFont }) => {
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
    <div className="relative">
      <div
        style={{ boxShadow: active ? "0 0 0 1px gray" : "" }}
        onMouseOver={handleActive}
        onMouseLeave={handleNoActive}
      >
        <SyntaxHighlighter
          language={codeLang}
          style={anOldHope}
          showLineNumbers
          customStyle={{
            backgroundColor: "#101010",
            borderRadius: "10px",
            boxShadow: "0 0 30px -7px black",
            paddingTop: "20px",
            fontSize: CustomFontSize + "px",
            paddingBottom: "20px",
          }}
          wrapLines={true}
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
          className="p-4"
        >
          {children}
        </SyntaxHighlighter>
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

export default ModificableCodeBlock;
