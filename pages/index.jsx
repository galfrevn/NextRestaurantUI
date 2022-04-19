import React, { useContext, useEffect, useState } from "react";

import Menu from "./components/Menu";
import { MENU } from "../queries";
import client from "../client";
import FilterContext from "../context/FilterContext";

const categories = [
  {
    name: "Hamburgers",
    image: "assets/food-drink/svg/hamburger-30703.svg",
    code: "BURGER",
  },
  {
    name: "Chicken",
    image: "assets/food-drink/svg/chicken-30650.svg",
    code: "CHICKEN",
  },
  {
    name: "Pizzas",
    image: "assets/food-drink/svg/food-30675.svg",
    code: "PIZZA",
  },
  {
    name: "Frappes",
    image: "assets/food-drink/svg/teacup-30687.svg",
    code: "FRAPPE",
  },
  {
    name: "Drinks",
    image: "assets/food-drink/svg/wine-30692.svg",
    code: "DRINK",
  },
  {
    name: "Roasted",
    image: "assets/food-drink/svg/roasted-30678.svg",
  },
  {
    name: "Sandwiches",
    image: "assets/food-drink/svg/bread-30654.svg",
    code: "SANDWICH",
  },
  {
    name: "Fruits",
    image: "assets/food-drink/svg/banana-30652.svg",
  },
];

export default function Home({ data, isOpened }) {
  const mainMenu = data.foods;

  const [menu, setMenu] = useState(mainMenu);
  const { filter } = useContext(FilterContext);

  useEffect(() => {
    if (filter !== "") {
      const newMenu = data.foods.filter((item) => item.type === filter);
      setMenu(newMenu);
    } else {
      setMenu(mainMenu);
    }
  }, [filter]);

  return (
    <>
      <div className={` ${isOpened && "translate-x-2/3"} relative z-40 transition-all duration-300 pl-6 py-6 w-full flex bg-white items-center space-x-5 overflow-x-scroll scrollbar-none pr-4 `}>
        {categories.map((categorie, index) => (
          <CategorieCard key={index} {...categorie} />
        ))}
      </div>
      <Menu data={menu} isOpened={isOpened} />
    </>
  );
}

export const CategorieCard = ({ name, image, code }) => {
  const { filter, setFilter } = useContext(FilterContext);
  return (
    <button
      className={` ${
        filter === code ? "bg-accent text-white" : "bg-secondary text-customDark"
      } flex justify-center items-center py-2 px-4 rounded-xl text-xs font-medium   `}
      onClick={() => {
        filter === code ? setFilter("") : setFilter(code);
      }}
    >
      <img src={image} alt={name} className="w-4 h-4 mr-2" />
      {name}
    </button>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: MENU,
    fetchPolicy: 'no-cache'
  });

  return {
    props: {
      data: data,
    },
  };
}
