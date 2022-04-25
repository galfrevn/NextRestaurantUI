import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Bar from "../components/Bar";
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";

// Styles
import "../styles/globals.css";
import { useState } from "react";
import Head from "next/head";

import dynamic from "next/dynamic";

const DynamicSidebar = dynamic(() => import("../components/Sidebar"), {
  loading: () => <p>...</p>,
});

function MyApp({ Component, pageProps }) {
  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Home | VNRestaurant</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="VNRestaurant is the best place to find awesome dishes in Argentina | Made by Galfré Valentín"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://vnrestaurant.netlify.app" />
        <meta name="twitter:title" content="VNRestaurant | Online restaurant" />
        <meta
          name="twitter:description"
          content="VNRestaurant is the best place to find awesome dishes in Argentina | Made by Galfré Valentín"
        />
        <meta name="twitter:creator" content="@ValentinGalfre" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="VNRestaurant | Online restaurant" />
        <meta
          property="og:description"
          content="VNRestaurant is the best place to find awesome dishes in Argentina | Made by Galfré Valentín"
        />
        <meta property="og:site_name" content="VNRestaurant" />
        <meta property="og:url" content="https://vnrestaurant.netlify.app" />
      </Head>

      <RelativeContainer>
        <DynamicSidebar isOpened={isOpened} setIsOpened={setIsOpened} />
        <Bar isOpened={isOpened} setIsOpened={setIsOpened} />

        <SearchBar isOpened={isOpened} />
        <Component {...pageProps} isOpened={isOpened} />

        <Navigation selected={router.pathname} isOpened={isOpened} />
      </RelativeContainer>
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
