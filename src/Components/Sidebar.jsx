import React, { useState } from "react";
import useStore from "../lib/useStore";

const Sidebar = () => {
  const { contentObject, setContentObject, codeTextSize, setCodeTextSize } =
    useStore();

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

  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    const contentEditableDiv = document.getElementById("editableDiv");

    if (contentEditableDiv) {
      const range = document.createRange();
      range.selectNodeContents(contentEditableDiv);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      try {
        document.execCommand("copy");
        setCopySuccess(true);
      } catch (err) {
        console.error("Copy failed: ", err);
        setCopySuccess(false);
      }

      // Clear the selection
      selection.removeAllRanges();
    }
  };

  return (
    <aside className="hideOnPrint border-r max-w-[500px] h-screen lg:sticky top-0 bg-black text-white border-gray-800 p-5">
      <h1 className="text-2xl mb-3 font-bold">Create post</h1>
      <textarea
        className="w-full p-2 resize-none text-white bg-black border border-gray-700"
        rows="10"
        value={jsonInput}
        onChange={handleInputChange}
      />
      <div className="flex justify-between items-center mt-3">
        <button className="bg-blue-700 p-2" onClick={handleCreatePost}>
          Create Post
        </button>
        <button
          className="bg-blue-700 p-2"
          onClick={() => {
            window.print();
          }}
        >
          Download as PDF
        </button>
      </div>
      <input
        type="number"
        placeholder="code text size in px (12px)"
        onChange={(e) => {
          setCodeTextSize(e.target.value);
        }}
        value={codeTextSize}
        className="w-full p-2 text-white bg-black border border-gray-700 mt-5"
      />
      {contentObject && (
        <div
          id="editableDiv"
          className="mt-3 border border-gray-800 p-2"
          contentEditable
        >
          <p>{contentObject.description}</p>
          <br />
          follow @Chetan-Khulage for more content like this!!
          <br />
          <br />
          <p>
            {contentObject.hashtags.map(
              (hashtag, index) =>
                `#${hashtag} ${
                  index !== contentObject.hashtags.length - 1 ? " " : ""
                }`
            )}
          </p>
        </div>
      )}
      <button
        className="bg-blue-700 p-2 mt-3 float-right"
        onClick={copyToClipboard}
      >
        {copySuccess ? "Copied!" : "Copy text"}
      </button>
    </aside>
  );
};

export default Sidebar;
