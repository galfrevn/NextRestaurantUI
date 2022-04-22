import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import Image from 'next/image'

const OPTIONS = [
  {
    name: "Dashboard",
    slug: "dashboard",
    image: "/assets/business/svg/analysis-5039.svg",
    color: "#0ccb86",
    description: "Take a general look"
  },
  {
    name: "Dishes",
    slug: "dishes",
    image: "/assets/business/svg/business-5033.svg",
    color: "#1bcfdb",
    description: "Manage the dishes that are shown"
  },
  {
    name: "Interactions",
    slug: "interactions",
    image: "/assets/business/svg/contribute-5068.svg",
    color: "#fc2f5e",
    description: "Discover how the people uses the app"
  },
  {
    name: "Coming soon",
    slug: "",
    image: "/assets/business/svg/brain-5041.svg",
    color: "#ffa300",
    description: "More funtionalities will be added :)"
  },
];

function Admin({ isOpened }) {
  return (
    <div
      className={`${
        isOpened && "translate-x-2/3"
      } relative z-40 transition-all duration-300 bg-white h-[80vh]`}
    >
      <div className="px-6 py-10 w-full bg-white">
        <h3 className="text-md font-semibold  text-customDark mb-8">
          Admin menu
        </h3>
        {OPTIONS.map((item, index) => (
          <MenuOption item={item} delay={index} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Admin;

export const MenuOption = ({ item, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { delay: 0.05 * delay } }}
      className="w-full p-2  soft-shadow relative rounded-lg mb-4"
      style={{ backgroundColor: item.color }}
    >
      <Link href={`admin/${item.slug}`} passHref={false} >
        <div className="flex items-center">
          <Image
            src={item.image}
            alt={item.name}
            layout="fixed"
            width={80}
            height={80}
            className="p-1.5 rounded-lg"
          />
          <div className="text-white flex flex-col ml-4">
            <h3 className="font-semibold text-sm ">{item.name} </h3>
            <p className="text-xs" >{item.description} </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
