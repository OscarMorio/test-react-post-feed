"use client";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Nullable } from "@/shared/models/base-types";
import Link from "next/link";
import UserDataForm from "../userdata-form/userdata-form";

const LoginForm = () => {
  const { login, isLogged } = useAuthContext();
  const router = useRouter();
  const usernameRef = useRef<Nullable<string>>(null);
  const passwordRef = useRef<Nullable<string>>(null);
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  const handleSubmitButtonClick = () => {
    const username = usernameRef.current ?? "";
    const password = passwordRef.current ?? "";

    login(username, password).then((isLogged) => {
      if (!isLogged) {
        setHasErrors(true);
      } else {
        router.push("/");
        setHasErrors(false);
      }
    });
  };

  const handleLoginFormChange = (username: string, password: string) => {
    usernameRef.current = username;
    passwordRef.current = password;
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
        <h2>Login into your account</h2>
        <UserDataForm
          hasErrors={hasErrors}
          onDataChange={handleLoginFormChange}
          errorMessage="Password or username not correct. Try again!"
        />
        <button onClick={handleSubmitButtonClick}>
          Submit your credentials
        </button>
        <div className="register-link-container">
          <Link href="/signup">You do not have an account yet? Register!</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
