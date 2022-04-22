import React from "react";


const IMAGES = [
  "a", "a", "a", "a"
];

export default function menu({ isOpened }) {
  return (
    <>
      <div
        className={`${
          isOpened && "translate-x-2/3"
        } transition-all duration-300 bg-white p-6 relative z-40 flex items-center justify-between`}
      >
        <p className="text-sm font-semibold pt-2 text-customDark">
          Special oferts
        </p>
      </div>
      <div
        className={`${
          isOpened && "translate-x-2/3"
        } transition-all duration-300 pt-3 px-6 pb-20 space-y-5 relative z-40 bg-white`}
      >
        {IMAGES.map((image, index) => (
          <div className="w-full h-auto" >
            a
          </div>
        ))}
      </div>
    </>
  );
}
