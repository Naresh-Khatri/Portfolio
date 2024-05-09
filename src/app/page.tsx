"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

import { FaFile, FaGithub, FaLinkedin } from "react-icons/fa6";

function MainPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black overflow-x-hidden">
      {/* <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-301/0 via-zinc-300/50 to-zinc-300/0" /> */}
      <h1 className="z-10 font-thin text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-4xl md:text-7xl whitespace-nowrap bg-clip-text ">
        Hi, I am <br className="md:hidden"/> Naresh Khatri 
      </h1>
      {/* <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" /> */}
      <h1 className="z-10 mt-4 font-thin text-xl text-transparent duration-1000 bg-zinc-400 cursor-default text-edge-outline animate-title font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text ">
        A Full Stack Web Developer
      </h1>

      <div className="my-16 text-center animate-fade-in gap-3 flex justify-around">
        <Link
          href={
            "https://drive.google.com/file/d/12cV9lMDqK5VxnMu2NxpdQt4WIOB-spaZ/view"
          }
        >
          <Button onClick={() => console.log("hello")}>
            <div className="flex gap-2">
              <FaFile size={24} /> Resume
            </div>
          </Button>
        </Link>
        <Link href={"https://github.com/Naresh-Khatri"}>
          <Button>
            <FaGithub size={24} />
          </Button>
        </Link>
        <Link href={"https://www.linkedin.com/in/naresh-khatri/"}>
          <Button>
            <FaLinkedin size={24} />
          </Button>
        </Link>
      </div>
      {/* <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          I'm building{" "}
          <Link
            target="_blank"
            href="https://unkey.dev"
            className="underline duration-500 hover:text-zinc-300"
          >
            unkey.dev
          </Link>{" "}
          to solve API authentication and authorization for developers.
        </h2>
      </div> */}
    </div>
  );
}

export default MainPage;
