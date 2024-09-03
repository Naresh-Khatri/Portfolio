import { useEffect, useState } from "react";

type useMouseType = {
  allowPage?: boolean;
  allowAngle?: boolean;
  allowAcc?: boolean;
};

export const useMouse = ({
  allowPage,
  allowAngle,
  allowAcc,
}: useMouseType = {}) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [angle, setAngle] = useState(0);
  const [acceleration, setAcceleration] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setX(allowPage ? e.pageX : e.clientX);
      setY(allowPage ? e.pageY : e.clientY);

      if (allowAcc) {
        const acc = Math.abs(e.movementX) + Math.abs(e.movementY);
        setAcceleration(acc);
      }
      if (allowAngle) {
        setAngle(Math.atan2(e.movementY, e.movementX));
      }
    };
    if (typeof window !== "undefined")
      window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });
  return { x, y, angle, acceleration };
};
