import React, { useState } from "react";
import { BiChevronLeft, BiRightArrowCircle } from "react-icons/bi";
import { CREATE_DISH, TYPES } from "../../../queries";

import { useRouter } from "next/router";
import Image from "next/image";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// React Hook Form
import { useForm } from "react-hook-form";
import client from "../../../client";
import { gql, useMutation } from "@apollo/client";

const ERROR_IMG =
  "https://www.javelingroup.com/wp-content/uploads/2019/05/placeholder-image-300x225.png";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

export default function Create({ isOpened, data }) {
  const [selected, setSelected] = useState(data.getTypes[0]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleBack = () => {
    router.back();
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

  const onSubmit = async (e) => {
    setLoading(true);
    const newProduct = {
      ...e,
      type: selected,
      slug: e.name.toLowerCase().replace(/ /g, "-"),
      stars: getRandomFloat(1, 5, 1),
    };

    const { data } = await client.mutate({
      mutation: UPLOAD_FILE,
      variables: {
        file: e.image[0],
      },
    });
    const imageUrl = data.uploadFile.url;

    await client
      .mutate({
        mutation: CREATE_DISH,
        fetchPolicy: "no-cache",
        variables: {
          name: newProduct.name,
          description: newProduct.description,
          price: parseInt(newProduct.price),
          image: imageUrl,
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

  return (
    <>
      <ToastContainer limit={3} />
      <div
        className={`${
          isOpened && "translate-x-2/3"
        } relative z-40 transition-all duration-300 bg-customLight `}
      >
        <div className="relative h-screen bg-white z-40">
          <BackButton handleBack={handleBack} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-customLight h-screen">
              <div className="w-full pt-32 flex px-6 flex-col items-center text-customDark">
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

                  <input
                    type="number"
                    placeholder="Dish price"
                    className="text-xs text-white focus:outline-none placeholder:font-medium py-2 px-4 w-1/3 font-medium placeholder:text-customDark rounded-lg bg-accent text-center mt-2"
                    {...register("price", {
                      required: true,
                    })}
                  />
                  <div className="text-accent text-[11px]  ">
                    {errors.price?.type === "required" && "A price is required"}
                  </div>

                  <input
                    id="image"
                    type="file"
                    placeholder="Image URL"
                    className="w-full text-xs text-customDark border-2 border-customLight focus:outline-accent placeholder:font-medium font-medium placeholder:text-[#d1d1d1] rounded-xl py-3 px-6 mt-2"
                    {...register("image", {
                      required: true,
                    })}
                  />
                  <div className="text-accent text-[11px]">
                    {errors.image?.type === "required" &&
                      "An Image is required"}
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
                    {errors.description?.type === "required" &&
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
                  <Image
                    src="/assets/clock.svg"
                    alt="Timer"
                    layout="fixed"
                    width={20}
                    height={20}
                  />
                  <p className="ml-1">
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
              <div className="w-full z-10 flex flex-col items-end py-4 px-4 rounded-t-xl soft-shadow-vertical absolute bottom-0">
                <button
                  disabled={loading ? true : false}
                  type="submit"
                  className="bg-accent hover:brightness-105 transition-all duration-200 px-10 py-3 rounded-xl flex items-center text-white font-semibold text-sm"
                >
                  Save and Create
                  <BiRightArrowCircle className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
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

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
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
