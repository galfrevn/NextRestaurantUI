import { useState } from "react";
import Dropdown from "./Dropdown";
import ProductCard from "./ProductCard";

export default function Menu({ data, isOpened }) {
  const [listType, setListType] = useState("grid");

  return (
    <div
      className={`${
        isOpened && "translate-x-2/3"
      } relative z-40 transition-all duration-300 bg-white h-[70vh]`}
    >
      <TopMenu
        isOpened={isOpened}
        listType={listType}
        setListType={setListType}
      />
      <div
        className={`${
          listType === "grid" && "grid grid-cols-2 gap-4"
        } relative z-40 transition-all duration-300 px-6 pt-4 bg-white pb-24 `}
      >
        {!data ? (
          <div>Cargando... </div>
        ) : (
          data.map((food, index) => (
            <ProductCard
              style={listType}
              key={index}
              delay={index}
              name={food.name}
              slug={food.slug}
              image={food.image}
              description={food.description}
              price={food.price}
            />
          ))
        )}
      </div>
    </div>
  );
}

export const TopMenu = ({ isOpened, listType, setListType }) => {
  return (
    <div
      className={`relative z-40 transition-all duration-300 px-6 py-2 bg-white text-customDark flex items-center justify-between `}
    >
      <p className="text-sm font-semibold">Categories</p>
      <Dropdown listType={listType} setListType={setListType} />
    </div>
  );
};
