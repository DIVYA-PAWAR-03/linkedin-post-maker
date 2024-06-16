import React, { useState } from "react";
import dpImg from "/dp.png";
import useStore from "../lib/useStore";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";
import PostFirstPage from "./PostFirstPage";
import PostLastPage from "./PostLastPage";

const OutputPost = () => {
  const { contentObject, codeTextSize } = useStore();

  return (
    <main className="col-span-2 print:py-0 py-10 items-center md:m-auto md:w-min w-full overflow-y-scroll">
      <PostFirstPage title={contentObject?.title || "Title"} />
      {contentObject &&
        contentObject.content.map((content, index) => (
          <section
            key={index}
            className="bgImg relative text-white bg-background shadow-sm p-10 px-12 overflow-hidden printSection"
          >
            <h1 className="text-3xl font-bold">
              {index + 1}. {content.name}
            </h1>
            <p className="text-lg text-white/50 my-7">{content.description}</p>
            {!content.code ||
              (!content.code == "" && (
                <SyntaxHighlighter
                  language={content.codeLang}
                  style={anOldHope}
                  showLineNumbers
                  customStyle={{
                    backgroundColor: "#101010",
                    borderRadius: "10px",
                    boxShadow: "0 0 30px -7px black",
                    paddingTop: "20px",
                    fontSize: codeTextSize + "px",
                    paddingBottom: "20px",
                  }}
                  wrapLines={true}
                  lineProps={{
                    style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
                  }}
                  className="p-4"
                >
                  {content.code}
                </SyntaxHighlighter>
              ))}

            <div className="absolute bottom-2 right-5 flex items-center gap-3 text-white/70">
              <img src={dpImg} className="h-8 w-8 rounded-full" alt="" />
              <div className="text-right mb-[1px]">
                <h3 className="text-sm text-white">@chetan-khulage</h3>
                <p className="text-[9px] mt-0.5">for more content like this</p>
              </div>
            </div>
          </section>
        ))}
      <PostLastPage />
    </main>
  );
};

export default OutputPost;
