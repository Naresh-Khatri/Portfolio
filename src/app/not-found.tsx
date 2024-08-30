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
    </>
  );
};

export default NotFoundPage;
