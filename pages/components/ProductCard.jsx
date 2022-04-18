import Link from "next/link";
import React from "react";

import { motion } from "framer-motion";

export default function ProductCard({ delay, name, slug, image }) {

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { delay: 0.05 * delay } }}
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
  );
}
