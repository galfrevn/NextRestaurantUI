import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import client from "../../client";
import { DELETE_DISH } from "../../queries";

export default function AdminCard({
  delay,
  name,
  slug,
  image,
  style,
  description,
  price,
  data,
  setMenu,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id) => {
    setIsOpen(true);
    console.log("Modal " + id);
  };

  const deleteDish = (id) => {
    client
      .mutate({
        mutation: DELETE_DISH,
        variables: { id },
      })
      .then((res) => {
        setMenu(data.filter((dish) => dish.slug !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {style === "grid" ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.05 * delay },
            }}
            viewport={{ once: true }}
          >
            <div
              onClick={() => !isOpen && handleDelete(slug)}
              className="bg-white rounded-xl p-4 flex flex-col relative items-center text-center soft-shadow-red"
            >
              <div className="absolute z-20 left-0 top-0 w-full h-full rounded-xl"></div>
              {isOpen ? (
                <div className="absolute top-0 left-0 w-full h-full flex-col rounded-xl z-20 flex items-center justify-center bg-[rgba(0,0,0,.2)] backdrop-blur-sm text-[#fff5f5] text-sm font-semibold">
                  <p>Are you sure?</p>
                  <button
                    onClick={() => deleteDish(slug)}
                    className="bg-[#d82c2c] text-xs font-medium px-5 py-2 mt-6 rounded-lg"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-white text-customDark mt-2 text-xs font-medium px-5 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="absolute top-14 left-[3.2rem] rounded-xl p-2 backdrop-blur-sm text-[#fff5f5] text-sm font-semibold">
                  Delete
                </div>
              )}

              <div className="bg-[#ffdddd2c] p-2 rounded-xl">
                <img src={image} alt={name} className="" />
              </div>
              <div className="bg-[#ff3e3e] w-10 h-1 mt-5 rounded-full"></div>
              <div className="mt-4 text-xs font-semibold text-customDark ">
                {name}
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.05 * delay },
          }}
          viewport={{ once: true }}
          className="w-full p-2 flex items-center soft-shadow-red relative bg-white rounded-lg mb-4"
          onClick={() => !isOpen && handleDelete(slug)}
        >
          <div className="absolute z-20 left-0 top-0 w-full h-full rounded-xl"></div>
          {isOpen ? (
            <div className="absolute top-0 left-0 w-full h-full rounded-xl z-20 flex items-center justify-center bg-[rgba(0,0,0,.2)] backdrop-blur-sm text-[#fff5f5] text-sm font-semibold">
              <p>Are you sure?</p>
              <button
                onClick={() => deleteDish(slug)}
                className="bg-[#d82c2c] text-xs font-medium px-5 ml-6 py-2 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-white text-customDark text-xs font-medium px-5 ml-2 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="absolute top-8 left-6 rounded-xl p-2 backdrop-blur-sm text-[#fff5f5] text-sm font-semibold">
              Delete
            </div>
          )}
          <img
            src={image}
            alt={name}
            className="w-24 h-[5rem] bg-[#ffdddd2c] p-1.5 rounded-lg mr-4"
          />

          <div className="text-customDark">
            <h3 className="font-semibold text-sm ">{name} </h3>

            <p className="text-[10px] text-[#999]">
              {description.match(/\b(\w+\W+)/g).slice(0, 4)}...
            </p>
            <p className="text-xs font-medium bg-[#d82c2c] p-1 rounded-lg text-white flex items-center justify-center w-12 mt-2">
              ${price}
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
