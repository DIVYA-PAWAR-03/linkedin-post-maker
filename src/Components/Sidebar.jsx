import React, { useState } from "react";
import useStore from "../lib/useStore";
import AI from "./AI";
import { Button } from "./ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { ModeToggle } from "@/Components/ui/mode-toggle";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
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
    <aside className=" flex flex-col justify-between h-screen p-4">
      <div>
        <div className="mb-3 flex gap-2 items-center">
          <Link to={"/"}>
            <Button variant="secondary" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Post Maker</h1>
        </div>
        <Textarea
          className="p-2"
          value={jsonInput}
          onChange={handleInputChange}
          placeholder={`Input Json Data`}
          rows="6"
        />
        <div className="mt-3 gap-1">
          <Button className="" onClick={handleCreatePost}>
            Create Post
          </Button>
        </div>
        {contentObject ? (
          <pre
            id="editableDiv"
            className="text-wrap mt-3 border-border border rounded-lg p-2"
          >
            {contentObject.description}
            <br />
            <br />
            follow @Chetan Khulage for more content like this!!
            <br />
            <br />
            {contentObject.hashtags.map(
              (hashtag, index) =>
                `#${hashtag} ${
                  index !== contentObject.hashtags.length - 1 ? " " : ""
                }`
            )}
          </pre>
        ) : (
          <pre
            id="editableDiv"
            className="text-wrap mt-3 border-border border rounded-lg p-2"
          >
            description for this post will be here...!
          </pre>
        )}
        <Button className="mt-3" onClick={copyToClipboard}>
          {copySuccess ? "Copied!" : "Copy description"}
        </Button>
        {/* <AI /> */}
      </div>
      <div className="border-t border-border pt-4">
        <ModeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
