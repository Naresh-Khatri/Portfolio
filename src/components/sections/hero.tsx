import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File, Github, Linkedin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Hero = () => {
  return (
    <div className="grid md:grid-cols-2">
      <div
        className={cn(
          "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
          "col-span-1",
          "flex flex-col justify-start md:justify-center items-center md:items-start",
          "pt-28 sm:pt-0 sm:pb-32 md:p-24 lg:p-40 xl:p-48"
        )}
      >
        <div className="">
          <p
            className={cn(
              "md:self-start mt-4 font-thin text-md text-slate-500 dark:text-zinc-400 ml-2",
              "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
            )}
          >
            Hi, I am
            <br className="md:hidden" />
          </p>
          <h1
            className={cn(
              "font-thin text-6xl text-transparent text-slate-800 ml-1",
              "cursor-default text-edge-outline font-display sm:text-7xl md:text-9xl "
            )}
          >
            Naresh <br className="md:block hiidden" /> Khatri
          </h1>
          {/* <div className="md:block hidden bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 w-screen h-px animate-fade-right animate-glow" /> */}
          <p
            className={cn(
              "md:self-start md:mt-4 font-thin text-md text-slate-500 dark:text-zinc-400 ml-2",
              "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
            )}
          >
            A Full Stack Web Developer
          </p>
        </div>

        <div className="mt-8 md:ml-1 flex flex-col gap-3">
          <Tooltip delayDuration={1000}>
            <TooltipTrigger asChild>
              <Button
                variant={"default"}
                className="block w-full overflow-hidden"
                // preventHoverAnimation
              >
                Hire Me
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-white text-black">
              <p>pls 🥹 🙏</p>
            </TooltipContent>
          </Tooltip>
          <div className="md:self-start flex gap-3">
            <Link
              href={
                "https://drive.google.com/file/d/12cV9lMDqK5VxnMu2NxpdQt4WIOB-spaZ/view"
              }
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button className="flex items-center gap-2 ">
                    <File size={24} /> Resume
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Click to see my resume</p>
                </TooltipContent>
              </Tooltip>
            </Link>
            <Link href={"https://github.com/Naresh-Khatri"}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button>
                    <Github size={24} fill="#000" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>This is my Github profile</p>
                </TooltipContent>
              </Tooltip>
            </Link>
            <Link href={"https://www.linkedin.com/in/naresh-khatri/"}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button>
                    <Linkedin size={24} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Welcome to my LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid col-span-1"></div>
    </div>
  );
};

export default Hero;
