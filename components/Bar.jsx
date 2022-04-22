import { Cross as Hamburger } from "hamburger-react";

import Link from "next/link";
import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";

import { BLACK_LIST } from "../utils";

export default function Bar({ isOpened, setIsOpened }) {
  const router = useRouter();

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <>
      {!BLACK_LIST.includes(router.pathname) && (
        <div
          className={`${
            isOpened && "translate-x-2/3 rounded-tl-2xl"
          } transition-all duration-300 bg-white w-full py-6 px-2.5 pr-6 flex justify-between items-center relative z-50 `}
        >
          {router.pathname === "/admin/dishes" ? (
            <button
              aria-label="Go back"
              className=" p-3 rounded-xl transition-all duration-200 hover:brightness-95"
              onClick={() => router.push("/admin")}
            >
              <BiChevronLeft className=" w-5 h-5 text-customDark" />
            </button>
          ) : (
            <Hamburger
              toggled={isOpened}
              toggle={handleClick}
              size={16}
              color="#444"
              duration={0.5}
              rounded
            />
          )}

          <div className="flex -space-x-2 overflow-hidden">
            <Link href={router.pathname === "/admin"  ? "/" : "/admin"}>
              <img
                className="inline-block h-8 w-8 ring-white"
                src="/assets/food-drink/svg/hamburger-30703.svg"
                alt=""
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
