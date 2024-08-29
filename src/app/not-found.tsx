import NyanCat from "@/components/nyan-cat";
import { cn } from "@/lib/utils";
import Spline from "@splinetool/react-spline";
import { Application } from "@splinetool/runtime";
import React, { Suspense } from "react";

const NotFoundPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Spline scene="/assets/404.spline" />
      </Suspense>
      <NyanCat />
      <div className={cn("h-[calc(100dvh-8rem)] z-[2] pt-16")}>
        NotFoundPage
      </div>
    </>
  );
};

export default NotFoundPage;
