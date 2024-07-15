import { AuthContext, AuthContextProps } from "@/shared/context/auth-context";
import { useContext } from "react";

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "AuthContext must be used within a AuthContextProvider"
    );
  }

  return context;
};
