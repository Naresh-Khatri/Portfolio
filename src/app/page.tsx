"use client";

import React, { useState } from "react";
import Link from "next/link";
import SmoothScroll from "@/components/smooth-scroll";
import Preloader from "@/components/preloader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import About from "@/app/about/page";
import Projects from "@/components/sections/projects";
import Hero from "@/components/sections/hero";
import AnimatedBackground from "@/components/animated-background";
import Footer from "@/components/footer/footer";

function MainPage() {
  return (
    <>
      <SmoothScroll>
        <Preloader />
        <main
          // style={{ height: "100dvh", width: "100dvw" }}
          className={cn("bg-slate-100 dark:bg-transparent")}
        >
          <div className="top-0 z-[0] fixed w-screen h-screen">
            <AnimatedBackground />
          </div>
          <section id="section-0" className={cn("relative w-screen h-screen")}>
            <Hero />
          </section>

          {/* <section id="section-1" className="z-[100] bg-blue-400 h-[200vh]">
            <h1 className="top-[50px] sticky text-8xl text-center"> hello</h1>
          </section> */}
          <section id="skills" className="bg-iblue-400 w-screen h-[200dvh]">
            <div className="top-[70px] sticky">
              <h2 className="bg-clip-text bg-gradient-to-b from-white/80 to-white/20 bg-opacity-50 text-4xl text-center text-transparent md:text-7xl">
                SKILLS
              </h2>
              <p className="mx-auto mt-4 line-clamp-4 max-w-3xl font-normal text-base text-center text-neutral-300">
                (hint: press a key)
              </p>
            </div>
            {/* hello */}
          </section>
          <section id="projects" className="min-h-screen z-[9999]">
            <h2 className="bg-clip-text bg-gradient-to-b from-white/80 to-white/20 bg-opacity-50 text-4xl text-center text-transparent md:text-7xl">
              Projects
            </h2>
            <Projects />
          </section>
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}

export default MainPage;
