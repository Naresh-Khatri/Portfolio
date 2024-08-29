import { useEffect, useState } from "react";

export const useDevToolsOpen = () => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const detectDevTools = () => {
      const threshold = 160; // Approximate height of the DevTools bar
      const itIsOpen =
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold;

      if (itIsOpen) {
        setIsDevToolsOpen(true);
      } else {
        setIsDevToolsOpen(false);
      }
    };

    window.addEventListener("resize", detectDevTools);
    detectDevTools();
  });
  return { isDevToolsOpen };
};
