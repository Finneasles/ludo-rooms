/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Loading } from "@/components/pages/loading";
import { Disconnected } from "@/components/pages/disconnected";

export const Layout = ({ connected, isLoading, children }) => {
  return isLoading ? (
    <Loading />
  ) : !connected ? (
    <Disconnected/>
  ) : (
    children
  );
};
