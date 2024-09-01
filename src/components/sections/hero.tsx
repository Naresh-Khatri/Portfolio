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
import { usePreloader } from "../preloader";
import { BlurIn } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <section id="hero" className={cn("relative w-full h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pt-0 sm:pb-32 md:p-24 lg:p-40 xl:p-48"
          )}
        >
          {!isLoading && (
            <div className="">
              <BlurIn delay={0.7}>
                <p
                  className={cn(
                    "md:self-start mt-4 font-thin text-md text-slate-500 dark:text-zinc-400 ml-3",
                    "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                  )}
                >
                  Hi, I am
                  <br className="md:hidden" />
                </p>
              </BlurIn>
              <BlurIn delay={1}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <h1
                      className={cn(
                        "font-thin text-6xl text-transparent text-slate-800 ml-1 text-left",
                        "cursor-default text-edge-outline font-display sm:text-7xl md:text-9xl "
                      )}
                    >
                      Naresh
                      <br className="md:block hiidden" />
                      Khatri
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="dark:bg-white dark:text-black"
                  >
                    theres something waiting for you in devtools
                  </TooltipContent>
                </Tooltip>
              </BlurIn>
              {/* <div className="md:block hidden bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 w-screen h-px animate-fade-right animate-glow" /> */}
              <BlurIn delay={1.2}>
                <p
                  className={cn(
                    "md:self-start md:mt-4 font-thin text-md text-slate-500 dark:text-zinc-400 ml-3",
                    "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                  )}
                >
                  A Full Stack Web Developer
                </p>
              </BlurIn>
            </div>
          )}

          <div className="mt-8 md:ml-2 flex flex-col gap-3">
            <Link
              href={
                "https://drive.google.com/file/d/1O97WCk2DrO9x6SHOqf7LvRbmHkMgGIb4/view?usp=sharing"
              }
              target="_blank"
              className="flex-1"
            >
              <Button className="flex items-center gap-2 w-full">
                <File size={24} />
                <p>Resume</p>
              </Button>
            </Link>
            <div className="md:self-start flex gap-3">
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <Link href={"#contact"}>
                    <Button
                      variant={"outline"}
                      className="block w-full overflow-hidden"
                    >
                      Hire Me
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>pls 🥹 🙏</p>
                </TooltipContent>
              </Tooltip>
              <Link href={"https://github.com/Naresh-Khatri"} target="_blank">
                <Button variant={"outline"}>
                  <Github size={24} fill="#000" />
                </Button>
              </Link>
              <Link
                href={"https://www.linkedin.com/in/naresh-khatri/"}
                target="_blank"
              >
                <Button variant={"outline"}>
                  <Linkedin size={24} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
