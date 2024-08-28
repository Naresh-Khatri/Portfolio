import { useEffect, useState } from "react";

export const useMouse = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [angle, setAngle] = useState(0);
  const [acceleration, setAcceleration] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setX(e.clientX);
      setY(e.clientY);
      const acc = Math.abs(e.movementX) + Math.abs(e.movementY);
      setAcceleration(acc);
      setAngle(Math.atan2(e.movementY, e.movementX));
    };
    if (typeof window !== "undefined")
      window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });
  return { x, y, angle, acceleration };
};
