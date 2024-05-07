"use client";
import React from "react";

import Particles from "../Particles";
import Link from "next/link";
import Button from "./Button";
import { FaFile, FaGithub, FaLinkedin } from "react-icons/fa6";
const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

function MainPage() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav> */}
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      {/* <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-301/0 via-zinc-300/50 to-zinc-300/0" /> */}
      <h1 className="z-10 font-thin text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-4xl md:text-7xl whitespace-nowrap bg-clip-text ">
        Hi, I am big chungus
      </h1>
      {/* <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" /> */}
      <h1 className="z-10 mt-4 font-thin text-xl text-transparent duration-1000 bg-zinc-400 cursor-default text-edge-outline animate-title font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text ">
        A Full Stack Web Developer
      </h1>

      <div className="my-10 text-center animate-fade-in gap-3 w-[200px] flex justify-around">
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
