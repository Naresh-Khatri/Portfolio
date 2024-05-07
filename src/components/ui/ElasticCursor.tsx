"use client";
import React, { useEffect, useRef, useState } from "react";

function ElasticCursor() {
  const circleRef = useRef<HTMLDivElement>(null);

  // Create objects to track mouse position and custom cursor position
  const [mouse, setMouse] = useState({ x: 0, y: 0 }); // Track current mouse position
  const [previousMouse, setPreviousMouse] = useState({ x: 0, y: 0 }); // Store the previous mouse position
  const [circle, setCirle] = useState({ x: 0, y: 0 }); // Track the circle position

  // Initialize variables to track scaling and rotation
  let currentScale = 0; // Track current scale value
  let currentAngle = 0; // Track current angle value

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", updateMousePos);
      tick();
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", updateMousePos);
      }
    };
  }, []);
  const updateMousePos = (e: MouseEvent) => {
    //  setMouse({ x: e.x, y: e.y });
    mouse.x = e.x;
    mouse.y = e.y;
  };

  const speed = 0.055;

  const tick = () => {
    // MOVE
    // Calculate circle movement based on mouse position and smoothing
    // setCirle((p) => ({
    //   x: (mouse.x - circle.x) * speed,
    //   y: (mouse.y - circle.y) * speed,
    // }));
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;
    // Create a transformation string for cursor translation
    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

    // SQUEEZE
    // 1. Calculate the change in mouse position (deltaMouse)
    const deltaMouseX = mouse.x - previousMouse.x;
    const deltaMouseY = mouse.y - previousMouse.y;
    // Update previous mouse position for the next frame
    // setPreviousMouse({ x: mouse.x, y: mouse.y });
    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;
    // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
    const mouseVelocity = Math.min(
      Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
      250
    );
    // 3. Convert mouse velocity to a value in the range [0, 0.5]
    const scaleValue = (mouseVelocity / 150) * 0.5;
    // 4. Smoothly update the current scale
    currentScale += (scaleValue - currentScale) * speed;
    // 5. Create a transformation string for scaling
    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

    // ROTATE
    // 1. Calculate the angle using the atan2 function
    const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
    // 2. Check for a threshold to reduce shakiness at low mouse velocity
    if (mouseVelocity > 20) {
      currentAngle = angle;
    }
    // 3. Create a transformation string for rotation
    const rotateTransform = `rotate(${currentAngle}deg)`;

    // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
    if (!circleRef.current) return;
    circleRef.current.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

    // Request the next frame to continue the animation
    window.requestAnimationFrame(tick);
  };

  return (
    <div
      ref={circleRef}
      style={{ zIndex: 100, backdropFilter: "invert(100%)" }}
      className="fixed w-[40px] h-[40px] border-[1px] border-solid border-white rounded-full cursor-none top-[-20px] left-[-20px] pointer-events-none"
    ></div>
  );
}

export default ElasticCursor;
