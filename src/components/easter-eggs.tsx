import { useDevToolsOpen } from "@/hooks/use-devtools-open";
import React, { useEffect, useState } from "react";
import NyanCat from "./nyan-cat";
import { AnimatePresence } from "framer-motion";

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();
  useEffect(() => {
    if (!isDevToolsOpen) return;
    // console.log(
    //   "%cWhoa, look at you! 🕵️‍♂️\n\n" +
    //     "Peeking under the hood, eh? Just be careful, " +
    //     "you might find some 🐛 bugs that even I didn't know about! 😅\n\n" +
    //     "By the way, did you know the console is a portal to another dimension? 🌌 " +
    //     "Just kidding... or am I? 👽\n\n" +
    //     "Keep exploring, brave soul! 🛠️",
    //   "color: #00FF00; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
    // );
    if (typeof console !== "undefined") {
      console.log(
        "%cHey there, curious coder! 🕵️‍♀️\n" +
          "You seem to have discovered the secret console! 🔍\n" +
          "Want to see some magic? ✨\n" +
          "Just call %cNaresh%c fn and hit enter! 🎩🐇",
        //   "Just press the %c'n'%c key and watch the magic happen! 🪄",
        "color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px",
        "color: #00FF00; font-size: 16px; font-family: monospace; padding: 10px;",
        "color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
      );

      // @ts-ignore
      window.Naresh = () => {
        console.log(
          "%c✨ Abra Kadabra! ✨\n\n" +
            "You just summoned the magic of Naresh! 🧙‍♂️\n" +
            "What??? youre not impressed? Fine, but remember: With great power comes great responsibility! 💻⚡",

          "color: #FF4500; font-size: 18px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:10px"
        );

        const timer = setTimeout(() => {
          console.log(
            "%cPssttt! 🐾\n\n" +
              "Do you like cats?? 😺 If yes, then press 'n' on viewport and see what happens! 🐱✨",
            "color: #FF69B4; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
          );
          clearTimeout(timer);
        }, 7000);
      };
    }
  }, [isDevToolsOpen]);

  return (
    <>
      <NyanCat />
      <div className="fixed left-10 top-64">
        {isDevToolsOpen ? "DevTools is open" : "DevTools is closed"}
      </div>
    </>
  );
};

export default EasterEggs;
