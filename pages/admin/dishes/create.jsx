import React, { useState } from "react";
import { BiChevronLeft, BiBasket, BiRightArrowCircle } from "react-icons/bi";
import { CREATE_DISH, TYPES } from "../../../queries";

import { useRouter } from "next/router";
import client from "../../../client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Counter from "../../components/Counter";

// React Hook Form
import { useForm } from "react-hook-form";

const ERROR_IMG =
  "https://www.javelingroup.com/wp-content/uploads/2019/05/placeholder-image-300x225.png";

export default function Create({ isOpened, data }) {
  const [source, setSource] = useState(ERROR_IMG);
  const [selected, setSelected] = useState(data.getTypes[0]);

  const router = useRouter();

  const setImage = () => {
    setSource(document.getElementById("image").value);
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

    const { data } = await client
      .mutate({
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
          stimatedTime: parseInt(newProduct.stimatedTime),
        },
      })
      .then(console.log("Created"));
  };

  const handleBack = () => {
    router.back();
  };

  const temp = {
    name: "",
    description: "",
    price: 220,
    image: "",
    type: "",
    slug: "",
    stars: 2.4,
    stimatedTime: 10,
  };

  return (
    <>
      <ToastContainer limit={3} />
      <div
        className={`${
          isOpened && "translate-x-2/3"
        } relative z-40 transition-all duration-300 bg-white `}
      >
        <div className="pt-10 w-full bg-white">
          <div className="relative h-screen bg-white z-40">
            <ToastContainer limit={1} />
            <BackButton handleBack={handleBack} />
            <DishImage image={source} />
            <div className="relative mx-8">
              <input
                id="image"
                type="text"
                placeholder="Image URL"
                className="w-full text-xs text-customDark bg-[#f8f8f8] pr-12 focus:outline-none rounded-xl placeholder:font-medium font-medium py-5 px-6 mt-4"
                {...register("image", {
                  required: true,
                })}
              />
              <button className="absolute right-4 top-8" onClick={setImage}>
                <BiRightArrowCircle
                  aria-label="Set image"
                  className="ml-2 w-5 h-5 text-customDark"
                />
              </button>
            </div>

            <Information data={temp} />
          </div>
        </div>
      </div>
    </>
  );
}

export const BackButton = ({ handleBack }) => (
  <button
    className="fixed top-8 left-4 bg-accent p-3 rounded-xl transition-all duration-200 hover:brightness-95"
    onClick={handleBack}
  >
    <BiChevronLeft className=" w-5 h-5 stroke-1 text-white" />
  </button>
);

export const DishImage = ({ image }) => (
  <div className="pt-24 px-16">
    <img
      src={image}
      alt=""
      onError={(e) => {
        e.target.src = ERROR_IMG;
        toast.error("Image not found", {
          position: "top-right",
          autoClose: 700,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }}
    />
  </div>
);

export const Information = ({ data }) => (
  <>
    <div className="absolute bottom-0 w-screen left-0 h-1/2 bg-customLight rounded-t-xl">
      <div className="w-full h-auto pb-12 flex flex-col items-center text-customDark">
        <div className="bg-accent py-2 px-6 rounded-full text-sm font-semibold text-white -translate-y-5">
          ${data.price.toFixed(2)}
        </div>
        <div className="bg-accent w-10 h-1 mt-1 mb-6 rounded-full"></div>
        <h3 className="text-lg font-semibold">{data.name} </h3>
        <p className="text-center text-sm font-medium mt-4 px-6 ">
          {data.description}
        </p>

        <div className="flex text-sm font-semibold mt-6 items-center">
          <img src="/assets/clock.svg" alt="Timer" className="w-5 h-5 mr-1" />
          <p>
            <span> Time: 0-</span>
            {data.stimatedTime} <span>min</span>
          </p>
        </div>
      </div>
      <BottomOptions data={data} />
    </div>
  </>
);

export const BottomOptions = ({ data }) => {
  const notify = () => {
    toast.info("🍔 added to cart", {
      position: "top-right",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    toast.clearWaitingQueue();
  };

  return (
    <div className="bg-white w-full z-10 flex flex-col items-end py-4 px-8 rounded-t-xl soft-shadow-vertical ">
      <div className="flex items-center w-full justify-between mb-5">
        <Counter />
        <div className="flex space-x-3">
          <Rating stars={data.stars} />
        </div>
      </div>

      <button
        className="bg-accent hover:brightness-105 transition-all duration-200 px-10 py-3 rounded-xl flex items-center text-white font-semibold text-sm"
        onClick={() => {
          notify();
        }}
      >
        Add to card <BiBasket className="ml-2 w-4 h-4" />
      </button>
    </div>
  );
};

export const Rating = ({ stars }) => (
  <div className="flex items-center bg-[#f1f1f1] p-2 px-4 rounded-md">
    <img src="/assets/star.svg" alt="" />
    <p className="text-sm text-customDark font-semibold ml-2"> {stars} </p>
  </div>
);

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
