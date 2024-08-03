import React from "react";
import { ModeToggle } from "./ui/mode-toggle";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5">
      <div>Linkedin Post Maker</div>
      <ModeToggle />
    </div>
  );
};

export default Header;
