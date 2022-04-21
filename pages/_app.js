import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Bar from "../components/Bar";
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";

// Filter Context
import { FilterContextProvider } from "../context/FilterContext";
import { CartContextProvider } from "../context/CartContext";

// Styles
import "../styles/globals.css";
import client from "../client";
import { ApolloProvider } from "@apollo/client";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          Home | VNRestaurant
        </title>
        <meta
          name="description"
          content="VNRestaurant is the best place to find awesome dishes in Argentina | Made by Galfré Valentín"
        />
      </Head>
      <CartContextProvider>
        <RelativeContainer>
          <ApolloProvider client={client}>
            <Bar isOpened={isOpened} setIsOpened={setIsOpened} />
            <SearchBar isOpened={isOpened} />

            <FilterContextProvider>
              <Component {...pageProps} isOpened={isOpened} />
            </FilterContextProvider>

            <Navigation selected={router.pathname} isOpened={isOpened} />
          </ApolloProvider>
          <Sidebar isOpened={isOpened} setIsOpened={setIsOpened} />
        </RelativeContainer>
      </CartContextProvider>
    </>
  );
}

export default MyApp;

export const RelativeContainer = ({ children }) => {
  const router = useRouter();

  return (
    <div className="relative h-screen bg-accent overflow-x-hidden">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-40"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
