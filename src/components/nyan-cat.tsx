"use client";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  animate,
  useAnimationControls,
} from "framer-motion";

const getRandomHeight = () => {
  return `${Math.random() * 100}vh`;
};

const NyanCat = () => {
  const [divs, setDivs] = useState<
    {
      id: string;
    }[]
  >([]);

  // const spawnDiv = () => {
  //   const newDiv = {
  //     id: (Math.random() * 100).toFixed(0),
  //     controls: useAnimation(), // Initialize useAnimation outside the loop or condition
  //   };
  //   setDivs((prevDivs) => [...prevDivs, newDiv]);

  //   // Start the animation when the div is spawned
  //   newDiv.controls.start({
  //     x: "100vw",
  //     transition: { duration: 5, ease: "linear" },
  //   });
  // };

  const spawnDiv = () => {
    const newDiv = {
      id: (Math.random() + 10000).toFixed(),
    };
    setDivs((prevDivs) => [...prevDivs, newDiv]);
    // const t = setTimeout(() => {
    //   setDivs((prevDivs) => prevDivs.filter((div) => div.id !== newDiv.id));
    //   clearTimeout(t);
    // }, 8000);
    // [i want you to test out something ](https://jazz-gen.vercel.app/)
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "n") spawnDiv();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  // useEffect(() => {
  //   const animateImage = () => {
  //     return gsap.fromTo(
  //       imgRef.current,
  //       { x: "-30vw" },
  //       { x: "130vw", duration: 8, ease: "linear" }
  //     );
  //   };

  //   timeline.current = gsap.timeline({
  //     repeat: -1,
  //     delay: 2,
  //     onRepeat: () => {
  //       const randY = getRandomHeight();
  //       console.log(randY);
  //       gsap.set(imgRef.current, { y: randY });
  //     },
  //   });
  //   timeline.current.add(animateImage(), "+=2");

  //   return () => {
  //     timeline.current?.kill();
  //   };
  // }, [imgRef]);
  // const toggleAnimation = () => {
  //   console.log("clicked");
  //   if (timeline.current?.paused()) {
  //     timeline.current?.play();
  //   } else timeline.current?.pause();
  // };
  return (
    <div className="fixed left-0 top-0 w-screen h-screen overflow-hidden">
      <AnimatePresence>
        {divs.length > 0 && (
          <div className="fixed w-screen flex left-0 top-16">{divs.length}</div>
        )}
      </AnimatePresence>
      {divs.map((div) => (
        <AnimatedDiv
          key={div.id}
          id={div.id}
          onClick={() => console.log("clicked")}
          onCompleted={() => setDivs(divs.filter((d) => d.id !== div.id))}
        />
      ))}
      <pre>{divs.length}</pre>
    </div>
  );
};

const AnimatedDiv = ({
  id,
  onClick,
  onCompleted,
}: {
  id: string;
  onClick: () => void;
  onCompleted: () => void;
}) => {
  // const controls = useAnimationControls();
  const randY = getRandomHeight();
  const [x, setX] = useState(0)

  const control = animate(x, 100, {
    duration: 5,
    ease: "linear",
    repeat: -1,
  });
  const controls = useAnimationControls();
  // const imgRef = useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    controls.start({
      x: "100vw",
      y: randY,
      transition: { duration: 5, ease: "linear" },
    });
  }, [controls]);

  const handlePause = () => {
    // controls.stop(); // Pause the animation when clicked
    // pause animation
    onClick();
  };

  return (
    <motion.div
      key={id}
      initial={{ x: "-20vw", y: randY }}
      animate={controls}
      onAnimationComplete={onCompleted}
      onClick={handlePause}
    >
      <img
        // onClick={toggleAnimation}
        // ref={imgRef}
        src="/assets/nyan-cat.gif"
        className={cn("fixed z-10 h-40 w-auto")}
        alt="Nyan Cat"
      />
    </motion.div>
  );
};

export default NyanCat;
