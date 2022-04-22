import React, { useMemo, useRef, useState } from "react";

import { BiSearchAlt } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { BLACK_LIST } from "../utils/index";

import { createAutocomplete } from "@algolia/autocomplete-core";

function SearchBar({ isOpened }, props) {
  const router = useRouter();

  const [autocompleteState, setAutocompleteState] = useState({
    collection: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Search here",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "backend",
            getItems: async ({ query }) => {
              return fetch(
                `https://restaurant-graphql-backend.herokuapp.com/`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    query: `
                    query Query($search: String) {
                      searchFoods(search: $search) {
                        name
                        type
                        price
                        description
                        slug
                        stimatedTime
                        image
                        stars
                      }
                    }
                  `,
                    variables: {
                      search: query,
                    },
                  }),
                }
              ).then((res) => res.json());
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: formRef.current,
  });

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <>
      {!BLACK_LIST.includes(router.pathname) && (
        <div
          className={` ${
            isOpened && "translate-x-2/3"
          } relative z-40 transition-all duration-300 flex bg-white items-center justify-between px-5`}
        >
          <form className="relative w-full" {...formProps}>
            <input
              {...inputProps}
              type="text"
              className="border-[1px] border-customDark w-full pl-6 pr-14 py-4 text-customDark rounded-xl text-xs font-medium focus:outline-none"
            />
            <BiSearchAlt className="absolute right-4 top-3.5 w-5 h-5 text-customDark " />
            {autocompleteState.isOpen && (
              <div
                className="bg-secondary rounded-b-lg shadow-lg w-full h-full z-50 text-sm text-customDark py-2 -translate-y-3 border-[1px] border-t-0 border-customDark"
                ref={panelRef}
                {...autocomplete.getPanelProps()}
              >
                {autocompleteState.collections.map((collection, index) => {
                  const { items } = collection;

                  return (
                    <div key={index}>
                      {items.length > 0 && (
                        <ul {...autocomplete.getListProps()}>
                          {items[0].data.searchFoods.map((item) => (
                            <AutocompleteItem key={item.slug} {...item} />
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default SearchBar;

const AutocompleteItem = ({ slug, name, image }) => {
  return (
    <li className="py-1.5 hover:bg-customLight bg-secondary  px-3 ">
      <Link href={`/dish/${slug}`} passHref={false}>
        <div className="flex items-center">
          <Image src={image} alt={name} layout="fixed" width={40} height={30} />
          <p className="ml-2">{name}</p>
        </div>
      </Link>
    </li>
  );
};
