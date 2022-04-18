import React from "react";
import { BiChevronDown } from "react-icons/bi";

export default function Dropdown() {
  return (
    <div className="flex items-center text-[#999]">
      <p className="text-xs font-medium">Most popular</p>
      <BiChevronDown className="w-5 h-5" />
    </div>
  );
}
