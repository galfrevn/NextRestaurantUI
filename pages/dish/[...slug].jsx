import React from "react";
import { useRouter } from "next/router";
import { BiBasket, BiChevronLeft, BiHeart } from "react-icons/bi";
import Counter from "../components/Counter";

import { PATHS } from "../../queries";
import client from "../../client";
import { gql } from "@apollo/client";

export default function Dish({ findFood }) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  console.log(findFood);

  return (
    <div className="relative h-screen">
      <BackButton handleBack={handleBack} />
      <DishImage image={findFood.image} />
      <Information data={findFood} />
      
    </div>
  );
}

export const BackButton = ({ handleBack }) => (
  <button
    className="fixed top-8 left-4 bg-customLight p-3 rounded-xl transition-all duration-200 hover:brightness-95"
    onClick={handleBack}
  >
    <BiChevronLeft className="text-customDark w-5 h-5" />
  </button>
);

export const DishImage = ({ image }) => (
  <div className="pt-24 px-16 ">
    <img src={image} alt="" />
  </div>
);

export const Information = ({data}) => (
  <>
    <div className="absolute bottom-0 w-screen left-0 h-1/2 bg-customLight rounded-t-xl">
      <div className="w-full h-auto pb-12 px-8 flex flex-col items-center text-customDark">
        <div className="bg-accent py-2 px-6 rounded-full text-sm font-semibold text-white -translate-y-5">
          ${data.price.toFixed(2)}
        </div>
        <div className="bg-accent w-10 h-1 mt-1 mb-6 rounded-full"></div>
        <h3 className="text-lg font-semibold">{data.name} </h3>
        <p className="text-center text-sm font-medium mt-4 px-6 ">
          {data.description}
        </p>

        <div className="flex text-sm font-semibold mt-6 items-center">
          <img src="../assets/clock.svg" alt="Timer" className="w-5 h-5 mr-1" />
          <p><span> Time: 0-</span>{data.stimatedTime} <span>min</span></p>
        </div>
      </div>
      <BottomOptions stars={data.stars} />
    </div>
  </>
);

export const BottomOptions = ({stars}) => (
  <div className="bg-white w-full z-10 flex flex-col items-end py-4 px-8 rounded-t-xl soft-shadow-vertical ">
    <div className="flex items-center w-full justify-between mb-5">
      <Counter />
      <div className="flex space-x-3">
        <FavButton />
        <Rating stars={stars} />
      </div>
    </div>

    <button className="bg-accent hover:brightness-105 transition-all duration-200 px-10 py-3 rounded-xl flex items-center text-white font-semibold text-sm">
      Add to card <BiBasket className="ml-2 w-4 h-4" />
    </button>
  </div>
);

export const FavButton = () => (
  <button className="rounded-md flex items-center justify-center h-10 w-10 bg-[#f1f1f1] text-customDark font-semibold">
    <BiHeart className="w-5 h-5" />
  </button>
);

export const Rating = ({ stars }) => (
  <div className="flex items-center bg-[#f1f1f1] p-2 px-4 rounded-md">
    <img src="../assets/star.svg" alt="" />
    <p className="text-sm text-customDark font-semibold ml-2"> {stars} </p>
  </div>
);

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        foods {
          slug
        }
      }
    `,
  });
  const { foods } = data;
  const paths = foods.map((food) => ({
    params: { slug: [food.slug] },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug[0];

  const { data } = await client.query({
    query: gql`
      query Foods($slug: String!) {
        findFood(slug: $slug) {
          name
          description
          price
          type
          image
          stimatedTime
          stars
        }
      }
    `,
    fetchPolicy: "no-cache",
    variables: { slug },
  });

  const { findFood } = data;

  return {
    props: {
      findFood
    },
    revalidate: 30,
  };
}
