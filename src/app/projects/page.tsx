import Image from "next/image";
import Link from "next/link";
import React from "react";

const PROJECTS = [
  {
    id: 1,
    name: "Coding Ducks",
    description: "Project 1",
    link: "/projects/1",
    imgSrc: "",
  },
  {
    id: 2,
    name: "Ghost Chat",
    description: "Project 2",
    link: "/projects/2",
    imgSrc: "",
  },
  {
    id: 3,
    name: "Coupon Luxury",
    description: "Project 3",
    link: "/projects/3",
    imgSrc: "",
  },
  {
    id: 4,
    name: "JNTUA Results Analyser",
    description: "Project 4",
    link: "/projects/4",
    imgSrc: "",
  },
];
function Page() {
  return (
    <div className="container mx-auto text-zinc-300 h-full">
      <h1 className="text-4xl mt-[100px] mb-[50px]">Projects</h1>
      <ul className="grid grid-cols-3 gap-4">
        {PROJECTS.map((project) => (
          <Link href={project.link} key={project.id}>
            <li
              className="w-[300px] h-[400px] border-[.5px] rounded-md border-zinc-600"
              style={{ backdropFilter: "blur(2px)" }}
            >
              <Image
                src={project.imgSrc}
                alt={`screenshot of "${project.name}`}
                className="w-[300px] h-[200px] rounded-md bg-zinc-900"
                width={300}
                height={400}
              />
              <div className="p-4 text-zinc-300">
                <h2 className="text-xl">{project.name}</h2>
                <p className="mt-2 text-sm text-zinc-500">
                  {project.description}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Page;
