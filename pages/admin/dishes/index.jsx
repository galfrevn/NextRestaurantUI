import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import client from "../../../client";
import { MENU } from "../../../queries";

import Image from 'next/image'
import dynamic from 'next/dynamic'

const Menu = dynamic(() => import("../../../components/Menu"));

const OPTIONS = [
  {
    name: "Create a dish",
    slug: "create",
    image: "/assets/business/svg/analysis-5039.svg",
    color: "#0ccb86",
    description: "Fill a form to create a new dish",
  },
  {
    name: "Modify a dish",
    slug: "interactions",
    image: "/assets/business/svg/contribute-5068.svg",
    color: "#fc2f5e",
    description: "Modify the properties of a dish",
  },
  {
    name: "Delete a dish",
    slug: "delete",
    image: "/assets/business/svg/business-5033.svg",
    color: "#1bcfdb",
    description: "Delete a disgusting dish",
  },
];

export default function Dishes({ isOpened, data }) {
  const mainMenu = data.foods;

  return (
    <div className="h-[80vh]">
      <div
        className={`${
          isOpened && "translate-x-2/3"
        } relative z-40 transition-all duration-300 bg-white `}
      >
        <div className="px-6 py-10 w-full bg-white">
          <h3 className="text-md font-semibold  text-customDark mb-8">
            Manage dishes
          </h3>
          <MenuOption item={OPTIONS[0]} delay={0} key={0} />
          <MenuOption item={OPTIONS[1]} delay={1} key={1} />
          <MenuOption item={OPTIONS[2]} delay={2} key={2} />
        </div>
      </div>
      <div>
        <Menu data={mainMenu} isOpened={isOpened} />
      </div>
    </div>
  );
}

export const MenuOption = ({ item, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0, transition: { delay: 0.05 * delay } }}
      className="w-full p-2  soft-shadow relative rounded-lg mb-4"
      style={{ backgroundColor: item.color }}
    >
      <Link href={`dishes/${item.slug}`} passHref={false}>
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
            <p className="text-xs">{item.description} </p>
          </div>
        </div>
      </Link>
    </motion.div>
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
