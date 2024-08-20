"use client";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "./loader";

type PreloaderContextType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};
const INITIAL: PreloaderContextType = {
  isLoading: true,
  setIsLoading: () => {},
};
export const preloaderContext = createContext<PreloaderContextType>(INITIAL);

type PreloaderProps = {
  children: ReactNode;
};

export const usePreloader = () => {
  const context = useContext(preloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};
function Preloader({ children }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        // observe: this change has not been observed for errors.
        // window.scrollTo(0, 0);
      }, 2500);
    })();
  }, []);

  return (
    <preloaderContext.Provider value={{ isLoading, setIsLoading }}>
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
      {children}
    </preloaderContext.Provider>
  );
}

export default Preloader;
