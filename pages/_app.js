import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Bar from "./components/Bar";
import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar";

// Filter Context
import { FilterContextProvider } from "../context/FilterContext";
import { CartContextProvider } from "../context/CartContext";

// Styles
import "../styles/globals.css";
import client from "../client";
import { ApolloProvider } from "@apollo/client";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [isOpened, setIsOpened] = useState(false);

  return (
    <CartContextProvider>
      <RelativeContainer>
        <ApolloProvider client={client}>
          {!router.pathname.includes("/dish/") && (
            <>
              <Bar isOpened={isOpened} setIsOpened={setIsOpened} />
              <SearchBar isOpened={isOpened} />
            </>
          )}
          <FilterContextProvider>
            <Component {...pageProps} isOpened={isOpened} />
          </FilterContextProvider>
          {!router.pathname.includes("/dish/") && (
            <Navigation selected={router.pathname} isOpened={isOpened} />
          )}
        </ApolloProvider>
        <Sidebar isOpened={isOpened} setIsOpened={setIsOpened} />
      </RelativeContainer>
    </CartContextProvider>
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
