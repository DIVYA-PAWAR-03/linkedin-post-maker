import React, { useState } from "react";
import dpImg from "/dp.png";
import useStore from "../lib/useStore";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";
const Test = () => {
  const { contentObject, setContentObject } = useStore();
  const [jsonInput, setJsonInput] = useState("");

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleCreatePost = () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      setContentObject(parsedInput);
      document.title = parsedInput.title;
    } catch (e) {
      alert("Invalid JSON format");
    }
  };

  return (
    <div className="print:block grid grid-cols-3 bg-black text-white">
      <aside className="hideOnPrint border-r h-screen sticky top-0 bg-black border-gray-800 p-5">
        <h1 className="text-2xl mb-3">Input Section</h1>
        <textarea
          className="w-full p-2 text-white bg-black border border-gray-700"
          rows="10"
          value={jsonInput}
          onChange={handleInputChange}
        />
        <div className="flex justify-between">
          <button className="bg-blue-700 p-2 mt-3" onClick={handleCreatePost}>
            Create Post
          </button>
          <button
            className="bg-blue-700 p-2 mt-5"
            onClick={() => {
              window.print();
            }}
          >
            Download as PDF
          </button>
        </div>
      </aside>
      <main className="col-span-2 flex flex-col print:gap-0 gap-5 items-center m-auto overflow-auto">
        <section className="bgImg relative flex items-center justify-around text-center flex-col text-white bg-background p-10 px-12 overflow-hidden printSection">
          <div className="font-bold text-4xl leading-normal">
            {contentObject?.title || "Title"}
          </div>
          <div className="text-center flex flex-col justify-center items-center gap-2">
            <h6 className="mb-1 text-white/70">Follow</h6>
            <img src={dpImg} className="h-16 w-16 rounded-full" alt="" />
            <h4 className="text-center font-bold text-xl">chetan khulage</h4>
            <h6 className="-mt-1 text-white/70">for more content like this</h6>
          </div>
          <div className="absolute bottom-2 left-3 flex gap-4 text-white/70">
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-thumbs-up"></i> <span>Like</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-comment"></i> <span>Comment</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-retweet"></i> <span>Repost</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-paper-plane"></i> <span>Share</span>
            </div>
          </div>
        </section>
        {contentObject &&
          contentObject.content.map((content, index) => (
            <section
              key={index}
              className="bgImg relative text-white bg-background shadow-sm p-10 px-12 overflow-hidden printSection"
            >
              <h1 className="text-3xl font-bold">
                {index + 1}. {content.name}
              </h1>
              <p className="text-lg text-white/50 my-7">
                {content.description}
              </p>
              <SyntaxHighlighter
                language={content.codeLang}
                style={anOldHope}
                showLineNumbers
                customStyle={{
                  backgroundColor: "#101010",
                  borderRadius: "10px",
                  boxShadow: "0 0 30px -7px black",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
                className="text-lg p-4"
              >
                {content.code}
              </SyntaxHighlighter>
              <div className="absolute bottom-2 right-5 flex items-center gap-3 text-white/70">
                <img src={dpImg} className="h-8 w-8 rounded-full" alt="" />
                <div className="text-right mb-[1px]">
                  <h3 className="text-sm text-white">@chetan-khulage</h3>
                  <p className="text-[9px] mt-0.5">
                    for more content like this
                  </p>
                </div>
              </div>
            </section>
          ))}
        <section className="bgImg relative flex items-center text-center flex-col text-white bg-background p-10 px-12 overflow-hidden printSection">
          <div className="text-center flex flex-col justify-center mt-20 items-center gap-2">
            <h6 className="mb-1 text-2xl text-white/70">Follow</h6>
            <img src={dpImg} className="h-20 w-20 rounded-full" alt="" />
            <h4 className="text-center font-bold text-3xl">chetan khulage</h4>
            <h6 className="-mt-1 text-white/70 text-2xl">
              for more content like this
            </h6>
          </div>
          <div className="absolute bottom-5 left-6 flex flex-col gap-2 text-white/70">
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-thumbs-up"></i> <span>Like</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-comment"></i> <span>Comment</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-retweet"></i> <span>Repost</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-paper-plane"></i> <span>Share</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Test;
