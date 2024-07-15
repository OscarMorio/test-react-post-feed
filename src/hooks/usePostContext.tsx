import { PostContext, PostContextProps } from "@/shared/context/post-context";
import { useContext } from "react";

export const usePostContext = (): PostContextProps => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error(
      "PostContext must be used within a PostContextProvider"
    );
  }

  return context;
};
