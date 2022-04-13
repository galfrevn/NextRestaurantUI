import { useState } from "react";
import {
  BiHomeAlt,
  BiCategoryAlt,
  BiBasket,
  BiHeart,
  BiBeer,
} from "react-icons/bi";
import Link from 'next/link'


export default function Navigation({ selected }) {
  
  return (
    <div className="fixed bottom-0 left-0 w-full p-6 z-10 text-customDark">
      <div className="flex items-center justify-between">
        <Link href="/">
          <BiHomeAlt
            className={`${
              selected === "/" && "text-accent"
            } transition-all duration-150 w-5 h-5`}
          />
        </Link>
        <Link href="/menu">
          <BiCategoryAlt
            className={`${
              selected === "/menu" && "text-accent"
            } transition-all duration-150 w-5 h-5`}
          />
        </Link>

        <Link href="/cart">
          <BiBasket
            className={`${
              selected === "/cart" && "text-accent"
            } transition-all duration-150 w-5 h-5`}
          />
        </Link>
        <Link href="/favorites">
          <BiHeart
            className={`${
              selected === "/favorites" && "text-accent"
            } transition-all duration-150 w-5 h-5`}
          />
        </Link>
        <Link href="/info">
          <BiBeer
            className={`${
              selected === "/info" && "text-accent"
            } transition-all duration-150 w-5 h-5`}
          />
        </Link>
      </div>
    </div>
  );
}
