'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Loader from './loader';

function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        // observe: this change has not been observed for errors.
        // window.scrollTo(0, 0);
      }, 2500);
    })();
  }, []);

  return (
    <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
  );
}

export default Preloader;