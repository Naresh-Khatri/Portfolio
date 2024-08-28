"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

import "@splidejs/react-splide/css";

const PROJECTS = [
  {
    id: 1,
    name: "Coding Ducks",
    description: `Dive into CodingDucks, a fusion of CodePen's creative playground with LeetCode's problem-solving realm.
Whether you're a newbie or a seasoned coder, join the community to paddle through coding adventures and let your
creativity soar.`,
    link: "https://www.codingducks.live",
    images: [
      "/assets/projects-screenshots/codingducks/1.png",
      "/assets/projects-screenshots/codingducks/2.png",
      "/assets/projects-screenshots/codingducks/3.png",
      "/assets/projects-screenshots/codingducks/4.png",
      "/assets/projects-screenshots/codingducks/5.png",
    ],
  },
  {
    id: 2,
    name: "Ghost Chat",
    description: `GhostChat is an anonymous messaging app that allows users to connect without revealing their identities. 
Join the community for intriguing conversations and mysterious encounters.`,
    link: "https://ghostchatt.vercel.app/",
    images: [
      "/assets/projects-screenshots/ghostchat/1.png",
      "/assets/projects-screenshots/ghostchat/2.png",
      "/assets/projects-screenshots/ghostchat/3.png",
      "/assets/projects-screenshots/ghostchat/4.png",
    ],
  },
  {
    id: 3,
    name: "Coupon Luxury",
    description: `Welcome to CouponLuxury, your destination for exclusive discounts and savings. Explore the platform to find the
best deals on luxury brands and products. Join our savvy community of shoppers and unlock access to premium coupons.`,
    link: "https://www.couponluxury.com/",
    images: [
      "/assets/projects-screenshots/couponluxury/1.png",
      "/assets/projects-screenshots/couponluxury/2.png",
      "/assets/projects-screenshots/couponluxury/3.png",
      "/assets/projects-screenshots/couponluxury/4.png",
      "/assets/projects-screenshots/couponluxury/5.png",
    ],
  },
  {
    id: 4,
    name: "JNTUA Results Analyser",
    description: `the go-to app for JNTUA students, empowering them to analyze, compare, and view classwise results effortlessly.
     Dive into your academic journey with ease, track your progress, and gain valuable insights.`,
    link: "/projects/4",
    images: ["/assets/projects-screenshots/jra/1.png"],
  },
];
function Page() {
  return (
    <>
      <div className="container mx-auto md:px-[50px] xl:px-[150px] text-zinc-300 h-full">
        <h1 className="text-4xl mt-[100px] mb-[50px]">Projects</h1>
        <ul className="grid  md:grid-cols-2 lg:grid-cols-3 gap-10 place-content-around ">
          {PROJECTS.map((project) => (
            <li
              className="w-[300px] h-[400px] border-[.5px] rounded-md border-zinc-600"
              key={project.id}
              style={{ backdropFilter: "blur(2px)" }}
            >
              <div className="h-[200px]">
                <Splide
                  options={{
                    type: "loop",
                    interval: 3000,
                    autoplay: true,
                    speed: 2000,
                    perMove: 1,
                    rewind: true,
                    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                    arrows: false,
                  }}
                  aria-label="My Favorite Images"
                >
                  {project.images.map((image) => (
                    <SplideSlide key={image}>
                      <Image
                        src={image}
                        alt={`screenshot of "${project.name}`}
                        className="w-[300px] h-[200px] rounded-md bg-zinc-900 "
                        width={300}
                        height={400}
                        style={{ height: "200px" }}
                      />
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
              <div className="p-4 text-zinc-300">
                <h2 className="text-xl">{project.name}</h2>
                <p className="mt-2 text-xs text-zinc-500">
                  {project.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Page;
