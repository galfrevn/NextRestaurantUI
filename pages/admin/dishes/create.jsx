import React, { useRef, useState } from "react";
import { BiRightArrowCircle } from "react-icons/bi";
import { CREATE_DISH, TYPES } from "../../../queries";

import client from "../../../client";

// React Hook Form
import { useForm } from "react-hook-form";

const ERROR_IMG =
  "https://www.javelingroup.com/wp-content/uploads/2019/05/placeholder-image-300x225.png";

function Create({ isOpened, data }) {
  const [source, setSource] = useState(ERROR_IMG);
  const [selected, setSelected] = useState(data.getTypes[0]);
  const input = useRef(null);

  const setImage = () => {
    setSource(input.current.value);
  };

  const { register, handleSubmit } = useForm();

  function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
  }

  const onSubmit = async (x) => {
    const newProduct = {
      ...x,
      type: selected,
      slug: x.name.toLowerCase().replace(/ /g, "-"),
      stars: getRandomFloat(1, 5, 1),
    };

    const { data } = await client.mutate({
      mutation: CREATE_DISH,
      fetchPolicy: "no-cache",
      variables: {
        name: newProduct.name,
        description: newProduct.description,
        price: parseInt(newProduct.price),
        image: newProduct.image,
        type: newProduct.type,
        slug: newProduct.slug,
        stars: newProduct.stars,
        stimatedTime: parseInt(newProduct.stimatedTime)
      },
    }).then(console.log("Created"))
  };

  return (
    <div
      className={`${
        isOpened && "translate-x-2/3"
      } relative z-40 transition-all duration-300 bg-white `}
    >
      <div className="px-6 pt-10 pb-24 w-full bg-white">
        <h3 className="text-md font-semibold  text-customDark mb-8">
          Create a dish
        </h3>

        <div className="relative">
          <div className="bg-customLight p-2 rounded-xl">
            <img src={source ? source : ERROR_IMG} alt="" />
          </div>

          <form
            className="flex flex-col items-start justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative w-full">
              <input
                ref={input}
                type="text"
                placeholder="Image URL"
                className="w-full text-xs text-customDark border-2 pr-12 border-customLight focus:outline-accent rounded-xl placeholder:font-medium font-medium py-3 px-6 mt-4"
                {...register("image", {
                  required: true,
                })}
              />
              <button className="absolute right-4 top-7" onClick={setImage}>
                <BiRightArrowCircle
                  aria-label="Set image"
                  className="ml-2 w-5 h-5 text-accent"
                />
              </button>
            </div>

            <input
              type="text"
              placeholder="Dish name"
              className="w-full text-xs text-customDark border-2 border-customLight focus:outline-accent placeholder:font-medium font-medium placeholder:text-customDark rounded-xl py-3 px-6 mt-4"
              {...register("name", {
                required: true,
              })}
            />

            <textarea
              placeholder="Dish description (at least 20 words)"
              className="w-full text-xs text-customDark border-2 border-customLight focus:outline-accent rounded-xl placeholder:font-medium font-medium py-3 px-6 mt-4"
              {...register("description", {
                required: true,
              })}
            />

            <div className="flex justify-between space-x-3">
              <input
                type="number"
                placeholder="Dish price"
                className="w-1/3 text-xs text-customDark border-2 border-customLight focus:outline-accent placeholder:font-medium font-medium placeholder:text-customDark rounded-xl py-3 px-6 mt-4"
                {...register("price", {
                  required: true,
                })}
              />

              <input
                type="number"
                placeholder="Stimated cooking time"
                className="w-2/3 text-xs text-customDark border-2 border-customLight focus:outline-accent placeholder:font-medium font-medium placeholder:text-customDark rounded-xl py-3 px-6 mt-4"
                {...register("stimatedTime", {
                  required: true,
                })}
              />
            </div>

            <div className="flex mt-4 w-full">
              <select
                onChange={(e) => setSelected(e.target.value)}
                className="appearance-none text-center focus:outline-accent bg-customLight py-3 px-5 text-xs font-medium rounded-xl text-customDark"
              >
                {data.getTypes.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-customGreen mt-8 w-full justify-center hover:brightness-105 transition-all duration-200 px-10 py-3 rounded-xl flex items-center text-white font-semibold text-sm"
            >
              Create now <BiRightArrowCircle className="ml-2 w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;

export async function getStaticProps() {
  const { data } = await client.query({
    query: TYPES,
    fetchPolicy: "no-cache",
  });

  return {
    props: {
      data: data,
    },
  };
}
