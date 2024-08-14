"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { AnimatePresence, motion } from "framer-motion";
import { Skill, SkillNames, SKILLS } from "@/data/constants";

gsap.registerPlugin(ScrollTrigger);

const STATES = [
  {
    scale: { x: 0.25, y: 0.25, z: 0.25 },
    position: { x: 400, y: -200, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  },
  {
    scale: { x: 0.4, y: 0.4, z: 0.4 },
    position: { x: 0, y: -40, z: 0 },
    rotation: {
      x: 0,
      y: Math.PI / 12,
    },
  },
  {
    scale: { x: 0.2, y: 0.2, z: 0.2 },
    position: { x: -800, y: -300, z: 0 },
    rotation: {
      // x: 0,
      x: Math.PI,
    },
  },
];

const AnimatedBackground = () => {
  const splineContainer = useRef<HTMLDivElement>(null);
  const splineApp = useRef<Application>();
  const currSection = useRef<string>("");
  let timeout: NodeJS.Timeout | null = null;

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [skillsSectionActive, setSkillsSectionActive] = useState(false);

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp.current || selectedSkill?.name === e.target.name) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      setSelectedSkill(null);
      splineApp.current.setVariable("kbd_val", "");
      splineApp.current.setVariable("desc", "");
    } else {
      if (!selectedSkill || selectedSkill.name !== e.target.name) {
        const skill = SKILLS[e.target.name as SkillNames];
        setSelectedSkill(skill);
      }
    }
  };
  useEffect(() => {
    if (!selectedSkill || !splineApp.current) return;
    splineApp.current.setVariable("kbd_val", selectedSkill.label);
    splineApp.current.setVariable("desc", selectedSkill.shortDescription);
    console.log("updated to", selectedSkill);
  }, [selectedSkill]);

  useEffect(() => {
    if (!splineApp.current) return;
    console.log("loaded");
    splineApp.current.addEventListener("keyUp", (e) => {
      if (!splineApp.current) return;
      splineApp.current.setVariable("kbd_val", "");
      splineApp.current.setVariable("desc", "");
    });
    splineApp.current.addEventListener("keyDown", (e) => {
      if (!splineApp.current) return;
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill) setSelectedSkill(skill);
      splineApp.current.setVariable("kbd_val", skill.label);
      splineApp.current.setVariable("desc", skill.shortDescription);
    });
    splineApp.current.addEventListener("mouseHover", handleMouseHover);
  }, [splineApp.current]);
  const onLoad = (app: Application) => {
    splineApp.current = app;

    const kbd: SPEObject | undefined =
      splineApp.current.findObjectByName("keyboard");
    if (!kbd || !splineContainer.current) return;
    gsap.set(kbd.scale, { ...STATES[0].scale });
    gsap.set(kbd.position, { ...STATES[0].position });
    let rotateKeyboard = gsap.to(kbd.rotation, {
      y: Math.PI * 2 + kbd.rotation.y,
      duration: 10,
      repeat: -1,
      yoyo: true,
      yoyoEase: true,
      ease: "back.inOut",
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 50%",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onEnter: () => {
          currSection.current = "skills";
          rotateKeyboard.pause();
          setSkillsSectionActive(true);
          gsap.to(kbd.scale, { ...STATES[1].scale, duration: 1 });
          gsap.to(kbd.position, { ...STATES[1].position, duration: 1 });
          gsap.to(kbd.rotation, { ...STATES[1].rotation, duration: 1 });
        },
        onLeaveBack: () => {
          currSection.current = "home";
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => {
            console.log("timeout", currSection.current);
            if (currSection.current === "home") rotateKeyboard.restart();
          }, 1000);
          setSkillsSectionActive(false);
          gsap.to(kbd.scale, { ...STATES[0].scale, duration: 1 });
          gsap.to(kbd.position, { ...STATES[0].position, duration: 1 });
          gsap.to(kbd.rotation, { ...STATES[0].rotation, duration: 1 });
          // gsap.to(kbd.rotation, { x: 0, duration: 1 });
        },
      },
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top 80%",
        end: "bottom bottom",
        // scrub: true,
        markers: true,
        onEnter: () => {
          currSection.current = "projects";
          rotateKeyboard.pause();
          setSkillsSectionActive(false);
          gsap.to(kbd.scale, { ...STATES[2].scale, duration: 1 });
          gsap.to(kbd.position, { ...STATES[2].position, duration: 1 });
          gsap.to(kbd.rotation, { ...STATES[2].rotation, duration: 1 });
        },
        onLeaveBack: () => {
          currSection.current = "skills";
          setSkillsSectionActive(true);
          gsap.to(kbd.scale, { ...STATES[1].scale, duration: 1 });
          gsap.to(kbd.position, { ...STATES[1].position, duration: 1 });
          gsap.to(kbd.rotation, { ...STATES[1].rotation, duration: 1 });
          // gsap.to(kbd.rotation, { x: 0, duration: 1 });
        },
      },
    });
  };
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          ref={splineContainer}
          onLoad={onLoad}
          scene="/assets/untitled3.spline"
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
