import { useRouter } from "next/router";
import { BiMenuAltLeft } from "react-icons/bi";

export default function Bar() {
  return (
    <div className="w-full p-6 flex justify-between items-center">
      <BiMenuAltLeft className="w-5 h-5 text-customDark" />
      <div className="flex -space-x-2 overflow-hidden">
        {/*  <img
          className="inline-block h-8 w-8 rounded-xl ring-white"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt=""
        /> */}
      </div>
    </div>
  );
}
