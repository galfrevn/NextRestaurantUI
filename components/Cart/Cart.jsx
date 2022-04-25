import React, { useEffect, useState } from "react";
import client from "../../client";
import { FOODS_BY_SLUG } from "../../queries";
import Link from "next/link";
import { BiX } from "react-icons/bi";
import { motion } from "framer-motion";

export default function Cart() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (JSON.parse(localStorage.getItem("cartItems")) || [].length  > 0) {
        const { data } = await client.query({
          query: FOODS_BY_SLUG,
          variables: { slug: JSON.parse(localStorage.getItem("cartItems")) },
          fetchPolicy: "no-cache",
        });
        setMenu(data.foodsBySlug);
      } else {
        setMenu([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [update]);

  return (
    <>
      <div className="px-6 py-10 w-full bg-white">
        <h3 className="text-md font-semibold  text-customDark mb-8">
          Your cart
        </h3>
        {loading ? (
          <LoadingText />
        ) : menu.length > 0 ? (
          <div className="bg-white h-screen">
            {menu.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                delay={index}
                update={update}
                setUpdate={setUpdate}
              />
            ))}
            <div className="bg-accent w-full py-4 px-6 text-sm rounded-xl flex items-center justify-between text-white font-semibold">
              <p>Total: </p>
              <p>
                $
                {menu.reduce((acc, item) => {
                  return acc + item.price;
                }, 0)}
                .00
              </p>
            </div>
          </div>
        ) : (
          <NoItems />
        )}
      </div>
    </>
  );
}

export const NoItems = () => {
  return (
    <div className="h-[70vh] w-full flex items-center justify-center flex-col text-xs ">
      <p className="text-customDark font-semibold">No items in cart :(</p>
      <Link href={"/"} passHref>
        <button className="py-3 px-8 bg-accent text-white rounded-md font-semibold mt-4">
          Discover the menu
        </button>
      </Link>
    </div>
  );
};

export const LoadingText = () => {
  return (
    <div className="h-[60vh] w-full flex items-center justify-center flex-col text-xs ">
      <p className="text-customDark font-semibold">Loading</p>
    </div>
  );
};

export const CartItem = ({ item, delay, update, setUpdate }) => {
  const handleDelete = () => {
    const newCartItems = JSON.parse(localStorage.getItem("cartItems")).filter(
      (i) => i !== item.slug
    );
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setUpdate(update + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { delay: 0.05 * delay } }}
      className="w-full p-2 flex items-center border-[1px] border-[#e2d09c] relative bg-white rounded-lg mb-4"
    >
      <Link href={`dish/${item.slug}`}>
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-[5rem] bg-customLight p-1.5 rounded-lg mr-4"
        />
      </Link>
      <div className="text-customDark">
        <Link href={`dish/${item.slug}`}>
          <h3 className="font-semibold text-sm ">{item.name} </h3>
        </Link>

        <p className="text-xs text-[#999]">
          {item.description.match(/\b(\w+\W+)/g).slice(0, 5)}...
        </p>
        <p className="text-xs font-medium bg-accent p-1 rounded-lg text-white flex items-center justify-center w-12 mt-2">
          ${item.price}
        </p>
      </div>

      <button
        className="absolute right-2 bottom-2"
        onClick={() => {
          handleDelete();
        }}
      >
        <BiX size={18} color="#BD0000" />
      </button>
    </motion.div>
  );
};
