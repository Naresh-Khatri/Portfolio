"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { Skill, SkillNames, SKILLS } from "@/data/constants";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  useEffect(() => {
    (async () => {
      console.log(activeSection);
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
      });
      if (activeSection === "hero" || activeSection === "contact") {
        rotateKeyboard.current.restart();
      } else {
        rotateKeyboard.current.pause();
      }
      if (activeSection === "skills") {
      } else {
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
    };
  }, [activeSection, splineApp]);

  useEffect(() => {
    handleSplineInteractions();
    handleGsapAnimations();
    setBongoAnimation(bongoCatAnimation());
  }, [splineApp]);

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
  const bongoCatAnimation = () => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");
    if (!frame1 || !frame2 || !framesParent)
      return { start: () => {}, stop: () => {} };

    let interval: NodeJS.Timeout;
    const start = () => {
      // console.log("started");
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
      // console.log("stoped");
      clearInterval(interval);
      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
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
