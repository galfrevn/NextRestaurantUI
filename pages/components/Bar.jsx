import { BiMenuAltLeft } from "react-icons/bi";

import { Cross as Hamburger } from 'hamburger-react'

export default function Bar({ isOpened, setIsOpened }) {

  const handleClick = () => {
    setIsOpened(!isOpened)
  };

  return (
    <div className={`${isOpened && "translate-x-2/3"} transition-all duration-300 bg-white w-full py-6 px-2.5 pr-6 flex justify-between items-center relative z-40 `} >

      <Hamburger toggled={isOpened} toggle={handleClick} size={16} color="#444" duration={.5} rounded />
      <div className="flex -space-x-2 overflow-hidden">
          <img
          className="inline-block h-8 w-8 ring-white"
          src="./assets/food-drink/svg/hamburger-30703.svg"
          alt=""
        /> 
      </div>
    </div>
  );
}
