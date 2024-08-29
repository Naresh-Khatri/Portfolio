"use client";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const NyanCat = () => {
  
  const imgRef = useRef(null);
  const timeline = useRef<gsap.core.Timeline>();

  useEffect(() => {
    const animateImage = () => {
      const randY = `${Math.random() * 100}vh`;
      return gsap.fromTo(
        imgRef.current,
        { x: "-30vw", y: randY },
        { x: "130vw", y: randY, duration: 8, ease: "linear" }
      );
    };

    timeline.current = gsap.timeline({ repeat: -1, delay: 2 });
    timeline.current.add(animateImage(), "+=2");

    return () => {
      timeline.current?.kill();
    };
  }, [imgRef]);
  const toggleAnimation = () => {
    console.log("clicked");
    if (timeline.current?.paused()) {
      timeline.current?.play();
    } else timeline.current?.pause();
  };
  return (
    <Image
      onClick={toggleAnimation}
      ref={imgRef}
      src="/assets/nyan-cat.gif"
      className={cn("fixed z-10")}
      alt="Nyan Cat"
      width={400}
      height={400}
    />
  );
};

export default NyanCat;
