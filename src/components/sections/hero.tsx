import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File, Github, Linkedin } from "lucide-react";

const Hero = () => {
  return (
    <div className="bottom-[10rem] left-[10rem] z-[2] md:absolute flex flex-col justify-center items-center w-full md:w-fit h-full md:h-fit">
      {/* <div className="md:block hidden bg-gradient-to-r from-zinc-301/0 via-zinc-300/50 to-zinc-300/0 w-screen h-px animate-fade-left animate-glow" /> */}
      <p
        className={cn(
          "md:self-start mt-4 font-thin text-xl text-slate-500 dark:text-zinc-400",
          "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
        )}
      >
        Hi, I am
        <br className="md:hidden" />
      </p>
      <h1
        className={cn(
          "font-thin text-6xl text-transparent text-slate-800 dark:bg-white",
          "cursor-default text-edge-outline font-display sm:text-7xl md:text-9xl whitespace-nowrap bg-clip-text "
        )}
      >
        Naresh <br className="md:block hiidden" /> Khatri
      </h1>
      {/* <div className="md:block hidden bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 w-screen h-px animate-fade-right animate-glow" /> */}
      <p
        className={cn(
          "md:self-start mt-4 font-thin text-xl text-slate-500 dark:text-zinc-400",
          "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
        )}
      >
        A Full Stack Web Developer
      </p>

      <div className="my-16 md:self-start flex gap-3">
        <Link
          href={
            "https://drive.google.com/file/d/12cV9lMDqK5VxnMu2NxpdQt4WIOB-spaZ/view"
          }
        >
          <Button>
            <div className="flex gap-2">
              <File size={24} /> Resume
            </div>
          </Button>
        </Link>
        <Link href={"https://github.com/Naresh-Khatri"}>
          <Button>
            <Github size={24} fill="#000" />
          </Button>
        </Link>
        <Link href={"https://www.linkedin.com/in/naresh-khatri/"}>
          <Button>
            <Linkedin size={24} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
