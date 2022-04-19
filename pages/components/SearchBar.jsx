import React from "react";

import { BiSearchAlt, BiWrench } from "react-icons/bi";

function SearchBar({ isOpened }) {
  return (
    <div className={` ${isOpened && "translate-x-2/3"} relative z-40 transition-all duration-300 flex bg-white items-center justify-between px-5`} >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search here"
          className="border-[1px] border-customDark w-full pl-6 pr-14 py-4 text-customDark rounded-xl text-xs font-medium focus:outline-none"
        />
        <BiSearchAlt className="absolute right-4 top-3.5 w-5 h-5 text-customDark " />
      </div>
      {/* <div className="ml-4 bg-accent rounded-xl p-3">
        <BiWrench className="w-5 h-5 text-white" />
      </div> */}
    </div>
  );
}

export default SearchBar;
