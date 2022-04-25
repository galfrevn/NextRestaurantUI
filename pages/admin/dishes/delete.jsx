import React, { useEffect, useState } from "react";

import Menu from "../../../components/Menu";
import { MENU } from "../../../queries";
import client from "../../../client";
import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";

import Image from 'next/image'

const categories = [
  {
    name: "Hamburgers",
    image: "/assets/food-drink/svg/hamburger-30703.svg",
    code: "BURGER",
  },
  {
    name: "Chicken",
    image: "/assets/food-drink/svg/chicken-30650.svg",
    code: "CHICKEN",
  },
  {
    name: "Pizzas",
    image: "/assets/food-drink/svg/food-30675.svg",
    code: "PIZZA",
  },
  {
    name: "Frappes",
    image: "/assets/food-drink/svg/teacup-30687.svg",
    code: "FRAPPE",
  },
  {
    name: "Drinks",
    image: "/assets/food-drink/svg/wine-30692.svg",
    code: "DRINK",
  },
  {
    name: "Roasted",
    image: "/assets/food-drink/svg/roasted-30678.svg",
  },
  {
    name: "Sandwiches",
    image: "/assets/food-drink/svg/bread-30654.svg",
    code: "SANDWICH",
  },
  {
    name: "Fruits",
    image: "/assets/food-drink/svg/banana-30652.svg",
  },
];

export default function Delete({ data, isOpened }) {
  const mainMenu = data.foods;
  const router = useRouter();

  const [menu, setMenu] = useState(mainMenu);
  const [filter, setFilter] = useState("")

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (filter !== "") {
      const newMenu = data.foods.filter((item) => item.type === filter);
      setMenu(newMenu);
    } else {
      setMenu(mainMenu);
    }
  }, [filter]);

  return (
    <div className="bg-white h-[100vh]">
      <div
        className={` ${
          isOpened && "translate-x-2/3"
        } relative z-40 transition-all duration-300 bg-white `}
      >
        <BackButton handleBack={handleBack} />
        <h3 className="px-6 pt-28 font-semibold text-sm text-customDark">
          Select a dish to delete it
        </h3>
        <div className="pl-6 py-6 w-full flex items-center space-x-5 overflow-x-scroll scrollbar-none pr-4 ">
          {categories.map((categorie, index) => (
            <CategorieCard key={index} {...categorie} filter={filter} setFilter={setFilter} />
          ))}
        </div>
      </div>
      <Menu data={menu} isOpened={isOpened} isAdmin={true} setMenu={setMenu} />
    </div>
  );
}

export const BackButton = ({ handleBack }) => (
  <button
    className="absolute top-8 left-4 bg-accent p-3 rounded-xl transition-all duration-200 hover:brightness-95"
    onClick={handleBack}
  >
    <BiChevronLeft className=" w-5 h-5 stroke-1 text-white" />
  </button>
);

export const CategorieCard = ({ name, image, code, filter, setFilter }) => {
  
  return (
    <button
      className={` ${
        filter === code
          ? "bg-accent text-white"
          : "bg-secondary text-customDark"
      } flex justify-center items-center py-2 px-4 rounded-xl text-xs font-medium   `}
      onClick={() => {
        filter === code ? setFilter("") : setFilter(code);
      }}
    >
      <Image src={image} alt={name} layout="fixed" width={16} height={16} />
      <p className="ml-2">{name}</p>
    </button>
  );
};

export async function getServerSideProps({ req, res }) {

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const { data } = await client.query({
    query: MENU,
    fetchPolicy: "no-cache",
  });

  return {
    props: {
      data: data,
    },
  };
}
