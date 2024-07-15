"use client";
import { useAuthContext } from "@/hooks/useAuthContext";
import Link from "next/link";

const UserInfo = () => {
  const { isLogged, userName, logout } = useAuthContext();

  return (
    <div className="flex-row centered-row gap-x">
      {!isLogged && (
        <>
          <p>You are not logged.</p>
          <Link href="/login">
            <button className="login-button">Log in!</button>
          </Link>
        </>
      )}

      {isLogged && (
        <>
          <span>Welcome {userName ?? "user"}</span>
          <button onClick={() => logout()}>Logout</button>
        </>
      )}
    </div>
  );
};

export default UserInfo;
