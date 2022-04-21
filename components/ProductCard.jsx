import Link from "next/link";
import React from "react";
import Image from 'next/image'

import { motion } from "framer-motion";

export default function ProductCard({
  delay,
  name,
  slug,
  image,
  style,
  description,
  price,
}) {
  return (
    <>
      {style === "grid" ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: { delay: 0.05 * delay },
          }}
          viewport={{ once: true }}
        >
          <Link href={"/dish/" + slug}>
            <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center soft-shadow">
              <div className="bg-customLight p-2 rounded-xl">
                <img src={image} alt={name} />
              </div>
              <div className="bg-accent w-10 h-1 mt-5 rounded-full"></div>
              <div className="mt-4 text-xs font-semibold text-customDark ">
                {name}
              </div>
            </div>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.05 * delay },
          }}
          viewport={{ once: true }}
          className="w-full p-2 flex items-center soft-shadow relative bg-white rounded-lg mb-4"
        >
          <Link href={`dish/${slug}`}>
            <img
              src={image}
              alt={name}
              className="w-24 h-[5rem] bg-customLight p-1.5 rounded-lg mr-4"
            />
          </Link>
          <div className="text-customDark">
            <Link href={`dish/${slug}`}>
              <h3 className="font-semibold text-sm ">{name} </h3>
            </Link>

            <p className="text-[10px] text-[#999]">
              {description.match(/\b(\w+\W+)/g).slice(0, 4)}...
            </p>
            <p className="text-xs font-medium bg-accent p-1 rounded-lg text-white flex items-center justify-center w-12 mt-2">
              ${price}
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
