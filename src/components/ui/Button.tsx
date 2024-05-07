"use client";
import React from "react";

function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-md border-[1px] border-zinc-500 text-zinc-300 hover:border-[1px] hover:border-white"
    >
      {children}
    </button>
  );
}

export default Button;
