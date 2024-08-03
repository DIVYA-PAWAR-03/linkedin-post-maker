"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { FileDownIcon } from "lucide-react";
import BlackDiamondPost from "./themes/black-diamond/black-diamond-post";
import ColourfulBubblesPost from "./themes/colourful-bubbles/colourful-bubbles-post";
import UserSettings from "./user-settings";

type Props = {};

const OutputPost = (props: Props) => {
  const [selectedPost, setSelectedPost] = useState<string>("black-diamond");

  return (
    <main className="print:py-0 py-10">
      <div className="hideOnPrint flex gap-2 fixed top-5 right-5 z-10">
        <UserSettings />
        <Select
          defaultValue="black-diamond"
          onValueChange={(e) => {
            setSelectedPost(e);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="black-diamond">Black Diamond</SelectItem>
            <SelectItem value="colourful-bubbles">Colourful Bubbles</SelectItem>
            <SelectItem value="minimal-white">Minimal White</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            window.print();
          }}
        >
          <FileDownIcon className="w-5 h-5 mr-1" /> Download as PDF
        </Button>
      </div>
      {selectedPost === "black-diamond" && <BlackDiamondPost />}
      {selectedPost === "colourful-bubbles" && <ColourfulBubblesPost />}
    </main>
  );
};

export default OutputPost;
