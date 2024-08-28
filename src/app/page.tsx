"use client";

import React from "react";
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
import Contact from "@/components/sections/contact";

function MainPage() {
  return (
    <>
      <SmoothScroll>
        <main className={cn("bg-slate-100 dark:bg-transparent")}>
          <div className="top-0 z-[0] fixed w-full h-screen">
            <AnimatedBackground />
          </div>
          <section id="hero" className={cn("relative w-full h-screen")}>
            <Hero />
          </section>

          <section
            id="skills"
            className="bg-iblue-400 w-full h-screen md:h-[180dvh]"
          >
            <div className="top-[70px] sticky mb-96">
              <h2
                className={cn(
                  "bg-clip-text text-4xl text-center text-transparent md:text-7xl",
                  "bg-gradient-to-b from-black/80 to-black/50",
                  "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50 "
                )}
              >
                SKILLS
              </h2>
              <p className="mx-auto mt-4 line-clamp-4 max-w-3xl font-normal text-base text-center text-neutral-300">
                (hint: press a key)
              </p>
            </div>
          </section>
          <section
            id="projects"
            className="max-w-7xl mx-auto z-[9999] md:h-[130vh]"
          >
            <h2
              className={cn(
                "bg-clip-text text-4xl text-center text-transparent md:text-7xl",
                "bg-gradient-to-b from-black/80 to-black/50",
                "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50 mb-32"
              )}
            >
              Projects
            </h2>
            <Projects />
          </section>
          <section
            id="contact"
            className="min-h-screen max-w-7xl mx-auto z-[9999]"
          >
            <h2
              className={cn(
                "bg-clip-text text-4xl text-center text-transparent md:text-7xl pt-16",
                "bg-gradient-to-b from-black/80 to-black/50",
                "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50"
              )}
            >
              LET&apos;S WORK <br />
              TOGETHER
            </h2>
            <Contact />
          </section>
        </main>
      </SmoothScroll>
    </>
  );
}

export default MainPage;
