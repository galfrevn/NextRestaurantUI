import React, { useState } from "react";
import { BiChevronLeft, BiRightArrowCircle } from "react-icons/bi";
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
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const setImage = () => {
    setSource(document.getElementById("image").value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
  }

  const onSubmit = async (x) => {
    setLoading(true);
    const newProduct = {
      ...x,
      type: selected,
      slug: x.name.toLowerCase().replace(/ /g, "-"),
      stars: getRandomFloat(1, 5, 1),
    };

    await client
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
      .then(() => {
        setLoading(false);
        notify();
        router.push("/admin/dishes");
      });
  };

  const notify = () => {
    toast.success("Dish created successfully", {
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

  const handleBack = () => {
    router.back();
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mx-8">
                <input
                  id="image"
                  type="text"
                  placeholder="Image URL"
                  className="w-full text-xs text-customDark placeholder:text-[#d1d1d1] bg-[#f8f8f8] pr-12 focus:outline-none rounded-xl placeholder:font-medium font-medium py-5 px-6 mt-4"
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

              <div className="text-accent text-[11px] px-10  ">
                {errors.image?.type === "required" && "An Image is required"}
              </div>

              <div className="absolute bottom-0 w-screen left-0 h-auto bg-customLight rounded-t-2xl ">
                <div className="w-full h-auto pb-12 flex px-6 flex-col items-center text-customDark">
                  <div className="bg-accent py-2 px-1 rounded-full text-sm font-semibold text-white -translate-y-5">
                    <input
                      type="number"
                      placeholder="100"
                      className="text-xs text-white  focus:outline-none placeholder:font-medium font-medium placeholder:text-customDark rounded-xl bg-accent w-16 text-center "
                      {...register("price", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="bg-accent w-10 h-1 mt-1 mb-6 rounded-full"></div>
                  <div className="flex flex-col items-start w-full">
                    <input
                      type="text"
                      placeholder="Dish name"
                      className="w-full text-xs text-customDark border-2 border-customLight focus:outline-accent placeholder:font-medium font-medium placeholder:text-[#d1d1d1] rounded-xl py-3 px-6"
                      {...register("name", {
                        required: true,
                      })}
                    />
                    <div className="text-accent text-[11px]  ">
                      {errors.name?.type === "required" && "A name is required"}
                    </div>

                    <textarea
                      rows={3}
                      placeholder="Dish description (at least 10 words)"
                      className="w-full text-xs text-customDark border-2 border-customLight focus:outline-accent placeholder:font-medium font-medium placeholder:text-[#d1d1d1] rounded-xl py-3 mt-2 px-6"
                      {...register("description", {
                        required: true,
                      })}
                    />
                    <div className="text-accent text-[11px]  ">
                      {errors.name?.type === "required" &&
                        "A description is required"}
                    </div>
                  </div>

                  <div className="flex mt-4 w-full">
                    <select
                      onChange={(e) => setSelected(e.target.value)}
                      className="appearance-none text-center focus:outline-accent bg-white py-3 px-5 text-xs font-medium rounded-xl text-customDark"
                    >
                      {data.getTypes.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex text-sm font-semibold mt-6 items-center">
                    <img
                      src="/assets/clock.svg"
                      alt="Timer"
                      className="w-5 h-5 mr-1"
                    />
                    <p>
                      <span> Time: 0-</span>
                      <input
                        type="number"
                        placeholder="10"
                        max={99}
                        className=" text-customDark focus:outline-none placeholder:font-semibold text-sm placeholder:text-sm w-6 placeholder:text-[#d1d1d1] font-semibold rounded-xl bg-customLight text-center "
                        {...register("stimatedTime", {
                          required: true,
                        })}
                      />
                      <span>min</span>
                    </p>
                  </div>
                </div>
                <div className="bg-white w-full z-10 flex flex-col items-end py-4 px-8 rounded-t-xl soft-shadow-vertical ">
                  <button
                    type="submit"
                    className="bg-accent hover:brightness-105 transition-all duration-200 px-10 py-3 rounded-xl flex items-center text-white font-semibold text-sm"
                  >
                    Save and Create{" "}
                    <BiRightArrowCircle className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
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
  <div className="pt-10 px-16">
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
