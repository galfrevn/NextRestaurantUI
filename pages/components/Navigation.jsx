import {
  BiHomeAlt,
  BiCategoryAlt,
  BiBasket,
  BiHeart,
  BiBeer,
} from "react-icons/bi";
import Link from "next/link";

export default function Navigation({ selected, isOpened }) {
  return (
    <div className={` ${isOpened && "translate-x-2/3 rounded-bl-2xl"} transition-all duration-300 fixed bottom-0 left-0 w-full p-6 z-50 bg-white text-customDark rounded-t-xl `}>
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
          <div>
            <BiBasket
              className={`${
                selected === "/cart" && "text-accent"
              } transition-all duration-150 w-5 h-5`}
            />
          </div>
        </Link>

        <Link href="/favorites">
          <div>
            <BiHeart
              className={`${
                selected === "/favorites" && "text-accent"
              } transition-all duration-150 w-5 h-5`}
            />
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
  );
}
