import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Bar from "./components/Bar";
import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar";

// Filter Context
import { FilterContextProvider } from "../context/FilterContext";

// Styles
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FilterContextProvider >
      <div className="relative">
        {!router.pathname.includes("/dish/") && (
          <>
            <Bar />
            <SearchBar />
          </>
        )}

        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={router.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>

        {!router.pathname.includes("/dish/") && (
          <Navigation selected={router.pathname} />
        )}
      </div>
    </FilterContextProvider>
  );
}

export default MyApp;
