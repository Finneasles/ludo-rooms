/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";

interface Circle {
  x: number;
  y: number;
  size: number;
}

export const Layout = ({children}) => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="relative pt-[80px] h-full">
      {children}
      </div>
    </div>
  );
};
