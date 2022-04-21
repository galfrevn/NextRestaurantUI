import { useState } from "react";

export default function Counter() {

  const [counter, setCounter] = useState(1);

  

  return (
    <div className="bg-[#f1f1f1] p-2 rounded-xl flex">
      <button
        className="rounded-md flex items-center justify-center h-8 w-8 bg-white text-customDark font-semibold"
        onClick={() => setCounter(counter - 1)}
      >
        -
      </button>
      <p className="flex items-center justify-center text-customDark font-semibold text-sm px-5">
        {counter < 10 ? "0" + counter : counter}
      </p>
      <button
        className="rounded-md flex items-center justify-center h-8 w-8 bg-accent text-customDark font-semibold"
        onClick={() => setCounter(counter + 1)}
      >
        +
      </button>
    </div>
  );
}
