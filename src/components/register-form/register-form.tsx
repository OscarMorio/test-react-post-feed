"use client";
import { Nullable } from "@/shared/models/base-types";
import { useRef, useState } from "react";
import UserDataForm from "../userdata-form/userdata-form";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const { register, isLogged  } = useAuthContext();
  const router = useRouter();
  const usernameRef = useRef<Nullable<string>>(null);
  const passwordRef = useRef<Nullable<string>>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleFormDataChange = (username: string, password: string) => {
    usernameRef.current = username;
    passwordRef.current = password;
  };

  const handleRegister = () => {
    const username = usernameRef.current ?? "";
    const password = passwordRef.current ?? "";

    try {
    setHasError(false);
      register(username, password);
      router.push("/login");
    } catch (err) {
        setHasError(true);
    }
  };

  if (isLogged) {
    return (
      <div className="flex center-elements">
        <h3>You have already logged in</h3>
        <Link href="/">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="login-form-container flex">
      <div className="flex flex-col center-row center-block">
        <h2>Register a new account </h2>
        <UserDataForm onDataChange={handleFormDataChange} hasErrors={hasError} errorMessage="Try again with a different username or password" />
        <button onClick={handleRegister}>Register now</button>
      </div>
    </div>
  );
};

export default RegisterForm;
