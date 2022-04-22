import React from "react";
import { BiHeart } from "react-icons/bi";

import Link from "next/link";
import Image from "next/image";

export default function Sidebar({ isOpened, setIsOpened }) {
  return (
    <div className="w-2/3 h-full px-6 py-16 fixed left-0 top-0 text-white flex flex-col justify-between z-10">
      {isOpened && (
        <>
          <div>
            <Link href="/">
              <button onClick={() => setIsOpened(!isOpened)}>
                <Image
                  src="/assets/food-drink/svg/hamburger-30703.svg"
                  alt="Logo"
                  layout="fixed"
                  width={80}
                  height={80}
                  placeholder="blur"
                  blurDataURL="/assets/food-drink/svg/hamburger-30703.svg"
                />
              </button>
            </Link>

            <p className="text-2xl font-semibold">Restaurant</p>

            <ul className="text-md font-medium space-y-2 mt-8">
              <li>
                <Link href="/reviews">
                  <button onClick={() => setIsOpened(!isOpened)}>
                    Our reviews
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/menu">
                  <button onClick={() => setIsOpened(!isOpened)}>
                    Best dishes
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/work">
                  <button onClick={() => setIsOpened(!isOpened)}>
                    Work with us
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <button onClick={() => setIsOpened(!isOpened)}>
                    Contact
                  </button>
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-xs">
            <p>Copyright 2022</p>
            <div className="flex items-center space-x-1">
              <p>With</p>
              <BiHeart />
              <p>by Valentín Galfré</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
