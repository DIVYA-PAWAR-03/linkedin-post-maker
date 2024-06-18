import React, { useState } from "react";
import dpImg from "/dp.png";
import useStore from "../lib/useStore";

import PostFirstPage from "./PostFirstPage";
import PostLastPage from "./PostLastPage";
import ModificableText from "./ModificableText";
import ModificableCodeBlock from "./ModificableCodeBlock";

const OutputPost = () => {
  const { contentObject } = useStore();

  return (
    <main className="col-span-2 print:py-0 py-10 items-center md:m-auto md:w-min w-full overflow-y-scroll">
      <button
        className="hideOnPrint bg-blue-700 p-2 fixed top-5 right-5 z-10 text-white"
        onClick={() => {
          window.print();
        }}
      >
        Download as PDF
      </button>
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
            <ModificableText
              defaultFont={18}
              className="text-lg text-white/50 my-7"
            >
              {content.description}
            </ModificableText>
            {!content.code ||
              (!content.code == "" && (
                <ModificableCodeBlock
                  defaultFont={16}
                  codeLang={content.codeLang}
                >
                  {content.code}
                </ModificableCodeBlock>
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
