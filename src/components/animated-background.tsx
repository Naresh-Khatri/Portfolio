"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { Skill, SkillNames, SKILLS } from "@/data/constants";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePreloader } from "./preloader";
import { CSSPlugin } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const STATES = [
  {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 400, y: -200, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.15, y: 0.15, z: 0.15 },
      position: { x: 0, y: -200, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  {
    desktop: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 12,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 6,
        z: 0,
      },
    },
  },
  {
    desktop: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
    mobile: {
      scale: { x: 0.18, y: 0.18, z: 0.18 },
      position: { x: 0, y: 150, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
  {
    desktop: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 500, y: -250, z: 0 },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.18, y: 0.18, z: 0.18 },
      position: { x: 0, y: 150, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
];

const AnimatedBackground = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [bongoAnimation, setBongoAnimation] = useState<{
    start: () => void;
    stop: () => void;
  }>();
  const [keycapAnimtation, setKeycapAnimtation] = useState<{
    start: () => void;
    stop: () => void;
  }>();

  const keyboardStates = (idx: number) => {
    return STATES[idx][isMobile ? "mobile" : "desktop"];
  };

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp || selectedSkill?.name === e.target.name) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      setSelectedSkill(null);
      if (splineApp.getVariable("kbd_val") && splineApp.getVariable("desc")) {
        splineApp.setVariable("kbd_val", "");
        splineApp.setVariable("desc", "");
      }
    } else {
      if (!selectedSkill || selectedSkill.name !== e.target.name) {
        const skill = SKILLS[e.target.name as SkillNames];
        setSelectedSkill(skill);
      }
    }
  };

  // handle keyboard press interaction
  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("kbd_val", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill]);

  const rotateKeyboard = useRef<gsap.core.Tween>();
  const teardownKeyboard = useRef<gsap.core.Tween>();
  const setKeycapsToInitialPosition = () => {
    if (!splineApp) return;
    const objs = splineApp.getAllObjects();
    const keycaps = objs.filter((obj) => obj.name === "keycap");
    keycaps.forEach((keycap) => {
      gsap.to(keycap.position, { y: 0, duration: 0.5 });
    });
  };
  // initialize gsap animations
  useEffect(() => {
    handleSplineInteractions();
    handleGsapAnimations();
    setBongoAnimation(getBongoAnimation());
    setKeycapAnimtation(getKeycapAnimation());
  }, [splineApp]);

  useEffect(() => {
    (async () => {
      if (!splineApp) return;
      const kbd: SPEObject | undefined = splineApp.findObjectByName("keyboard");
      if (!kbd) return;
      rotateKeyboard.current = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
      });
      teardownKeyboard.current = gsap.fromTo(
        kbd.rotation,
        {
          y: 0,
          // x: -Math.PI,
          x: -Math.PI,
          z: 0,
        },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          // ease: "none",
          delay: 2.5,
          immediateRender: false,
          paused: true,
        }
      );
      console.log(activeSection);
      if (activeSection === "hero") {
        rotateKeyboard.current.restart();
        teardownKeyboard.current.pause();

        Object.values(SKILLS).forEach((skill) => {
          const keycap = splineApp.findObjectByName(skill.name);
          if (!keycap) return;
          gsap.to(keycap.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 5 + 5,
            repeat: -1,
            delay: Math.random() * 100,
            // ease: "back.inOut",
            ease: "elastic.out(2,0.1)",
            yoyo: true,
          });
        });
      } else if (activeSection === "contact") {
        rotateKeyboard.current.pause();
        teardownKeyboard.current.restart();
      } else if (activeSection === "contact") {
        rotateKeyboard.current.pause();
        // teardownKeyboard.current.restart();
      } else if (activeSection === "contact") {
        rotateKeyboard.current.pause();
        // teardownKeyboard.current.restart();
        let foo;
        // while (activeSection === "contact") {
        //   const randSkill =
        //     Object.values(SKILLS)[
        //       Math.floor(Math.random() * Object.keys(SKILLS).length)
        //     ];
        //   const keycap = splineApp.findObjectByName(randSkill.name);
        //   if (!keycap) continue;
        //   foo = gsap.to(keycap.position, {
        //     y: -90,
        //     duration: Math.random() * 0.2,
        //     repeat: 1,
        //     ease: "back.inOut",
        //     yoyo: true,
        //   });

        //   await sleep(Math.random() * 300 + 200);
        //   // await sleep(500);
        //   if (foo) foo.kill();
        //   // foo = gsap.to(keycap.position, {
        //   //   y: 0,
        //   //   duration: 0.2,
        //   //   ease: "back.inOut",
        //   // });
        //   // // await sleep(Math.random() * 500);
        //   // await sleep(500);
        //   // if (foo) foo.kill();
        // }
      } else {
        rotateKeyboard.current.pause();
        teardownKeyboard.current.pause();
      }
      if (activeSection === "skills") {
        setKeycapsToInitialPosition();
        await sleep(300);
        keycapAnimtation?.start();
        setKeycapsToInitialPosition();
        await sleep(300);
        keycapAnimtation?.start();
      } else {
        await sleep(300);
        keycapAnimtation?.stop();
        splineApp.setVariable("kbd_val", "");
        splineApp.setVariable("desc", "");
      }
      if (activeSection === "projects") {
        await sleep(300);
        bongoAnimation?.start();
      } else {
        await sleep(200);
        bongoAnimation?.stop();
      }
    })();
    return () => {
      if (rotateKeyboard.current) rotateKeyboard.current.kill();
      if (teardownKeyboard.current) teardownKeyboard.current.kill();
    };
  }, [activeSection, splineApp]);

  const { isLoading } = usePreloader();
  useEffect(() => {
    console.log(isLoading);
    if (!isLoading) revealKeyCaps();
  }, [isLoading]);
  const revealKeyCaps = async () => {
    if (!splineApp) return;
    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");
    await sleep(500);
    console.log(isMobile);
    if (isMobile) {
      const mobileKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-mobile"
      );
      mobileKeyCaps.forEach((keycap, idx) => {
        keycap.visible = true;
      });
    } else {
      console.log("desktop");
      const desktopKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-desktop"
      );
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await sleep(idx * 100);
        keycap.visible = true;
      });
    }
    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await sleep(idx * 100);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 35, duration: 0.5, delay: 0.1, ease: "bounce.out" }
      );
      // keycap.position.y -= 100;
    });
  };
  const handleSplineInteractions = () => {
    if (!splineApp) return;
    // show either desktop text or mobile text
    if (isMobile) {
      const text = splineApp.findObjectByName("text-mobile");
      if (text) text.visible = true;
    } else {
      const text = splineApp.findObjectByName("text-desktop");
      if (text) text.visible = true;
    }

    splineApp.addEventListener("keyUp", (e) => {
      if (!splineApp) return;
      splineApp.setVariable("kbd_val", "");
      splineApp.setVariable("desc", "");
    });
    splineApp.addEventListener("keyDown", (e) => {
      if (!splineApp) return;
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill) setSelectedSkill(skill);
      splineApp.setVariable("kbd_val", skill.label);
      splineApp.setVariable("desc", skill.shortDescription);
    });
    splineApp.addEventListener("mouseHover", handleMouseHover);
  };
  const handleGsapAnimations = () => {
    if (!splineApp) return;
    const kbd: SPEObject | undefined = splineApp.findObjectByName("keyboard");
    if (!kbd || !splineContainer.current) return;
    gsap.set(kbd.scale, {
      ...keyboardStates(0).scale,
    });
    gsap.set(kbd.position, {
      ...keyboardStates(0).position,
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 50%",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onEnter: () => {
          setActiveSection("skills");
          gsap.to(kbd.scale, { ...keyboardStates(1).scale, duration: 1 });
          gsap.to(kbd.position, { ...keyboardStates(1).position, duration: 1 });
          gsap.to(kbd.rotation, { ...keyboardStates(1).rotation, duration: 1 });
        },
        onLeaveBack: () => {
          setActiveSection("hero");
          gsap.to(kbd.scale, { ...keyboardStates(0).scale, duration: 1 });
          gsap.to(kbd.position, { ...keyboardStates(0).position, duration: 1 });
          gsap.to(kbd.rotation, { ...keyboardStates(0).rotation, duration: 1 });
          // gsap.to(kbd.rotation, { x: 0, duration: 1 });
        },
      },
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top 70%",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onEnter: () => {
          setActiveSection("projects");
          gsap.to(kbd.scale, { ...keyboardStates(2).scale, duration: 1 });
          gsap.to(kbd.position, { ...keyboardStates(2).position, duration: 1 });
          gsap.to(kbd.rotation, { ...keyboardStates(2).rotation, duration: 1 });
        },
        onLeaveBack: () => {
          setActiveSection("skills");
          gsap.to(kbd.scale, { ...keyboardStates(1).scale, duration: 1 });
          gsap.to(kbd.position, { ...keyboardStates(1).position, duration: 1 });
          gsap.to(kbd.rotation, { ...keyboardStates(1).rotation, duration: 1 });
          // gsap.to(kbd.rotation, { x: 0, duration: 1 });
        },
      },
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top 70%",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onEnter: () => {
          setActiveSection("contact");
          gsap.to(kbd.scale, { ...keyboardStates(3).scale, duration: 1 });
          gsap.to(kbd.position, { ...keyboardStates(3).position, duration: 1 });
          gsap.to(kbd.rotation, { ...keyboardStates(3).rotation, duration: 1 });
        },
        onLeaveBack: () => {
          setActiveSection("projects");
          gsap.to(kbd.scale, { ...keyboardStates(2).scale, duration: 1 });
          gsap.to(kbd.position, { ...keyboardStates(2).position, duration: 1 });
          gsap.to(kbd.rotation, { ...keyboardStates(2).rotation, duration: 1 });
          // gsap.to(kbd.rotation, { x: 0, duration: 1 });
        },
      },
    });
  };
  const getBongoAnimation = () => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");
    if (!frame1 || !frame2 || !framesParent)
      return { start: () => {}, stop: () => {} };

    let interval: NodeJS.Timeout;
    const start = () => {
      let i = 0;
      framesParent.visible = true;
      interval = setInterval(() => {
        if (i % 2) {
          frame1.visible = false;
          frame2.visible = true;
        } else {
          frame1.visible = true;
          frame2.visible = false;
        }
        i++;
      }, 100);
    };
    const stop = () => {
      clearInterval(interval);
      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
    };
    return { start, stop };
  };
  const getKeycapAnimation = () => {
    if (!splineApp) return;
    const objs = splineApp.getAllObjects();
    const keycaps = objs.filter((obj) => obj.name === "keycap");
    if (!objs || !keycaps) return { start: () => {}, stop: () => {} };

    let interval: NodeJS.Timeout;
    let tweens: any;
    const start = () => {
      console.log("starting", keycaps);
      keycaps.forEach((keycap) => {
        const t = gsap.to(keycap, {
          // y: 40,
          y: Math.random() * 200 + 200,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "elastic.out(1,0.8)",
        });
        tweens.push(t);
      });

      // Object.values(SKILLS).forEach((skill) => {
      //   const keycap = splineApp.findObjectByName(skill.name);
      //   if (!keycap) return;
      //   const t = gsap.to(keycap.position, {
      //     y: Math.random() * 200 + 200,
      //     duration: Math.random() * 5 + 5,
      //     repeat: -1,
      //     delay: Math.random() * 10,
      //     // ease: "back.inOut",
      //     ease: "elastic.out(1,0.8)",
      //     yoyo: true,
      //   });
      //   tweens.push(t);
      // });
    };
    const stop = () => {
      console.log("stopping", keycaps);
      gsap.to(keycaps, { y: 36, stagger: 0.1, duration: 0.5, yoyo: true });
      setTimeout(() => {
        if (tweens.length > 0) {
          tweens.forEach((t: gsap.core.Tween) => t.kill());
        }
      }, 1000);
    };
    return { start, stop };
  };
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          ref={splineContainer}
          onLoad={(app: Application) => {
            setSplineApp(app);
          }}
          scene="/assets/skills-keyboard.spline"
        />
      </Suspense>
      {/* <AnimatePresence>
        {skillsSectionActive && selected && (
          <motion.div
            className="top-0 left-0 absolute bg-ired-400 w-[500px] text-6xl z-[-1] pointer-events-none "
            initial={{ opacity: 0, translate: "300px 300px", rotateZ: 0 }}
            animate={{ opacity: 1, transform: "350px 350px", rotateZ: 0 }}
            exit={{ opacity: 0, translate: "400px 400px" }}
            transition={{ duration: 0.5 }}
            style={{
              transform: "rotateX(-45deg) rotateY(0deg) rotateZ(-39deg) ",
            }}
          >
            <h4 className="border-b-4">{selected.label}</h4>
            <p className="border-t-i2 borderi-l-4 h-[300px] text-2xl text-neutral-400">
              <div
                className="font-sans"
                dangerouslySetInnerHTML={{ __html: selected.shortDescription }}
              ></div>
            </p>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
};

export default AnimatedBackground;
