import React from "react";
import { BiGridAlt, BiListUl } from "react-icons/bi";

export default function Dropdown({ listType, setListType }) {

  return (
    <div className="relative flex space-x-4 items-center ">
      <button onClick={() => setListType("list")}>
        <BiListUl
          className={`${
            listType === "list" ? "text-accent" : "text-[#999]"
          } w-[1.4rem] h-[1.4rem] transition-all duration-200 ease-in-out`}
        />
      </button>
      <button onClick={() => setListType("grid")}>
        <BiGridAlt
          className={`${
            listType === "grid" ? "text-accent" : "text-[#999]"
          } w-[1.1rem] h-[1.1rem] transition-all duration-200 ease-in-out`}
        />
      </button>
    </div>
  );
}
