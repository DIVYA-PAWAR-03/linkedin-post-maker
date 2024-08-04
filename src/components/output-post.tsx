"use client";

import { Button } from "./ui/button";
import { FileDownIcon } from "lucide-react";
import BlackDiamondPost from "./themes/black-diamond/black-diamond-post";
import ColourfulBubblesPost from "./themes/colourful-bubbles/colourful-bubbles-post";
import { useSelectedTheme } from "@/lib/useSelectedTheme";
import AllPostThemes from "@/lib/all-post-themes";
import { useEffect, useState } from "react";

type Props = {};

const OutputPost = (props: Props) => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="print:py-0 py-10">
      <div className="hideOnPrint flex gap-2 fixed top-5 left-[50%] translate-x-[-50%] z-10">
        {/* <Select
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
        </Select> */}
        <Button
          onClick={() => {
            window.print();
          }}
        >
          <FileDownIcon className="w-5 h-5 mr-1" /> Download as PDF
        </Button>
      </div>
      {AllPostThemes.map((theme, _) => (
        <div key={_}>{selectedTheme === theme.name && <theme.component />}</div>
      ))}
    </main>
  );
};

export default OutputPost;
