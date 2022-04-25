import {
  BiHomeAlt,
  BiCategoryAlt,
  BiBasket,
  BiHeart,
  BiBeer,
} from "react-icons/bi";
import Link from "next/link";

import { useRouter } from "next/router";
import { BLACK_LIST } from "../utils/index";
import { useEffect, useState } from "react";

export default function Navigation({ selected, isOpened }) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [favItems, setfavItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems"));
    if (items) {
      setCartItems(items);
    }

    const fav = JSON.parse(localStorage.getItem("favItems"));
    if (fav) {
      setfavItems(fav);
    }
  }, [router.pathname]);

  return (
    <>
      {!BLACK_LIST.includes(router.pathname) && (
        <div
          className={` ${
            isOpened && "translate-x-2/3 rounded-bl-2xl"
          } transition-all duration-300 fixed bottom-0 left-0 w-full p-6 z-50 bg-white text-customDark rounded-t-xl`}
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <div>
                <BiHomeAlt
                  className={`${
                    selected === "/" && "text-accent"
                  } transition-all duration-150 w-5 h-5`}
                />
              </div>
            </Link>
            <Link href="/menu">
              <div>
                <BiCategoryAlt
                  className={`${
                    selected === "/menu" && "text-accent"
                  } transition-all duration-150 w-5 h-5`}
                />
              </div>
            </Link>

            <Link href="/cart">
              <div className="relative">
                <BiBasket
                  className={`${
                    selected === "/cart" && "text-accent"
                  } transition-all duration-150 w-5 h-5`}
                />
                {cartItems.length > 0 && (
                  <div
                    className={`absolute -top-3 -right-3 bg-accent text-white text-[9px] font-semibold px-[.6rem] py-1 rounded-full`}
                  >
                    {cartItems.length}
                  </div>
                )}
              </div>
            </Link>

            <Link href="/favorites">
              <div className="relative">
                <BiHeart
                  className={`${
                    selected === "/favorites" && "text-[#d62121]"
                  } transition-all duration-150 w-5 h-5`}
                />
                {favItems.length > 0 && (
                  <div
                    className={`absolute -top-3 -right-3 bg-[#d62121] text-white text-[9px] font-semibold px-[.6rem] py-1 rounded-full`}
                  >
                    {favItems.length}
                  </div>
                )}
              </div>
            </Link>
            <Link href="/info">
              <div>
                <BiBeer
                  className={`${
                    selected === "/info" && "text-accent"
                  } transition-all duration-150 w-5 h-5`}
                />
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
