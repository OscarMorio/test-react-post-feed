"use client";
import { AuthContextProvider } from "@/shared/context/auth-context";
import { PostContextProvider } from "@/shared/context/post-context";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthContextProvider>
      <PostContextProvider>{children}</PostContextProvider>
    </AuthContextProvider>
  );
};

export default Providers;
