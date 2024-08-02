import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between py-4 px-10 border-b">
      <div className="text-lg font-bold uppercase">Linkedin Post Maker</div>
      <ul>
        <li>
          <Link to="/contact" className="hover:underline underline-offset-4">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
