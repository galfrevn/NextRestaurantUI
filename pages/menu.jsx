import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import { motion } from "framer-motion";
import Link from "next/link";

const IMAGES = [
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/pizza-banner-design-template-5623a47ee70d2ca4f3a4eca9c19a8039_screen.jpg?ts=1572691129",
  "https://coca-colaentucasa.com/wp-content/uploads/2021/07/BANNER-KAIZEN-4_0.jpg",
  "https://i.pinimg.com/736x/b5/96/f8/b596f869ab2c23ded48a377e3ba083a4.jpg",
  "https://www.bizadmark.com/wp-content/uploads/2021/08/fast-food-ads-7-1024x657.jpeg",
  "https://www.bizadmark.com/wp-content/uploads/2021/01/example-5-1.jpg",
  "https://i.pinimg.com/originals/76/ab/66/76ab66a5e774d4deaf21ce7c02806a32.jpg",
  "https://i.pinimg.com/originals/7c/0e/93/7c0e939b6a27ac56a369e6eef9dcca44.jpg",
];

export default function menu({ isOpened }) {
  return (
    <>
      <div
        className={`${
          isOpened && "translate-x-2/3"
        } transition-all duration-300 bg-white p-6 relative z-40 flex items-center justify-between`}
      >
        <p className="text-sm font-semibold pt-2 text-customDark">
          Special oferts
        </p>
      </div>
      <div
        className={`${
          isOpened && "translate-x-2/3"
        } transition-all duration-300 pt-8 px-6 pb-20 space-y-5 relative z-40 bg-white`}
      >
        {IMAGES.map((image, index) => (
          <motion.img
            initial={{ y: 20, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.05 * index },
            }}
            viewport={{ once: true }}
            src={image}
            alt="Food Banner"
            key={index}
            className="rounded-xl soft-shadow"
          />
        ))}
      </div>
    </>
  );
}
